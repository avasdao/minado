/* Import modules. */
const { LogDescription } = require('ethers/lib/utils')
const { response } = require('express')
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
    let asset
    let body
    let createdAt
    let endpoint
    let id
    let order
    let pkg
    let results
    let tradePair

    try {
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
    
            results = await logsDb
                .put(pkg)
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
    
        /* Handle Sideshift status request. */
        if (action === 'get_sideshift') {
            /* Set id. */
            id = body.orderid
    
            // TODO Validate order id.
    
            /* Set endpoint. */
            endpoint = `https://sideshift.ai/api/v2/shifts/${id}`
    
            /* Request status. */
            response = await superagent
                .get(endpoint)
                .set('accept', 'json')
                .catch(err => console.error(err))
            // console.log('\nSIDESHIFT CALL:', response.body)
    
            /* Validate response body. */
            if (response && response.body) {
                /* Set body. */
                const body = response.body
    
                /* Build package. */
                const pkg = {
                    id: body.id,
                    status: body.status,
                    depositCoin: body.depositCoin,
                    depositNetwork: body.depositNetwork,
                    depositAddress: body.depositAddress,
                    depositAmount: body.depositAmount,
                    createdAt: body.createdAt,
                    expiresAt: body.expiresAt
                }
    
                /* Return package. */
                return res.json(pkg)
            }
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
    
        if (action === 'payment_request') {
            /* Set base pair. */
            asset = body.asset || 'btc-mainnet'
            asset = asset.toLowerCase()

            order = body.order

            // TODO Validate user-info.
    
            id = uuidv4()
            createdAt = moment().unix()
    
            pkg = {
                _id: id,
                action: 'payment_request',
                asset,
                ...order,
                createdAt,
            }
    
            results = await ordersDb
                .put(pkg)
                .catch(err => console.error('ORDERS ERROR:', err))
            console.log('RESULT (orders)', util.inspect(results, false, null, true))

            const MAX_TRIES = 30
            const DELAY = 1000
            let tries = 0

            // TODO While loop for 30 seconds

            const { sleep } = require('../libs/utils')
            await sleep(1000)

            /* Request existing user. */
            results = await ordersDb
                .query('api/NoPaymentAddress', {
                    include_docs: true,
                })
                .catch(err => {
                    console.error('DATA ERROR:', err)
                })
            console.log('ORDERS RESULT (NoPaymentAddress)', util.inspect(results, false, null, true))

            if (results && results.rows) {
                const data = results.rows.map(_rs => {
                    return _rs.doc
                })
                
                return res.json(data)
            } else {
                return res.json({
                    error: 'Oops! Something went wrong.'
                })
            }

        }
    
    
        /* Set (created) timestamp. */
        // createdAt = moment().unix()
    
        /* Build (data) package. */
        // pkg = {
        //     _id: uuidv4(),
        //     ...body,
        //     createdAt,
        // }
        // console.log('PKG', pkg)
    
        /* Retrieve results. */
        // results = await ordersDb
        //     .put(pkg)
        //     .catch(err => {
        //         console.error('AUTH ERROR:', err)
        //     })
        // console.log('RESULT (orders)', util.inspect(results, false, null, true))
    
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
    } catch (err) {
        console.error('ORDERS ERROR', err)

        return res.json(err)
    }
}


/* Export module. */
module.exports = orders
