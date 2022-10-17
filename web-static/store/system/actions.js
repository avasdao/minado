export default {
    openPanel ({ commit }, _tab) {
        commit('SET_PANEL_TAB', _tab)

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
        commit('SET_PANEL_TAB', _tab)
    },

    setSearchAddress ({ commit }, _searchAddress) {
        commit('SET_SEARCH_ADDRESS', _searchAddress)
    }
}
