import { magic } from '../plugins/magic'

export const state = () => ({
    // Identification
    id: null,
    parentid: null,
    address: null,
    email: null,

    // Magic
    user: null,
    authenticated: false,

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
        state.user = _userData
        state.authenticated = true
    },

    CLEAR_USER_DATA (state) {
        state.user = null
        state.authenticated = false

        this.$router.push('/profile')
    }
}

export const actions = {
    async login ({ commit }, _auth) {
        await magic.auth.loginWithMagicLink(_auth)

        const metadata = await magic.user.getMetadata()
        commit('SET_USER_DATA', metadata)
    },

    async logout ({ commit }) {
        await magic.user.logout()

        commit('CLEAR_USER_DATA')
    }
}
