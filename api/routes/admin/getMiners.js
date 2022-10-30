/* Import modules. */
const util = require('util')
const PouchDB = require('pouchdb')

/* Initialize databases. */
const minersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/miners`)

/**
 * Get Miners
 */
const getMiners = async (res, _body) => {
    const profileid = _body.profileid
    let data

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
        /* Map data (doc) entries. */
        data = results.rows.map(_entry => {
            return _entry.doc
        })
    }

    /* Send  data response to client. */
    res.json(data)
}

/* Export module. */
module.exports = getMiners
