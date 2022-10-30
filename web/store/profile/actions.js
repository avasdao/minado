import { magic } from '@/plugins/magic'

export default {
    async signin ({ commit }, _auth) {
        await magic.auth.loginWithMagicLink(_auth)

        const metadata = await magic.user.getMetadata()
        const token = await magic.user.getIdToken()

        commit('SET_USER_DATA', {
            metadata,
            token
        })
    },

    async signout ({ commit }) {
        await magic.user.logout()

        commit('CLEAR_USER_DATA')
    }
}
