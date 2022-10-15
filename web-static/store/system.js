export const state = () => ({
    cachedAddress: null,
    notifs: null,

    isPanelShowing: true
})

export const getters = {
    getPanelState (state) {
        return state.isPanelShowing
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

    savePanelState (state, _isPanelShowing) {
        state.isPanelShowing = _isPanelShowing
    }
}

export const actions = {
    openPanel ({ state, commit }) {
        commit('savePanelState', true)
    },

    closePanel ({ state, commit }) {
        console.log('closing panel')
        commit('savePanelState', false)
    },

    setBalance ({ state, commit }, _balance) {
        commit('saveBalance', _balance)
    }
}
