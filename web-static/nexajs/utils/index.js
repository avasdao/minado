const getScriptHash = () => {
    let addrScripthash = hexEnc.stringify(sha256(hexEnc.parse(scriptPubkey)))
    addrScripthash = addrScripthash.match(/[a-fA-F0-9]{2}/g).reverse().join('')
}
