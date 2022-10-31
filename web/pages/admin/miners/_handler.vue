<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Miner Administration
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            Miner Administration
                        </h1>

                        <AdminMinersDetailView
                            :miner="miner"
                            @loadMiner="loadMiner"
                        />
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            class="mx-3 px-3 py-1 text-2xl text-yellow-100 font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                            @click="addMiner"
                        >
                            Add New Miner
                        </button>

                        <AdminMinersListView :miners="miners" />
                    </div>
                </div>
            </div>
        </section>

        <FooterView />
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    middleware: [
        'admin.auth',
        'magic.auth'
    ],
    data: () => ({
        minerid: null,
        miner: null
    }),
    head: () => ({
        title: 'Miner Administration — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    computed: {
        ...mapGetters({
            miners: 'admin/getMiners'
        })
    },
    created: function () {
        /* Validate handler. */
        if (this.$route.params && this.$route.params.handler) {
            // TODO: Handle different stubs.

            /* Set miner id. */
            this.minerid = this.$route.params.handler

            this.loadMiner()
        }
    },
    mounted: function () {
        //
    },
    methods: {
        addMiner () {
            console.log('add a miner') // eslint-disable-line no-console
        },

        async loadMiner () {
            /* Request issuer. */
            const didToken = this.$store.state.profile.didToken

            const rawResponse = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    didToken,
                    action: 'get_miner',
                    minerid: this.minerid
                })
            })

            const content = await rawResponse.json()
            console.log('CONTENT (get_miner):', content) // eslint-disable-line no-console

            this.miner = content
        }

    }
}
</script>
