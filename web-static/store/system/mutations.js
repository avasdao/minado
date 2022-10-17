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

    SET_PANEL_STATE (state, _isPanelOpen) {
        state.isPanelOpen = _isPanelOpen
    },

    SET_PANEL_TAB (state, _tab) {
        console.log('setting panel tab', _tab)
        state.panelTab = _tab
    },

    SET_PANEL_VISIBILITY (state, _isPanelVisible) {
        console.log('setting panel visibility', _isPanelVisible)
        state.isPanelVisible = _isPanelVisible
    }
}
