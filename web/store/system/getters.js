export default {
    getNexUsd (state) {
        return state.nexUsd
    },

    getNexCap (state) {
        return state.nexCap
    },

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
