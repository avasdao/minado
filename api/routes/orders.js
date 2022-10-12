/* Import modules. */
const { LogDescription } = require('ethers/lib/utils')
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const ordersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/orders`)

/**
 * Orders Module
 */
const orders = async function (req, res) {
    let body
    let createdAt
    let id
    let pkg
    let results

    body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (body) {
        id = uuidv4()
        createdAt = moment().unix()

        pkg = {
            _id: id,
            src: 'orders',
            ...body,
            createdAt,
        }

        results = await logsDb.put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

    /* Set action. */
    action = body.action

    /* Validate action. */
    if (!action) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing an action.'
        })
    }

    if (action === 'get_orders') {
        /* Set profile id. */
        profileid = body.profileid

        /* Request existing user. */
        results = await minersDb
            .query('api/byProfile', {
                key: profileid,
                include_docs: true,
            })
            .catch(err => {
                console.error('DATA ERROR:', err)
            })
        console.log('PROFILES RESULT (byProfile)', util.inspect(results, false, null, true))

        /* Validate data. */
        if (results && results.rows.length !== 0) {
            /* Map data (doc) results. */
            data = results.rows.map(_miner => {
                return _miner.doc
            })
        }

    }


    /* Set (created) timestamp. */
    createdAt = moment().unix()

    /* Build (data) package. */
    pkg = {
        _id: uuidv4(),
        ...body,
        createdAt,
    }
    console.log('PKG', pkg)

    /* Retrieve results. */
    results = await ordersDb.put(pkg)
        .catch(err => {
            console.error('AUTH ERROR:', err)
        })
    console.log('RESULT (orders)', util.inspect(results, false, null, true))

    if (!results) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json([])
    }

    /* Build (result) package. */
    const result = {
        error: null,
        success: true,
        results,
    }

    /* Return params. */
    res.json(result)
}

/* Export module. */
module.exports = orders
