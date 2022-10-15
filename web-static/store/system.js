export const state = () => ({
    cachedAddress: null,
    notifs: null,

    isPanelOpen: true,
    isPanelVisible: true
})

export const getters = {
    getPanelState (state) {
        return state.isPanelOpen
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

    savePanelState (state, _isPanelOpen) {
        state.isPanelOpen = _isPanelOpen
    },

    savePanelVisibility (state, _isPanelVisible) {
        state.isPanelVisible = _isPanelVisible
    }
}

export const actions = {
    openPanel ({ state, commit }) {
        commit('savePanelVisibility', true)

        setTimeout(() => {
            commit('savePanelState', true)
        }, 0)
    },

    closePanel ({ state, commit }) {
        commit('savePanelState', false)

        setTimeout(() => {
            commit('savePanelVisibility', false)
        }, 700)
    },

    setBalance ({ state, commit }, _balance) {
        commit('saveBalance', _balance)
    }
}
