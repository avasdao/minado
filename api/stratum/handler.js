/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const sharesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/stratum_shares`)

/**
 * Stratum Module
 */
const stratum = async function (req, res) {
    let body
    let createdAt
    let headers
    let id
    let pkg
    let result

    body = req.body
    console.log('BODY', body)

    headers = req.headers
    console.log('HEADERS', headers)

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
    createdAt = moment().unix()

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

    /* Handle shares. */
    if (body.method === 'share.submit' && body.params) {
        /* Set address. */
        const address = body.params.address

        /* Set source. */
        const src = body.params.src

        /* Set target. */
        const target = body.params.target

        /* Set proof-of-work. */
        const pow = body.params.pow

        /* Set hash. */
        const hash = body.params.hash

        pkg = {
            _id: id, // NOTE: We re-use the log id.
            // ...body,
            address,
            src,
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
    }

    /* Set response id. */
    id = body.id

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

    /* Return package. */
    return res.json(pkg)
}

/* Export module. */
module.exports = stratum
