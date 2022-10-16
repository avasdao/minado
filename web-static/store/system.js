export const state = () => ({
    searchAddress: null,
    notifs: null,

    panelTab: null,
    isPanelOpen: true,
    isPanelVisible: true
})

export const getters = {
    getSearchAddress (state) {
        return state.searchAddress
    },

    getPanelState (state) {
        return state.isPanelOpen
    },

    getPanelTab (state) {
        return state.panelTab
    },

    getPanelVisibility (state) {
        return state.isPanelVisible
    }
}

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

    SET_SEARCH_ADDRESS (state, _searchAddress) {
        state.searchAddress = _searchAddress
    },

    SET_PANEL_STATE (state, _isPanelOpen) {
        state.isPanelOpen = _isPanelOpen
    },

    SET_PANEL_TAB (state, _tab) {
        state.panelTab = _tab
    },

    SET_PANEL_VISIBILITY (state, _isPanelVisible) {
        state.isPanelVisible = _isPanelVisible
    }
}

export const actions = {
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
