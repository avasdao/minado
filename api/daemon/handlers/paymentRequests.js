/* Import modules. */
const moment = require('moment')
const nodemailer = require('nodemailer')
const PouchDB = require('pouchdb')
const util = require('util')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const ordersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/orders`)

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
