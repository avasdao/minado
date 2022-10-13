/* Import modules. */
const moment = require('moment')
const nodemailer = require('nodemailer')
const PouchDB = require('pouchdb')
const util = require('util')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const ordersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/orders`)

const AFFILIATE_ID = 'sujKhKjvl'
const COMMISSION_RATE = '0.001'

const getQuote = async (
    _depositCoin, 
    _depositNetwork = 'mainnet', 
    _depositAmount
) => {
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
        .send(pkg)
        .set('x-sideshift-secret', process.env.SIDESHIFT_SECRET)
        .set('accept', 'json')
        .catch(err => console.error(err))
    console.log('\nSIDESHIFT CALL:', response.body)

    return response.body

    /* Validate response body. */
    // if (response && response.body) {
    //     /* Set body. */
    //     const body = response.body

    //     /* Build package. */
    //     const pkg = {
    //         // id: body.id,
    //         min: body.min,
    //         max: body.max,
    //         depositCoin: body.depositCoin,
    //         depositNetwork: body.depositNetwork,
    //     }
    //     console.log('SIDESHIFT PKG', pkg)

    //     await getQuote(basePair)

    //     /* Return package. */
    //     return res.json(pkg)
    // }

}

const getPair = async () => {
    /* Set trade pair. */
    tradePair = basePair === 'xmr' ? 'bch-mainnet' : 'xmr-mainnet'

    // TODO Validate order id.

    /* Set endpoint. */
    endpoint = `https://sideshift.ai/api/v2/pair/${basePair}/${tradePair}`

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

        // await getQuote(basePair)

        /* Return package. */
        return res.json(pkg)
    }
}

/**
 * Daemon Handler
 */
const handler = async () => {
    let doc
    let error
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

        // const destination = doc.destination

        // TODO Perform basic (email) verification [TRUSTED DB SOURCE].

        /* Set delivered flag. */
        // doc.isDelivered = true

        /* Update timestamp. */
        // doc.updateAt = moment.unix()

        /* Update record in database. */
        // response = await notifsDb
        //     .put(doc)
        //     .catch(err => {
        //         error = err
        //         console.error(err)
        //     })

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
