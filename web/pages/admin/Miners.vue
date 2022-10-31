<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Miners
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="col-span-2">
                        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                            <h1 class="text-4xl font-bold text-yellow-900">
                                Miners
                            </h1>
                        </div>

                        <table class="mt-10 min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr
                                    v-for="miner of displayedMiners"
                                    class="cursor-pointer"
                                    :key="miner._id"
                                    @click="loadMiner(miner)"
                                >
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div class="flex items-center">
                                            <div class="h-10 w-10 flex-shrink-0">
                                                <img
                                                    class="h-10 w-10 rounded-full"
                                                    :src="displayAvatar(miner)"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="ml-4">
                                                <div class="font-medium text-gray-900">
                                                    {{miner.location}}
                                                </div>

                                                <div class="text-gray-500">
                                                    {{displayName(miner)}}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div class="text-gray-900">Front-end Developer</div>
                                        <div class="text-gray-500">Optimization</div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td>
                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, Lindsay Walton</span></a>
                                    </td>

                                    <!-- More people... -->
                                    <pre>{{JSON.stringify(getProfile(miner.profileid), null, 2)}}</pre>
                                </tr>
                            </tbody>
                        </table>

                        <pre>{{JSON.stringify(miners, null, 2)}}</pre>
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            class="mx-3 px-3 py-1 text-2xl text-yellow-100 font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                            @click="addMiner"
                        >
                            Add New Miner
                        </button>

                        <AdminMinersList
                            :miners="miners"
                        />

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

/* Import modules. */
import gravatar from 'gravatar'

/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    middleware: [
        'admin.auth',
        'magic.auth'
    ],
    data: () => ({
        profiles: null
    }),
    head: () => ({
        title: 'Miners Manager — Nexa Rocks!',
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
        }),

        displayedMiners () {
            if (!this.miners) {
                return []
            }

            const miners = [...this.miners]

            miners.sort(function (a, b) {
                return a.expiresAt - b.expiresAt
            })

            return miners.slice(0, 3)
        }
    },
    created: function () {
        this.init()

        this.profiles = {}
    },
    mounted: function () {
        //
    },
    methods: {
        init () {
            /* Request notifications. */
            this.$store.dispatch('admin/loadMiners')
        },

        addMiner () {
            alert('TODO')
        },

        loadMiner (_miner) {
            // alert(_miner._id)
            this.$router.push('/admin/miners/' + _miner._id)
        },

        async getProfile (_profileid) {
            if (!_profileid) {
                return
            }

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
                    action: 'get_profile',
                    profileid: _profileid
                })
            })

            const content = await rawResponse.json()
            console.log('CONTENT (get_profile):', content) // eslint-disable-line no-console

            this.profiles[_profileid] = content

            return content
        },

        displayName (_miner) {
            const profile = this.profiles[_miner.profileid]

            if (profile && profile.email) {
                return profile.email
            } else if (profile && profile.nickname) {
                return profile.nickname
            } else {
                return 'Unknown profile'
            }
        },

        displayAvatar (_miner) {
            const profile = this.profiles[_miner.profileid]

            if (profile && profile.email) {
                return gravatar.url(profile.email)
            } else {
                return require('@/assets/lottie/9994-name-profile-icon-animation-circle.gif')
            }
        }
    }
}
</script>
