<template>
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Logs Manager
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="col-span-2">
                        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                            <h1 class="text-4xl font-bold text-yellow-900">
                                Logs Manager
                            </h1>
                        </div>

                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            class="mx-3 px-3 py-1 text-2xl text-yellow-100 font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                            @click="exportLog"
                        >
                            Export Log
                        </button>

                        <AdminProfilesList
                            :profiles="profiles"
                        />

                        <BlockRewardsPanel />
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
export default {
    middleware: [
        'admin.auth',
        // 'magic.auth'
    ],
    data: () => ({
        profileid: null,
        profile: null,
        magic: null,

        miner: null,
        miners: null,

        hostname: null,
        location: null,
        auth: null,
        pid: null,
        count: null
    }),
    head: () => ({
        title: 'Log Manager — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    // computed: {
    //     ...mapGetters({
    //         profiles: 'admin/getProfiles'
    //     })
    // },
    created: function () {
        this.init()
    },
    mounted: function () {
        //
    },
    methods: {
        init () {
            /* Request profiles. */
            this.$store.dispatch('admin/loadProfiles')
        },

        exportLog () {
            //
        }
    }
}
</script>
