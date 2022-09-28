import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default createStore({
    state: {
        account: null,
        didToken: null,
        email: null,
        issuer: null,
    },
    getters: {
        // 
    },
    mutations: {
        saveAccount (_state, _account) {
            _state.account = _account
        },

        saveDidToken (_state, _token) {
            _state.didToken = _token
        },

        saveEmail (_state, _email) {
            _state.email = _email
        },

        saveIssuer (_state, _issuer) {
            _state.issuer = _issuer
        },
    },
    actions: {
        setAccount ({ commit }, _account) {
            commit('saveAccount', _account)
        },

        setDidToken ({ commit }, _token) {
            commit('saveDidToken', _token)
        },

        setEmail ({ commit }, _email) {
            commit('saveEmail', _email)
        },

        setIssuer ({ commit }, _issuer) {
            commit('saveIssuer', _issuer)
        },
    },
    modules: {
        // 
    },
    plugins: [vuexLocal.plugin]
})
