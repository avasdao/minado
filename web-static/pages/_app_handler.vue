<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">Application Handler</h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <!-- Address View -->
                    <AppHandlerAddressView
                        v-if="addressStub"
                    />

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
export default {
    data: () => ({
        addressStub: null
    }),
    computed: {
        //
    },
    methods: {
        init () {
            let params

            /* Set route. */
            const route = this.$route

            /* Validate route. */
            if (route) {
                params = route.params
                console.log('PARAMS', params)
            }

            /* Validate application handler. */
            if (params && params.app_handler) {
                /* Set id of app handler. */
                const id = params.app_handler

                /* Handle Nexa address. */
                if (id.slice(0, 7) === 'nexa:nq' || id.slice(0, 2) === 'nq') {
                    this.addressStub = params.app_handler

                    /* Set the application (active) address. */
                    this.$store.dispatch('rostrum/setAddress', params.app_handler)
                }

                // TODO: Add more handlers.
                //         - first bits (short addresses)
                //         - referall
            }
        }
    },
    created: function () {
        this.init()
    },
    mounted: function () {
        // NOTE: We have to wait for the page to be mounted (loaded)
        //       before attempting to create a WebSocket connection.
        this.$store.dispatch('rostrum/init')
    }
}
</script>
