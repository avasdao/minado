<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">Application Handler</h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="col-span-2">

                        <h1>
                            Application Handler
                        </h1>

                        <h2 class="text-xl font-medium">
                            {{id}}
                        </h2>

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
export default {
    data: () => ({
        id: null
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
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
            this.id = params.app_handler
        }
    },
    mounted: function () {
        //
    }
}
</script>
