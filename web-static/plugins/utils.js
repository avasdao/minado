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

export default (context, inject) => {
    inject('utils', {
        getScriptHash
    })
}
