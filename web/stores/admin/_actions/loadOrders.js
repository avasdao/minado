/* Set API endpoint. */
const ENDPOINT = 'https://api.minado.io/v1/admin'

/**
 * Load Orders
 *
 * @param {Object} _constructors
 * @returns
 */
const loadOrders = async ({ rootState, commit }) => {
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
                action: 'get_orders'
            })
        })

        content = await rawResponse.json()
        // console.log('CONTENT (get_orders):', content)

        /* Set orders. */
        commit('SET_ORDERS', content)
    }

    return content
}

/* Export module. */
module.exports = loadOrders
