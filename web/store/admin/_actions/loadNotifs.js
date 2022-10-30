/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

/**
 * Load Notifications
 *
 * @param {Object} _constructors
 * @returns
 */
const loadNotifs = async ({ rootState, commit }) => {
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
                action: 'get_notifs'
            })
        })

        content = await rawResponse.json()
        // console.log('CONTENT (get_notifs):', content)

        /* Set notifications. */
        commit('SET_NOTIFS', content)
    }

    return content
}

/* Export module. */
module.exports = loadNotifs
