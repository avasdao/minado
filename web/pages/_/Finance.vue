<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Financial Dashboard
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <div class="flex flex-row justify-between">
                            <h1 class="text-4xl font-bold text-yellow-900">
                                Finance Center
                            </h1>

                            <router-link :to="'/' + addressStub" class="flex items-center w-fit px-3 py-1 bg-yellow-400 border-2 border-yellow-600 rounded-lg">
                                Back to Monitoring Station
                            </router-link>
                        </div>

                        <p class="text-yellow-900">
                            This area will most likely display information about an Address financial details.

                            <ol class="pl-10 list-decimal">
                                <li>Price history</li>
                            </ol>
                        </p>
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <PayoutsBlock />

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
    // middleware: 'magic.auth',
    data: () => ({
        addressStub: null
    }),
    head: () => ({
        title: 'Financial Dashboard — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    created: function () {
        this.init()
    },
    mounted: function () {
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
            if (params && params.pathMatch) {
                /* Set id of app handler. */
                const id = params.pathMatch

                /* Handle Nexa address. */
                if (id.slice(0, 7) === 'nexa:nq' || id.slice(0, 2) === 'nq') {
                    this.addressStub = params.pathMatch

                    /* Set the application (active) address. */
                    return this.$store.dispatch('rostrum/setAddress', params.pathMatch)
                }

                // TODO: Add more handlers.
                //         - first bits (short addresses)
                //         - referall
            }
        }
    }
}
</script>
