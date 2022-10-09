/* Import modules. */
const { LogDescription } = require('ethers/lib/utils')
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const sideshiftDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/sideshift`)

/**
 * Sideshift Module
 */
const sideshift = async function (req, res) {
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
            src: 'sideshift',
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

    if (action === 'get_coins') {
        /* Initialize package. */
        pkg = []

        /* Add Avalanche (AVAX). */
        pkg.push(require('./sideshift/avax'))

        /* Add Bitcoin Cash (BCH). */
        pkg.push(require('./sideshift/bch'))

        /* Add Binance (BNB). */
        pkg.push(require('./sideshift/bnb'))

        /* Add Bitcoin (BTC). */
        pkg.push(require('./sideshift/btc'))

        /* Add Binance USD (BUSD). */
        pkg.push(require('./sideshift/busd'))

        /* Add Dai (DAI). */
        pkg.push(require('./sideshift/dai'))

        /* Add Dash (DASH). */
        pkg.push(require('./sideshift/dash'))

        /* Add Dogecoin (DOGE). */
        pkg.push(require('./sideshift/doge'))

        /* Add Ethereum (ETH). */
        pkg.push(require('./sideshift/eth'))

        /* Add Litecoin (LTC). */
        pkg.push(require('./sideshift/ltc'))

        /* Add Polygon (MATIC). */
        pkg.push(require('./sideshift/matic'))

        /* Add Matic Internet Money (MIM). */
        pkg.push(require('./sideshift/mim'))
        
        /* Add Tron (TRX). */
        pkg.push(require('./sideshift/trx'))
        
        /* Add USDC. */
        pkg.push(require('./sideshift/usdc'))
        
        /* Add Decentralized USD (USDD). */
        pkg.push(require('./sideshift/usdd'))

        /* Add Tether (USDT). */
        pkg.push(require('./sideshift/usdt'))

        /* Add Stellar (XLM). */
        pkg.push(require('./sideshift/xlm'))

        /* Add Monero (XMR). */
        pkg.push(require('./sideshift/xmr'))

        /* Add Ripple (XRP). */
        pkg.push(require('./sideshift/xrp'))

        /* Add Zcash (ZEC). */
        pkg.push(require('./sideshift/zec'))

        console.log('PKG', pkg)

        return res.json(pkg)
    }


    if (action === 'get_miners') {
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
    results = await sideshiftDb.put(pkg)
        .catch(err => {
            console.error('AUTH ERROR:', err)
        })
    console.log('RESULT (sideshift)', util.inspect(results, false, null, true))

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
module.exports = sideshift
