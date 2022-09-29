/* Import modules. */
const ethers = require('ethers')
const moment = require('moment')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')

/**
 * Sessions Module
 */
const sessions = async function (req, res) {
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

    return res.json(body)
}

/* Export module. */
module.exports = sessions
