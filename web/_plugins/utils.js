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

    const endpoint = 'https://api.minado.io/v1/core/'

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

    const content = await rawResponse.json()
    // console.log('CONTENT', content)

    if (!content) {
        console.error('API ERROR!')

        return false
    }

    return content
}

const calcDifficulty = () => {
    // const MAX_DIFFICULTY = BigInt('0x0000001fffff0000000000000000000000000000000000000000000000000000')
    // const curDiff = BigInt('0x00000002deb60000000000000000000000000000000000000000000000000000')
    // return MAX_DIFFICULTY / curDiff
    const nBits = 0x1D02DEA6
    // const nBits = 0x1D016F53
    // const nBits = 0x1C0FFFFF
    console.log('nBits', nBits)

    const nShift = (nBits >> 24) & 0xFF
    console.log('nShift', nShift)

    const dDiff = 0x0000FFFF / (nBits & 0x00FFFFFF)
    console.log('dDiff (0x0000FFFF):', 0x0000FFFF)
    console.log('dDiff (nBits & 0x00FFFFFF):', (nBits & 0x00FFFFFF))
    console.log('dDiff', dDiff)

    // while (nShift < 29)
    // {
    //     dDiff *= 256.0;
    //     nShift++;
    // }
    // while (nShift > 29)
    // {
    //     dDiff /= 256.0;
    //     nShift--;
    // }

    return dDiff
}

export default (context, inject) => {
    inject('utils', {
        calcDifficulty,
        getScriptHash,
        validateAddress
    })
}
