/* Import modules. */
const moment = require('moment')
const nodemailer = require('nodemailer')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const ordersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/orders`)

const AFFILIATE_ID = 'sujKhKjvl'
const COMMISSION_RATE = '0.001'


const requestShift = async (_asset, _quoteId) => {
    let settleAddress
    let refundAddress
    let response

    /* Handle settlement address. */
    if (_asset === 'xmr') {
        settleAddress = 'qpqq6euaeldz9hllja3n7ejzk97myhlw8urajzjeqc' // Electron Cash wallet
        refundAddress = '371ygdo1eNSaHPZe82zYw4d41QrixidfLT'
    } else {
        settleAddress = '83tWpsNNjv73TN9bKG7dsU5WPGZE3tax9dACehCduHMMg6k3yVVyxmiL8nRaEvTCAthzoHSbqpMJkYN5abxojQqBD6DfUNd' // Monero GUI wallet
        refundAddress = '371ygdo1eNSaHPZe82zYw4d41QrixidfLT'
    }

    const pkg = {
        settleAddress,
        affiliateId: AFFILIATE_ID,
        quoteId: _quoteId,
        // refundAddress,
    }
    console.log('FIXED SHIFT (pkg):', pkg)

    /* Set endpoint. */
    endpoint = `https://sideshift.ai/api/v2/shifts/fixed`

    /* Request status. */
    response = await superagent
        .post(endpoint)
        .set('x-sideshift-secret', process.env.SIDESHIFT_SECRET)
        .set('accept', 'json')
        .send(pkg)
        .catch(err => console.error(err))
    console.log('\nSIDESHIFT CALL:', response.body)

    return response.body
}

const getQuote = async (
    _depositCoin, 
    _depositNetwork = 'mainnet', 
    _depositAmount
) => {
    let response

    const pkg = {
        depositCoin: _depositCoin,
        depositNetwork: _depositNetwork,
        settleCoin: _depositCoin === 'xmr' ? 'bch' : 'xmr',
        settleNetwork: 'mainnet',
        depositAmount: _depositAmount,
        settleAmount: null,
        affiliateId: AFFILIATE_ID,
        commissionRate: COMMISSION_RATE,
    }
    console.log('GET QUOTE (pkg):', pkg)

    /* Set endpoint. */
    endpoint = `https://sideshift.ai/api/v2/quotes`

    /* Request status. */
    response = await superagent
        .post(endpoint)
        .set('x-sideshift-secret', process.env.SIDESHIFT_SECRET)
        .set('accept', 'json')
        .send(pkg)
        .catch(err => console.error(err))

    if (response && response.body) {
        console.log('\nSIDESHIFT CALL:', response.body)

        return response.body
    }

    return null
}

const getPair = async (_asset) => {
    let response

    /* Set trade pair. */
    const settlement = _asset === 'xmr' ? 'bch-mainnet' : 'xmr-mainnet'

    // TODO Validate order id.

    /* Set endpoint. */
    endpoint = `https://sideshift.ai/api/v2/pair/${_asset}/${settlement}`

    /* Request status. */
    response = await superagent
        .get(endpoint)
        .set('accept', 'json')
        .catch(err => console.error(err))
    console.log('\nSIDESHIFT CALL:', response.body)

    /* Validate response body. */
    if (response && response.body) {
        /* Set body. */
        const body = response.body

        /* Build package. */
        const pkg = {
            // id: body.id,
            min: body.min,
            max: body.max,
            depositCoin: body.depositCoin,
            depositNetwork: body.depositNetwork,
        }
        console.log('SIDESHIFT PKG', pkg)

        /* Return package. */
        return pkg
    }

    return null
}

/**
 * Daemon Handler
 */
const handler = async () => {
    let asset
    let doc
    let error
    let paymentAmount
    let response
    let results

    console.info('\nHandling payment requests..')

    results = await ordersDb
        .query('api/NoPaymentAddress', {
            include_docs: true,
        })
        .catch(err => {
            console.error('DATA ERROR:', err)
        })
    console.log('ORDERS RESULT (NoPaymentAddress)', util.inspect(results, false, null, true))

    if (!results) {
        return console.error('Oops! There were NO DB results.')
    }

    if (!results.rows) {
        return console.error('Oops! There were NO DB rows.')
    }

    results.rows.forEach(async _row => {
        /* Clone DB record (into new doc). */
        doc = JSON.parse(JSON.stringify(_row.doc))
        console.log('PAYMENT REQUEST', doc)

        paymentAmount = doc.totalMiners * 5.00
        console.log('PAYMENT AMOUNT', paymentAmount)

        // const destination = doc.destination

        // TODO Perform basic (email) verification [TRUSTED DB SOURCE].
        asset = doc.asset

        /* Request trade pair. */
        const pair = await getPair(asset)

        /* Request trade quote. */
        const quote = await getQuote(pair.depositCoin, pair.depositNetwork, pair.min)

        /* Request shift. */
        const shift = await requestShift(pair.depositCoin, quote.id)

        /* Build payment package. */
        doc.payment = {
            address: shift.depositAddress,
            pair,
            quote,
            shift,
        }

        /* Update timestamp. */
        doc.updatedAt = moment().unix()

        /* Update record in database. */
        response = await ordersDb
            .put(doc)
            .catch(err => {
                error = err
                console.error(err)
            })

        /* Validate error. */
        if (error) {
            return
        }

        /* Send email. */
        // const success = await _sendEmail(destination)
        
        // TODO Handle email delivery success.
    })
}


/* Export module. */
module.exports = handler
