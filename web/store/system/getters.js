export default {
    getSearchAddress (state) {
        return state.searchAddress
    },

    getPanelMetadata (state) {
        return state.panelMetadata
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
