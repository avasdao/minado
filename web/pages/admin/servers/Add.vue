<template>
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Blank
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            Add a New Server
                        </h1>

                        <section class="space-y-8 divide-y divide-gray-200">
                            <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">

                                <div class="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                                    <div>
                                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                                            Location Information
                                        </h3>

                                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                            Use a permanent address where you can receive mail.
                                        </p>
                                    </div>

                                    <div class="space-y-6 sm:space-y-5">
                                        <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label for="location" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Location
                                            </label>

                                            <div class="mt-1 sm:col-span-2 sm:mt-0">
                                                <input
                                                    type="text"
                                                    class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                                    v-model="location"
                                                />
                                            </div>
                                        </div>

                                        <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label for="site" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Site ID
                                            </label>

                                            <div class="mt-1 sm:col-span-2 sm:mt-0">
                                                <select
                                                    class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                                    v-model="siteid"
                                                >
                                                    <option value="">- Unassiagned -</option>
                                                    <option value="3cd5d763-b9f2-4bc4-af31-6c3ee786c572">The Vaalserberg (Netherlands)</option>
                                                    <option value="6cbbbd78-4d9e-4791-aca0-8906b7d6f173">Transfagarasan (Romania)</option>
                                                    <option value="386031c9-6128-4531-9fa9-cf53cdb500a0">Kékestető (Hungary)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label for="location" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Hostname
                                            </label>

                                            <div class="mt-1 sm:col-span-2 sm:mt-0">
                                                <input
                                                    type="text"
                                                    class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                                    v-model="hostname"
                                                />
                                            </div>
                                        </div>

                                        <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label for="location" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Authorization
                                            </label>

                                            <div class="mt-1 sm:col-span-2 sm:mt-0">
                                                <input
                                                    type="text"
                                                    class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                                    v-model="auth"
                                                />
                                            </div>
                                        </div>

                                        <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label for="site" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                # of Cores
                                            </label>

                                            <div class="mt-1 sm:col-span-2 sm:mt-0">
                                                {{cores}}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                                    <div>
                                        <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                                        <p class="mt-1 max-w-2xl text-sm text-gray-500">We'll always let you know about important changes, but you pick what else you want to hear about.</p>
                                    </div>
                                    <div class="space-y-6 divide-y divide-gray-200 sm:space-y-5">
                                        <div class="pt-6 sm:pt-5">
                                            <div role="group" aria-labelledby="label-email">
                                                <div class="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                                                    <div>
                                                        <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">By Email</div>
                                                    </div>
                                                    <div class="mt-4 sm:col-span-2 sm:mt-0">
                                                        <div class="max-w-lg space-y-4">
                                                            <div class="relative flex items-start">
                                                                <div class="flex h-5 items-center">
                                                                    <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                                </div>
                                                                <div class="ml-3 text-sm">
                                                                    <label for="comments" class="font-medium text-gray-700">Comments</label>
                                                                    <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                                                </div>
                                                            </div>
                                                            <div class="relative flex items-start">
                                                                <div class="flex h-5 items-center">
                                                                    <input id="candidates" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                                </div>
                                                                <div class="ml-3 text-sm">
                                                                    <label for="candidates" class="font-medium text-gray-700">Candidates</label>
                                                                    <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                                                                </div>
                                                            </div>
                                                            <div class="relative flex items-start">
                                                                <div class="flex h-5 items-center">
                                                                    <input id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                                </div>
                                                                <div class="ml-3 text-sm">
                                                                    <label for="offers" class="font-medium text-gray-700">Offers</label>
                                                                    <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="pt-6 sm:pt-5">
                                            <div role="group" aria-labelledby="label-notifications">
                                                <div class="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                                                    <div>
                                                        <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-notifications">Push Notifications</div>
                                                    </div>
                                                    <div class="sm:col-span-2">
                                                        <div class="max-w-lg">
                                                            <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                                                            <div class="mt-4 space-y-4">
                                                                <div class="flex items-center">
                                                                    <input id="push-everything" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                                    <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700">Everything</label>
                                                                </div>
                                                                <div class="flex items-center">
                                                                    <input id="push-email" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                                    <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700">Same as email</label>
                                                                </div>
                                                                <div class="flex items-center">
                                                                    <input id="push-nothing" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                                    <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">No push notifications</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-5">
                                <div class="flex justify-end">
                                    <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        Cancel
                                    </button>

                                    <button
                                        class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        @click="addServer"
                                    >
                                        Add Server
                                    </button>
                                </div>
                            </div>
                        </section>

                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <PayoutsBlock />

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
        'magic.auth'
    ],
    data: () => ({
        auth: null,
        hostname: null,
        location: null,
        siteid: null
    }),
    head: () => ({
        title: 'Add New Server — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    computed: {
        // ...mapGetters({
        //     // panelIsShowing: 'system/getPanelState'
        // }),

        cores () {
            switch (this.siteid) {
            case '3cd5d763-b9f2-4bc4-af31-6c3ee786c572':
                return 4 // The Vaalserberg
            case '6cbbbd78-4d9e-4791-aca0-8906b7d6f173':
                return 4 // Transfagarasan
            case '386031c9-6128-4531-9fa9-cf53cdb500a0':
                return 8 // Kékestető
            default:
                return 0
            }
        }
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
    methods: {
        async addServer () {
            const pkg = {
                siteid: this.siteid,
                location: this.location,
                hostname: this.hostname,
                auth: this.auth,
                cores: Number(this.cores)
            }

            /* Request new miner. */
            const response = await this.$store.dispatch('admin/addServer', pkg)
            console.log('ADD SERVER RESPONSE', pkg, response)

            this.$router.push('/admin/servers')
        }
    }
}
</script>
