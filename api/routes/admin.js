/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

const { Magic } = require('@magic-sdk/admin')

const magicAdmin = new Magic(process.env.MAGIC_LINK_KEY)

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/sessions`)

/**
 * Administration Module
 */
const admin = async function (req, res) {
    let account
    let action
    let body
    let createdAt
    let data
    let didToken
    let email
    let id
    let issuer
    let metadata
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
            src: 'magic',
            ...body,
            createdAt,
        }

        results = await logsDb.put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

    /* Set DID token. */
    didToken = body.didToken
    // console.log('DID Token', didToken)

    if (!didToken) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing DID token.'
        })
    }

    /* Set issuer. */
    issuer = magicAdmin.token.getIssuer(didToken)
    // console.log('ISSUER', issuer)

    /* Set (public) account/address. */
    account = magicAdmin.token.getPublicAddress(didToken)
    // console.log('ACCOUNT', account)

    if (!account) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing user (account) address.'
        })
    }

    /* Set issuer metadata. */
    metadata = await magicAdmin.users.getMetadataByIssuer(issuer)
    // console.log('MAGIC LOGIN (data):', JSON.stringify(metadata, null, 4))

    /* Set email address. */
    email = metadata.email

    if (!email) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing user email.'
        })
    }

    /* Validate (authorized) administrator. */
    if (email !== 'info@modenero.com' && email !== 's.prince@modenero.com') {
        /* Set status. */
        res.status(401)

        /* Return error. */
        return res.json({
            error: 'You are NOT authorized to be here!'
        })
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

    if (action === 'get_profiles') {

        /* Request existing user. */
        results = await profilesDb.query('api/byAddress', {
            include_docs: true,
        }).catch(err => {
            console.error('DATA ERROR:', err)
        })
        console.log('PROFILES RESULT (byEmail)', util.inspect(results, false, null, true))

        /* Validate data. */
        if (results && results.rows.length !== 0) {
            /* Map data (doc) results. */
            data = results.rows.map(_profile => {
                return _profile.doc
            })
        }

    }

    if (action === 'add_profile') {
        createdAt = moment().unix()

        const pkg = {
            _id: uuidv4(),
            nickname: "anon",
            createdAt,
        }

        /* Add new profile. */
        results = await profilesDb
            .put(pkg)
            .catch(err => {
                console.error('DATA ERROR:', err)
            })
        console.log('PROFILES RESULT (addProfile)', util.inspect(results, false, null, true))
    }

    if (action === 'update_profile') {
        /* Request existing profile. */
        results = await profilesDb.query('api/byEmail', {
            key: email,
            include_docs: true,
        }).catch(err => {
            console.error('DATA ERROR:', err)
        })
        console.log('PROFILES RESULT (byEmail)', util.inspect(results, false, null, true))
    }

    /* Build (result) package. */
    pkg = {
        data,
        error: null,
        success: true,
        metadata,
    }

    /* Return params. */
    res.json(pkg)
}

/* Export module. */
module.exports = admin
