<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Profile Administration
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            Profile Administration
                        </h1>

                        <p class="text-yellow-900">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aliquam maiores animi iusto est laborum quas dolore assumenda voluptate quis! Quaerat corrupti enim autem iusto voluptates dolorum quae voluptate eligendi.
                        </p>
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            class="mx-3 px-3 py-1 text-2xl text-yellow-100 font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                            @click="addProfile"
                        >
                            Add New Profile
                        </button>

                        <AdminProfilesPanel :profiles="profiles" />

                        <BlockRewardsPanel />
                    </div>
                </div>
            </div>
        </section>

        <FooterView />
    </main>
</template>

<script>
/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    middleware: [
        'admin',
        'magic.auth'
    ],
    data: () => ({
        profiles: null
    }),
    head: () => ({
        title: 'Blank — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    computed: {
        //
    },
    created: function () {
        this.init()
    },
    mounted: function () {
        //
    },
    methods: {
        async init () {
            /* Request magic. */
            // this.magic = this.$store.state.magic
            // console.log('STORE (magic):', this.magic)

            /* Request issuer. */
            const didToken = this.$store.state.profile.didToken
            // console.log('DID TOKEN', didToken)

            /* Validate issuer. */
            if (didToken) {
                const rawResponse = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        didToken,
                        action: 'get_profiles'
                    })
                })
                // console.log('RAW RESPONSE', rawResponse)

                const content = await rawResponse.json()
                // console.log('CONTENT (get_profiles):', content)

                /* Set profiles. */
                this.profiles = content.data

                if (this.$route.params && this.$route.params.profileid) {
                    this.loadProfile(this.$route.params.profileid)
                }
            }
        },

        addProfile () {
            console.log('add a profile') // eslint-disable-line no-console
        }
    }
}
</script>
