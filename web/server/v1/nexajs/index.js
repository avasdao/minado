/* Import modules. */
const Client = require('bitcoin-core')

/* Initialize new Bitcoin client. */
const client = new Client({
    port: process.env.NEXA_RPC_PORT || 7227, // Testnet RPC port is 7229
    host: process.env.NEXA_RPC_HOST || '127.0.0.1',
    username: process.env.NEXA_RPC_USER || 'user',
    password: process.env.NEXA_RPC_PASS || 'password',
})

address = body.address
console.log('\nNotification address:', address)

result = await client.validateAddress(address)
console.log('\nIs address valid:', result.isvalid, result)

/* Validate address. */
if (!result.isvalid) {
    /* Set status. */
    res.status(400)

    /* Return error. */
    return res.json({
        error: 'Your Nexa address is invalid.'
    })
}


const balance = await client.getBalance('*', 0)
console.log('\nBALANCE', balance)
