export default () => ({
    // Identification
    id: null,
    parentid: null,
    address: null,
    email: null,

    // Magic
    user: null,
    authenticated: false, // FIXME: Should this be persisted??
    // NOTE: We should consider "when" to check this in "real-time" using:
    //       `this.magic.user.isLoggedIn()`

    // Messaging
    notifs: null,

    // Security
    didToken: null,
    privateKey: null,
    seedPhrase: null,

    // Time
    createdAt: null
})
