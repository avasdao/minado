/* Import modules. */
const Client = require('bitcoin-core')
const ethers = require('ethers')
const moment = require('moment')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')

/* Initialize new Bitcoin client. */
const client = new Client({
    port: process.env.NEXA_RPC_PORT || 7227, // Testnet RPC port is 7229
    host: process.env.NEXA_RPC_HOST || '127.0.0.1',
    username: process.env.NEXA_RPC_USER || 'user',
    password: process.env.NEXA_RPC_PASS || 'password',
})

/**
 * Remote Procedure Call (RPC)
 * 
 * @param {String} _method 
 * @param {Object} _params 
 * @returns 
 */
const rpc = async (_method, _params) => {
    /* Set endpoint. */
    endpoint = `http://user:password@127.0.0.1:7227`
    
    /* Build package. */
    const pkg = {
        "jsonrpc": "2.0", 
        "id": "api", 
        "method": _method, 
        "params": _params,
    }

    /* Request Elasticsearch query. */
    response = await superagent
        .post(endpoint)
        .send(pkg)
        .set('accept', 'json')
        .catch(err => console.error(err))
    console.log('\nRPC CALL:', response.body)

    /* Validate response. */
    if (response && response.body && response.body.result) {
        return response.body.result
    } else {
        return null
    }

}

/**
 * Core (Node) Module
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const core = async function (req, res) {
    let body
    let endpoint
    let pkg
    let response

    try {
        body = req.body
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
    
        if (body.action === 'getbalance') {
            const balance = await client
                .getBalance('*', 0)
                .catch(err => {
                    console.error('ERROR (getbalance):', err)
                })
            console.log('BALANCE', balance)
            return res.json(balance)
        }
    
        /* Handle mining candidate. */
        if (body.action === 'getminingcandidate') {
            const method = 'getminingcandidate'
            const params = []

            /* Make core request. */
            response = await rpc(method, params)
            // console.log('RPC RESPONSE', response)
            
            /* Return response. */
            return res.json(response)
        }
    
        if (body.action === 'getmininginfo') {
            const method = 'getmininginfo'
            const params = []
            const miningInfo = await rpc(method, params)
            // const miningInfo = await client
            //     .getMiningInfo()
            //     .catch(err => {
            //         console.error('ERROR (getmininginfo):', err)
            //     })
            console.log('MINING INFO', miningInfo)
            return res.json(miningInfo)
        }
    
        if (body.action === 'validateaddress') {
            const isValid = await client.validateaddress(body.address)
            console.log('IS VALID', isValid)
            return res.end(isValid)
        }

        if (!pkg) {
            /* Set status. */
            res.status(400)
    
            /* Return error. */
            return res.json({
                error: 'Invalid action requested.'
            })
        }
    
        /* Fallback. */
        return res.end('Oops! Something went wrong.')
    } catch (err) {
        console.error('CORE ERROR', err)

        return res.json(err)
    }
}

/* Export module. */
module.exports = core
