<template>
    <main class="-mt-24 pb-8">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="sr-only">Profile Manager</h1>

            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                    <h1 class="text-4xl font-bold text-yellow-900">
                        Profile Manager
                    </h1>

                    <p class="text-yellow-900">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aliquam maiores animi iusto est laborum quas dolore assumenda voluptate quis! Quaerat corrupti enim autem iusto voluptates dolorum quae voluptate eligendi.
                    </p>

                    <div v-if="isLoggedIn" class="p-5 bg-yellow-500 rounded-lg border-4 border-yellow-700">
                        <h1 class="text-xl font-bold">
                            You are already signed in
                        </h1>
                        
                        <input 
                            class="mt-3 px-3 py-1 block bg-yellow-200 text-xl border-4 border-yellow-400 rounded-lg"
                            type="text"
                            :value="email"
                            disabled
                        />

                        <input 
                            class="mt-3 px-3 py-1 block w-full bg-yellow-200 text-xl border-4 border-yellow-400 rounded-lg"
                            type="text"
                            :value="address"
                            disabled
                        />
                    </div>

                    <div v-else class="p-5 bg-yellow-500 rounded-lg border-4 border-yellow-700">
                        <h1 class="text-xl font-bold">
                            Sign in to continue
                        </h1>
                        
                        <input 
                            @click="login"
                            class="mt-3 px-3 py-1 bg-yellow-200 text-xl border-4 border-yellow-400 rounded-lg"
                            type="text"
                            placeholder="Enter your email address"
                            v-model="email"
                        />

                        <button class="mt-3 block px-3 py-1 bg-blue-200 text-blue-800 text-xl border-2 border-blue-400 rounded-lg hover:bg-blue-300">
                            Request a 'Magic' email link
                        </button>
                    </div>

                </section>

                <!-- Right column -->
                <div class="grid grid-cols-1 gap-4">
                    <PayoutsPanel />

                    <BlockRewardsPanel />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import { Magic } from 'magic-sdk'

/* Import components. */
import BlockRewardsPanel from '@/components/BlockRewardsPanel'
import PayoutsPanel from '@/components/PayoutsPanel'

export default {
    components: {
        BlockRewardsPanel,
        PayoutsPanel,
    },
    data: () => ({
        address: null,
        email: null,
        magic: null,
        isLoggedIn: null,
    }),
    computed: {
        //
    },
    methods: {
        async initMagic() {
            /* Initialize new instance. */
            this.magic = new Magic('pk_live_CAF7378F498C1F81')

            this.isLoggedIn = await this.magic.user.isLoggedIn()

            /* Validate login. */
            if (this.isLoggedIn) {
                /* Get user metadata including email */
                const userMetadata = await this.magic.user.getMetadata()

                /* Set email address. */
                this.email = userMetadata.email

                /* Set public address. */
                this.address = userMetadata.publicAddress
            }
        },
        
        async login() {
            /* Set redirect URI. */
            const redirectURI = `${window.location.origin}/profile`

            console.log('LOGIN', this.email, redirectURI)
  
            /* Validate email. */
            if (this.email) {
                /* Request login. */
                await this.magic.auth.loginWithMagicLink({ 
                    email: this.email, 
                    redirectURI,
                })
            }
        },

        async logout() {
             await this.magic.user.logout()
        },
    },
    created: function () {
        this.isLoggedIn = false

        this.initMagic()
    },
    mounted: function () {
        //
    },
}
</script>
