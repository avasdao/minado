<template>
    <main class="min-h-full">
        <HeaderView />

        <router-view />

        <FooterView />
    </main>
</template>

<script>
/* Import modules. */
import { Magic } from 'magic-sdk'

/* Import components. */
import FooterView from '@/components/FooterView'
import HeaderView from '@/components/HeaderView'

export default {
    components: {
        FooterView,
        HeaderView,
    },
    data: () => ({
        email: null,
        magic: null,
    }),
    computed: {
        //
    },
    methods: {
        async initMagic() {
            /* Initialize new instance. */
            this.magic = new Magic('pk_live_CAF7378F498C1F81')

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
                this.$store.dispatch('setAccount', userMetadata.publicAddress)
                
                /* Set email. */
                this.$store.dispatch('setEmail', userMetadata.email)
                
                /* Set issuer. */
                this.$store.dispatch('setIssuer', userMetadata.issuer)
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
        },
    },
    created: function () {
        /* Initialize Magic Link. */
        this.initMagic()
    },
    mounted: function () {
        //
    },
}
</script>

<style>
/*  */
</style>
