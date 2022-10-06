/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const stratumDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/shares`)

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

    pkg = {
        _id: id,
        src: headers['host'] ? headers['host'] : 'stratum',
        headers,
        ...body,
        createdAt,
    }

    result = await logsDb.put(pkg)
        .catch(err => console.error('LOGS ERROR:', err))

    pkg = {
        _id: id,
        ...body,
        ip: headers['cf-connecting-ip'] ? headers['cf-connecting-ip'] : null,
        createdAt,
    }

    result = await stratumDb.put(pkg)
        .catch(err => console.error('STRATUM ERROR:', err))

    /* Set response id. */
    id = body.id
    
    /* Set response error. */
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
