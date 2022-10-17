export default {
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
