/* Import modules. */
import Vue from 'vue'
import Vuex from 'vuex'

/ Initialize Vuex. */
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /* Haidi (Bot). */
        haidi: null,

        /* WebSocket connection. */
        ws: null,

        /* Network reports. */
        reports: []
    },
    mutations: {
        SET_HAIDI (_state, _haidi) {
            /* Set Haidi. */
            _state.haidi = _haidi
        },
        SET_WEB_SOCKET (_state, _ws) {
            /* Set WebSocket. */
            _state.ws = _ws
        },
        ADD_NETWORK_REPORT (_state, _report) {
            /* Set WebSocket. */
            _state.reports.push(_report)
        }
    },
    actions: {
        setHaidi (_context, _haidi) {
            _context.commit('SET_HAIDI', _haidi)
        },
        setWebSocket (_context, _ws) {
            _context.commit('SET_WEB_SOCKET', _ws)
        },
        addNetworkReport (_context, _report) {
            _context.commit('ADD_NETWORK_REPORT', _report)
        }
    }
})
