<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">Nexa Rocks Dashboard</h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="col-span-2">
                        <WelcomePanel />

                        <ActivityPanel />
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <PayoutsPanel />

                        <BlockRewardsPanel />
                    </div>
                </div>
            </div>
        </section>

        <FooterView />
    </main>
</template>

<script>
/* Import modules. */
import { Magic } from 'magic-sdk'

/* Import components. */
// import FooterView from '@/components/FooterView'
// import HeaderView from '@/components/HeaderView'

export default {
    components: {
        // FooterView,
        // HeaderView,
    },
    data: () => ({
        email: null,
        magic: null
    }),
    computed: {
        //
    },
    methods: {
        async initMagic () {
            /* Initialize new instance. */
            this.magic = new Magic('pk_live_CAF7378F498C1F81')

            /* Set magic. */
            // this.$store.dispatch('setMagic', this.magic)

            /* Validate login auth. */
            const isLoggedIn = await this.magic.user.isLoggedIn()
            console.info('Magic Link (isLoggedIn):', isLoggedIn)

            /* Validate login. */
            if (isLoggedIn) {
                /* Get user metadata including email */
                const token = await this.magic.user.getIdToken()
                // console.log('USER DID TOKEN', token)

                /* Set DID token. */
                this.$store.dispatch('setDidToken', token)

                /* Get user metadata including email */
                const userMetadata = await this.magic.user.getMetadata()
                console.info('Magic Link (user metadata):', userMetadata)

                /* Set account. */
                // this.$store.dispatch('setAccount', userMetadata.publicAddress)

                /* Set email. */
                // this.$store.dispatch('setEmail', userMetadata.email)

                /* Set issuer. */
                // this.$store.dispatch('setIssuer', userMetadata.issuer)
            }

            // if (window.location.pathname === '/callback') {
            //     try {
            //         /* Complete the "authentication callback" */
            //         await this.magic.auth.loginWithCredential()

            //         /* Get user metadata including email */
            //         const userMetadata = await this.magic.user.getMetadata()

            //         html = `
            //             <h1>Current user: ${userMetadata.email}</h1>
            //             <button onclick="handleLogout()">Logout</button>
            //         `
            //     } catch {
            //         /* In the event of an error, we'll go back to the login page */
            //         window.location.href = window.location.origin;
            //     }
            // }

            // console.log('html', html)
        }
    },
    created: function () {
        /* Initialize Magic Link. */
        // this.initMagic()
    },
    mounted: async function () {
        // this.$store.dispatch('rostrum/init')

        // const scriptPubkey = '00511417b25c22cc7ce6bf5a8b1ee945638c5f143a3c06' // Rpi (nexa:nqtsq5g5z7e9cgkv0nnt7k5trm552cuvtu2r50qxzeknvu3u)
        // console.log('scriptPubkey', scriptPubkey)

        // const scriptHash = await this.$store.dispatch('utils/getScriptHash', scriptPubkey)
        // console.log('SCRIPT HASH', scriptHash)

        // const request = {
        //     method: 'blockchain.scripthash.get_balance',
        //     params: [scriptHash]
        // }
        // this.$store.dispatch('rostrum/makeRequest', request)
    }
}
</script>

<style>
/*  */
</style>
