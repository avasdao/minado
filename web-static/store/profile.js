import { magic } from '../plugins/magic'

export const state = () => ({
    // Identification
    id: null,
    parentid: null,
    address: null,
    email: null,

    // Magic
    user: null,
    authenticated: false, // FIXME: Should this be persisted??
    // NOTE: We should consider "when" to check this in "real-time" using:
    //       `this.magic.user.isLoggedIn()`

    // Messaging
    notifs: null,

    // Security
    didToken: null,
    privateKey: null,
    seedPhrase: null,

    // Time
    createdAt: null
})

export const mutations = {
    add (state, text) {
        state.list.push({
            text,
            done: false
        })
    },

    remove (state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1)
    },

    toggle (state, todo) {
        todo.done = !todo.done
    },

    SET_USER_DATA (state, _userData) {
        /* Set user (from metadata). */
        state.user = _userData.metadata

        /* Set DID token. */
        state.didToken = _userData.token

        /* Set authorization flag. */
        state.authenticated = true
    },

    CLEAR_USER_DATA (state) {
        state.user = null
        state.authenticated = false

        this.$router.push('/')
    }
}

export const actions = {
    async signin ({ commit }, _auth) {
        await magic.auth.loginWithMagicLink(_auth)

        const metadata = await magic.user.getMetadata()
        const token = await magic.user.getIdToken()

        commit('SET_USER_DATA', {
            metadata,
            token
        })
    },

    async signout ({ commit }) {
        await magic.user.logout()

        commit('CLEAR_USER_DATA')
    }
}
