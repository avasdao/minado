/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export const state = () => ({
    profiles: null
})

export const getters = {
    getProfiles (state) {
        return state.profiles
    }
}

export const mutations = {
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
    },

    loadProfile (_, _profileid) {
        console.log('loDING PROFILE ID', _profileid)
        // this.getMiners()

        // const profile = this.profiles.find((_profile) => {
        //     return _profile._id === _profileid
        // })

        // /* Set first name. */
        // this.firstName = profile.firstName

        // /* Set last name. */
        // this.lastName = profile.lastName

        // /* Set email. */
        // this.email = profile.email

        // /* Set address. */
        // this.address = profile.address

        // /* Set profile display. */
        // this.profile = profile
    },

    async loadProfiles ({ rootState, commit }) {
        /* Request issuer. */
        const didToken = rootState.profile.didToken
        console.log('DID TOKEN', didToken)

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
            console.log('RAW RESPONSE', rawResponse)

            const content = await rawResponse.json()
            console.log('CONTENT (get_profiles):', content)

            /* Set profiles. */
            commit('SET_PROFILES', content.data)
        }
    },

    async addMiner () {
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
                action: 'add_miner',
                profileid: this.profileid,
                hostname: this.hostname,
                location: this.location,
                auth: this.auth,
                pid: this.pid,
                count: this.count
            })
        })
        // console.log('RAW RESPONSE', rawResponse)

        const content = await rawResponse.json()
        console.log('CONTENT', content) // eslint-disable-line no-console

        /* Set profiles. */
        // this.init()
    }
}
