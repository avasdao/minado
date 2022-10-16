/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export const state = () => ({
    //
})

export const mutations = {
    //
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
