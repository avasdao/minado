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

    SET_USER_DATA (state, _userData) {
        /* Set user (from metadata). */
        state.user = _userData.metadata

        /* Set DID token. */
        state.didToken = _userData.token

        /* Set authorization flag. */
        state.authenticated = true
    },

    CLEAR_USER_DATA (state) {
        state.user = null
        state.authenticated = false

        this.$router.push('/')
    }
}
