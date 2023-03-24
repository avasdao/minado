/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const { v4: uuidv4 } = require('uuid')
const SSE = require('express-sse')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const sharesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/stratum_shares`)

const sse = {}

/**
 * Stratum Module
 */
const stratum = async function (req, res) {
    let address
    let body
    let createdAt
    let headers
    let id
    let pkg
    let result

    body = req.body
    // console.log('BODY', body)

    headers = req.headers
    // console.log('HEADERS', headers)

    /* Validate body. */
    if (!body) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing body parameter.'
        })
    }

    id = uuidv4()
    // createdAt = moment().unix() // seconds
    createdAt = moment().valueOf() // milliseconds

    /* Build log package. */
    pkg = {
        _id: id,
        src: headers['host'] ? headers['host'] : 'stratum',
        headers,
        ...body,
        createdAt,
    }

    /* Save log to database. */
    result = await logsDb
        .put(pkg)
        .catch(err => console.error('LOGS ERROR:', err))

    /* Set response id. */
    if (body.id) {
        id = body.id
    }

    /* Set (Stratum) response error. */
    error = [
        0,
        '',
        null,
    ]

    /* Build response package. */
    pkg = {
        id,
        result,
        error: error[0] ? error : null,
    }

    /* Handle registration. */
    // TODO: Allow client to ping (for expiration refresh).
    if (body.method === 'register' && body.params) {
        /* Set address. */
        address = body.params.address.slice(5)
        console.info('Registering address ->', address)

        if (sse[address]) {
            sse[address].isActive = true
            sse[address].expiresAt = moment().unix() + 90 // default: 1 1/2 mins
        } else {
            /* Initialize SSE for address. */
            sse[address] = {
                instance: new SSE([]),
                isActive: true,
                expiresAt: moment().unix() + 90 // default: 1 1/2 mins
            }

            /* Register SSE. */
            req.app.get(`/v1/shares/${address}`, sse[address].instance.init)
        }

        return res.json({
            ...pkg,
            expiresAt: sse[address].expiresAt
        })
    }

    /* Handle shares. */
    if (body.method === 'share.submit' && body.params) {
        /* Set address. */
        address = body.params.address

        /* Normalize address. */
        if (address.slice(0, 5) !== 'nexa:') {
            address = 'nexa:' + address
        }

        // TODO: Let's verify this address.

        /* Set source. */
        const source = body.params.src

        /* Set target. */
        const target = body.params.target

        /* Set proof-of-work. */
        const pow = body.params.pow

        /* Set hash. */
        const hash = body.params.hash

        pkg = {
            _id: id, // NOTE: We re-use the log id.
            address,
            source,
            target,
            pow,
            hash,
            ip: headers['cf-connecting-ip'] ? headers['cf-connecting-ip'] : null,
            createdAt,
        }

        /* Save share database. */
        result = await sharesDb
            .put(pkg)
            .catch(err => console.error('SHARES ERROR:', err))

        /* Set an SSE address. */
        // NOTE: Removes the `:` which causes a matching problem
        //       in the subscription URL.
        const sseAddress = address.slice(5)

        /* Validate subscriptions. */
        if (sse[sseAddress] && sse[sseAddress].isActive) {
            /* Validate expiration. */
            if (moment().unix() >= sse[sseAddress].expiresAt) {
                /* Cancel subscription. */
                sse[sseAddress].isActive = false
                console.info('Automatically canceled subscription for [ %s ]', sseAddress)
                return

                /* Delete subscription. */
                // return delete sse[sseAddress]
            }

            /* Build package. */
            pkg = {
                address,
                target,
                pow,
                hash,
                createdAt,
            }
            console.log('SENDING SHARE', pkg)

            /* Send package. */
            sse[sseAddress].instance.send(pkg)
        }

        return res.end('\n  ✔ stratum-share-ok\n')
    }

    /* Return package. */
    return res.json(pkg)
}

/* Export module. */
module.exports = stratum
