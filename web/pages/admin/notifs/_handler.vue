<template>
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Notifications
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="px-3 py-2 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            Notifications
                        </h1>

                        <AdminProfilesDetailView
                            :profile="profile"
                        />
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            class="mx-3 px-3 py-1 text-2xl text-yellow-100 font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                            @click="addProfile"
                        >
                            Add New Notification
                        </button>

                        <AdminProfilesListView
                            :profiles="profiles"
                        />
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
        profileid: null
    }),
    head: () => ({
        title: 'Notifications — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    watch: {
        profileid: function (_profileid) {
            console.log('PROFILE ID HAS CHANGED', _profileid)

            this.$store.dispatch('admin/loadMiners', _profileid)
        }
    },
    computed: {
        // ...mapGetters({
        //     miners: 'admin/getMiners',
        //     profiles: 'admin/getProfiles'
        // }),

        profile () {
            /* Validate profiles. */
            if (!this.profiles) {
                return {}
            }

            /* Find the active profile. */
            const profile = this.profiles.find((_profile) => {
                return _profile._id === this.profileid
            })

            /* Return active profile. */
            return profile
        }
    },
    created: function () {
        /* Validate handler. */
        if (this.$route.params && this.$route.params.handler) {
            // TODO: Handle different stubs.

            /* Set profile id. */
            this.profileid = this.$route.params.handler
        }
    },
    mounted: function () {
        //
    },
    methods: {
        addMiner () {
            console.log('add a miner') // eslint-disable-line no-console
        },

        addProfile () {
            console.log('add a profile') // eslint-disable-line no-console
        }
    }
}
</script>
