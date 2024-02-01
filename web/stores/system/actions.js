export default {
    openPanel ({ commit }, _tab) {
        if (typeof _tab === 'string' || _tab instanceof String) {
            commit('SET_PANEL_TAB', _tab)
        } else {
            commit('SET_PANEL_TAB', _tab.tab)
            commit('SET_PANEL_METADATA', _tab.metadata)
        }

        commit('SET_PANEL_VISIBILITY', true)

        setTimeout(() => {
            commit('SET_PANEL_STATE', true)
        }, 0)
    },

    closePanel ({ commit }) {
        commit('SET_PANEL_STATE', false)

        setTimeout(() => {
            commit('SET_PANEL_VISIBILITY', false)
        }, 700)
    },

    setPanelTab ({ commit }, _tab) {
        if (typeof _tab === 'string' || _tab instanceof String) {
            commit('SET_PANEL_TAB', _tab)
        } else {
            commit('SET_PANEL_TAB', _tab.tab)
            commit('SET_PANEL_METADATA', _tab.metadata)
        }
    },

    setNexUsd ({ commit }, _nexUsd) {
        commit('SET_NEX_USD', _nexUsd)
    },

    setNexCap ({ commit }, _nexCap) {
        commit('SET_NEX_CAP', _nexCap)
    },

    setSearchAddress ({ commit }, _searchAddress) {
        commit('SET_SEARCH_ADDRESS', _searchAddress)
    }
}
