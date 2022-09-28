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

            const isLoggedIn = await this.magic.user.isLoggedIn()
            console.log('isLoggedIn', isLoggedIn)

            /* Validate login. */
            if (isLoggedIn) {
                /* Get user metadata including email */
                const userMetadata = await this.magic.user.getMetadata()

                console.log('USER METADATA', userMetadata)
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
