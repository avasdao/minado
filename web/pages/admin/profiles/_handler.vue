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

                        <AdminProfileView
                            :profile="profile"
                        />

                        <AdminMinersPanelView
                            class="mt-3"
                            :miners="miners"
                            :profile="profile"
                            @addMiner="addMiner"
                        />
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            class="mx-3 px-3 py-1 text-2xl text-yellow-100 font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                            @click="addProfile"
                        >
                            Add New Profile
                        </button>

                        <AdminProfilesList :profiles="profiles" />

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
        'admin.auth',
        'magic.auth'
    ],
    data: () => ({
        profileid: null,
        miners: null
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
    watch: {
        profileid: async function (_profileid) {
            console.log('PROFILE ID HAS CHANGED', _profileid)

            this.miners = await this.$store.dispatch('admin/loadMiners', _profileid)
        }
    },
    computed: {
        ...mapGetters({
            // miners: 'admin/getMiners',
            profiles: 'admin/getProfiles'
        }),

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
    created: async function () {
        /* Validate handler. */
        if (this.$route.params && this.$route.params.handler) {
            // TODO: Handle different stubs.

            /* Set profile id. */
            this.profileid = this.$route.params.handler

            this.miners = await this.$store.dispatch('admin/loadMiners', this.profileid)
            // console.log('PROFILE (miners):', this.miners)
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
