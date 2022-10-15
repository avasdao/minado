const sha256 = require('crypto-js/sha256')
const hexEnc = require('crypto-js/enc-hex')

export const actions = {
    fetchCounter ({ state }) {
        // make request
        const res = { data: 10 }
        state.counter = res.data
        return res.data
    },

    /**
     * Get Script Hash
     *
     * Calculates the script hash from the script public key.
     *
     * @param {Object} _ // constructors
     * @param {Object} _scriptPubkey
     * @returns
     */
    getScriptHash (_, _scriptPubkey) {
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
        // console.log('UTILS (addrScripthash):', addrScripthash)

        /* Return address script hash. */
        return addrScripthash
    }
}
