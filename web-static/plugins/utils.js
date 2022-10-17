const hexEnc = require('crypto-js/enc-hex')
const sha256 = require('crypto-js/sha256')

/**
 * Get Script Hash
 *
 * @param {String} _scriptPubkey
 * @returns
 */
const getScriptHash = (_scriptPubkey) => {
    /* Hash script public key using SHA-256. */
    let addrScripthash = hexEnc
        .stringify(
            sha256(
                hexEnc.parse(_scriptPubkey)
            )
        )

    /* Reverse the bytes (in pairs). */
    addrScripthash = addrScripthash.match(/[a-fA-F0-9]{2}/g)
        .reverse()
        .join('')

    /* Return address script hash. */
    return addrScripthash
}

/**
 * Validate Address
 *
 * Makes a remote call to the the Core endpoint of the API.
 */
const validateAddress = async (_address) => {
    if (!_address || _address === '') {
        return false
    }

    const endpoint = 'https://api.nexa.rocks/v1/core/'

    const rawResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'validateaddress',
            params: [_address]
        })
    })
    // console.log('RAW RESPONSE', rawResponse)

    const content = await rawResponse.json()
    // console.log('CONTENT', content)

    if (!content) {
        console.error('API ERROR!')

        return false
    }

    return content.isvalid
}

export default (context, inject) => {
    inject('utils', {
        getScriptHash,
        validateAddress
    })
}
