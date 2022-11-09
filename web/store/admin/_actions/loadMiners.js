/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

/**
 * Load Miners
 *
 * @param {Object} _constructors
 * @returns
 */
const loadMiners = async ({ rootState, commit }, _profileid) => {
    try {
        let content

        /* Request issuer. */
        const didToken = rootState.profile.didToken

        /* Validate issuer. */
        if (didToken) {
            const rawResponse = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    didToken,
                    action: 'get_miners',
                    profileid: _profileid
                })
            })
            console.log('RAW RESPONSE', rawResponse)

            content = await rawResponse.json()
            console.log('CONTENT (get_miners):', content)

            /* Set notifications. */
            commit('SET_MINERS', content)
        }

        return content
    } catch (err) {
        return null
    }
}

/* Export module. */
module.exports = loadMiners
