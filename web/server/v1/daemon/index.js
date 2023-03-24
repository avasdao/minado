/* Import modules. */
const Client = require('bitcoin-core')
const moment = require('moment')
const nodemailer = require('nodemailer')
const PouchDB = require('pouchdb')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
// const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const notifsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/notifs`)
const ordersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/orders`)
// const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/sessions`)

/* Initialize new Bitcoin client. */
const client = new Client({
    port: process.env.NEXA_RPC_PORT || 7227, // Testnet RPC port is 7229
    host: process.env.NEXA_RPC_HOST || '127.0.0.1',
    username: process.env.NEXA_RPC_USER || 'user',
    password: process.env.NEXA_RPC_PASS || 'password',
})


/**
 * Runner
 */
const run = async function () {
    let id
    let address
    let body
    let error
    let doc
    let response
    let results

    /**
     * Handle Notifications
     */
    _handleNotifs = async () => {
        console.info('\nHandling notifications..')

        results = await notifsDb
            .query('api/Undelivered', {
                include_docs: true,
            })
            .catch(err => {
                console.error('DATA ERROR:', err)
            })
        console.log('NOTIFS RESULT (Undelivered)', util.inspect(results, false, null, true))

        if (!results) {
            return console.error('Oops! There were NO DB results.')
        }

        if (!results.rows) {
            return console.error('Oops! There were NO DB rows.')
        }

        results.rows.forEach(async _row => {
            /* Clone DB record (into new doc). */
            doc = JSON.parse(JSON.stringify(_row.doc))

            const destination = doc.destination

            // TODO Perform basic (email) verification [TRUSTED DB SOURCE].

            /* Set delivered flag. */
            doc.isDelivered = true

            /* Update timestamp. */
            doc.updateAt = moment.unix()

            /* Update record in database. */
            response = await notifsDb
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
            const success = await _sendEmail(destination)
            
            // TODO Handle email delivery success.
        })

    }

    _updateWallet = async () => {
        let hotWalletBalance

        console.info('\nUpdating wallet..')

        hotWalletBalance = await client.getBalance('*', 0)
        console.log('  Hot wallet balance:', hotWalletBalance)
    }



    /* Initialize 5-second intervals. */
    setInterval(() => {
        _handleNotifs()
        
        require('./handlers/paymentRequests')()
    }, 5000)
    
    /* Initialize 15-second intervals. */
    setInterval(() => {
        _updateWallet()
    }, 15000)
    

    // client.getInfo().then((help) => console.log(help))
return

    /* Generate id. */
    id = uuidv4()

    /* Add record to database. */
    response = await notifsDb
        .put({
            _id: id,
            ...body,
        })
        .catch(err => {
            console.error(err)

            return res.json(err)
        })


    /* Send response back to client. */
    res.json({
        databaseId: response.id,
        messageId: info.messageId,
    })
}

const _sendEmail = async (_dest) => {
    const msgFrom = '"Nexa Rocks" <support@nexa.rocks>'

    const msgRecipient = _dest

    const msgSubject = 'Nexa Rocks! Event'

    const msgDetails = {
        txid: 'd465b82e9d9e74a19b5ea0ac09308be93be8e5f3b46ad8ceb0da99005b7e9b2e',
    }

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: msgFrom,
        to: msgRecipient,
        subject: msgSubject,
        text: require('./templates/order-receipt-text')(msgDetails),
        html: require('./templates/order-receipt-html')(msgDetails),
    })
    console.log('Message sent: %s', info.messageId)
}

run()
