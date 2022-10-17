export default {
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

    SET_PANEL_METADATA (state, _metadata) {
        state.panelMetadata = _metadata
    },

    SET_PANEL_STATE (state, _isPanelOpen) {
        console.log('_isPanelOpen', _isPanelOpen)
        state.isPanelOpen = _isPanelOpen
    },

    SET_PANEL_TAB (state, _tab) {
        state.panelTab = _tab
    },

    SET_PANEL_VISIBILITY (state, _isPanelVisible) {
        console.log('_isPanelVisible', _isPanelVisible)
        state.isPanelVisible = _isPanelVisible
    }
}
