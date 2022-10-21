/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export const state = () => ({
    miners: null,
    notifs: null,
    profiles: null
})

export const getters = {
    getMiners (state) {
        return state.miners
    },

    getNotifs (state) {
        return state.notifs
    },

    getProfiles (state) {
        return state.profiles
    }
}

export const mutations = {
    SET_MINERS (state, _miners) {
        state.miners = _miners
    },

    SET_NOTIFS (state, _notifs) {
        state.notifs = _notifs
    },

    SET_PROFILES (state, _profiles) {
        state.profiles = _profiles
    }
}

export const actions = {
    async addProfile () {
        /* Request issuer. */
        const didToken = this.$store.state.didToken

        const rawResponse = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                didToken,
                action: 'add_profile'
            })
        })
        // console.log('RAW RESPONSE', rawResponse)

        const content = await rawResponse.json()
        console.log('CONTENT', content) // eslint-disable-line no-console

        /* Set profiles. */
        this.init()

        return content
    },

    async loadProfiles ({ rootState, commit }) {
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
                    action: 'get_profiles'
                })
            })
            // console.log('RAW RESPONSE', rawResponse)

            content = await rawResponse.json()
            // console.log('CONTENT (get_profiles):', content)

            /* Set profiles. */
            commit('SET_PROFILES', content.data)
        }

        return content
    },

    async loadNotifs ({ rootState, commit }) {
        let content

        /* Request issuer. */
        const didToken = rootState.profile.didToken
        console.log('loading didToken', didToken)

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
            console.log('RAW RESPONSE', rawResponse)

            content = await rawResponse.json()
            console.log('CONTENT (get_profiles):', content)

            /* Set profiles. */
            commit('SET_NOTIFS', content)
        }

        return content
    },

    async loadMiners ({ rootState, commit }, _profileid) {
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
            // console.log('RAW RESPONSE', rawResponse)

            content = await rawResponse.json()
            console.log('CONTENT (get_miners):', content) // eslint-disable-line no-console

            /* Set miners. */
            commit('SET_MINERS', content.data)
        }

        return content
    },

    async addMiner ({ rootState }, _profileid) {
        /* Request issuer. */
        const didToken = rootState.profile.didToken

        const rawResponse = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                didToken,
                action: 'add_miner',
                profileid: _profileid,
                hostname: null,
                location: null,
                auth: null,
                pid: null,
                count: null
            })
        })
        // console.log('RAW RESPONSE', rawResponse)

        const content = await rawResponse.json()
        // console.log('CONTENT (add_miner):', content) // eslint-disable-line no-console

        return content
    }
}
