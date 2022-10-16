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

                        <AdminProfileView :profile="profile" />
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
import { mapGetters } from 'vuex'

export default {
    middleware: [
        'admin',
        'magic.auth'
    ],
    data: () => ({
        profileid: null
    }),
    head: () => ({
        title: 'Profile Administration — Nexa Rocks!',
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
            profiles: 'admin/getProfiles'
        }),

        profile () {
            if (!this.profiles) {
                return {}
            }

            const profile = this.profiles.find((_profile) => {
                return _profile._id === this.profileid
            })

            return profile
        }
    },
    created: function () {
        // this.init()

        /* Validate handler. */
        if (this.$route.params && this.$route.params.handler) {
            /* Retrieve profile id. */
            this.profileid = this.$route.params.handler
            console.info('ADMIN (profile id):', this.profileid) // eslint-disable-line no-console

            this.$store.dispatch('admin/loadProfile', this.profileid)
        }
    },
    mounted: function () {
        //
    },
    methods: {
        init () {
            /* Request profiles. */
            this.$store.dispatch('admin/loadProfiles')
        },

        addProfile () {
            console.log('add a profile') // eslint-disable-line no-console
        }
    }
}
</script>
