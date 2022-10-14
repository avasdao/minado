export const state = () => ({
    id: null,
    parentid: null,
    address: null,
    email: null,

    notifs: null,

    privateKey: null,
    seedPhrase: null,

    createdAt: null
})

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
    }
}
