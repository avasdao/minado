<template>
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Server Administration
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            Server Administration
                        </h1>

                        <AdminServersDetailView
                            :server="server"
                        />
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <NuxtLink to="add"
                            class="mx-3 px-3 py-1 text-2xl text-yellow-100 text-center font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                        >
                            Add New Server
                        </NuxtLink>

                        <AdminServersListView
                            :servers="servers"
                        />
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    middleware: [
        'admin.auth',
        'magic.auth'
    ],
    data: () => ({
        serverid: null,
        server: null
    }),
    head: () => ({
        title: 'Server Administration — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    watch: {
        serverid: function (_serverid) {
            console.log('SERVER ID HAS CHANGED', _serverid)

            this.$store.dispatch('admin/loadServers', _serverid)
        }
    },
    // computed: {
    //     ...mapGetters({
    //         servers: 'admin/getServers'
    //     })
    // },
    created: function () {
        /* Validate handler. */
        if (this.$route.params && this.$route.params.handler) {
            // TODO: Handle different stubs.

            /* Set server id. */
            this.serverid = this.$route.params.handler

            /* Load server. */
            this.loadServer()
        }
    },
    mounted: function () {
        //
    },
    methods: {
        async loadServer () {
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
                    action: 'get_server',
                    serverid: this.serverid
                })
            })

            const content = await rawResponse.json()
            console.log('CONTENT (get_server):', content) // eslint-disable-line no-console

            this.server = content
        }
    }
}
</script>
