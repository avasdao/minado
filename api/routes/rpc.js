/* Import modules. */
const ethers = require('ethers')
const moment = require('moment')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')

/**
 * RPC Module
 */
const rpc = async function (req, res) {
    console.log('BODY', req.body)

    const body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (!body) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing body parameter.'
        })
    }

    /* Set endpoint. */
    const endpoint = `http://user:password@127.0.0.1:7227`
    // console.log('ENDPOINT', endpoint)

    const pkg = {
        "jsonrpc": "2.0", 
        "id": "api", 
        "method": "getmininginfo", 
        "params": [],
    }

    /* Request Elasticsearch query. */
    response = await superagent
        .post(endpoint)
        .send(pkg)
        .set('accept', 'json')
        .catch(err => console.error(err))
    console.log('\nRPC CALL (getmininginfo):', response.body)


    return res.json(response.body)
}

/* Export module. */
module.exports = rpc
