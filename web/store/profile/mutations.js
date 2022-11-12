export default {
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
