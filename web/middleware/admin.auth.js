export default function ({ store, redirect }) {
    if (store.state.profile.user) {
        // console.log('store.state.profile.user', store.state.profile.user)

        /* Retrieve email (from store). */
        const email = store.state.profile.user.email

        // TODO: Can we setup a decentralized ACL?

        if (email === 'info@avasdao.org') {
            return
        }

        if (email === 'info@modenero.com') {
            return
        }

        if (email === 's.prince@modenero.com') {
            return
        }
    }

    /* If the user is not authenticated, redirect to login page. */
    return redirect('/profile')
}
