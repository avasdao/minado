<template>
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Server Manager
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="col-span-2">
                        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                            <h1 class="text-4xl font-bold text-yellow-900">
                                Server Manager
                            </h1>
                        </div>

                        <div class="mt-10">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6">
                                            <a href="javascript://" class="group inline-flex">
                                                Location
                                                <!-- Active: "bg-gray-200 text-gray-900 group-hover:bg-gray-300", Not Active: "invisible text-gray-400 group-hover:visible group-focus:visible" -->
                                                <span class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                    <!-- Heroicon name: mini/chevron-down -->
                                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-base font-semibold text-gray-900">
                                            <a href="javascript://" class="group inline-flex">
                                                Hostname
                                                <!-- Active: "bg-gray-200 text-gray-900 group-hover:bg-gray-300", Not Active: "invisible text-gray-400 group-hover:visible group-focus:visible" -->
                                                <span class="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                                                    <!-- Heroicon name: mini/chevron-down -->
                                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </th>

                                        <th scope="col" class="px-3 py-3.5 text-center text-base font-semibold text-gray-900">
                                            <a href="javascript://" class="group inline-flex">
                                                Site Name
                                                <!-- Active: "bg-gray-200 text-gray-900 group-hover:bg-gray-300", Not Active: "invisible text-gray-400 group-hover:visible group-focus:visible" -->
                                                <span class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                    <!-- Heroicon name: mini/chevron-down -->
                                                    <svg
                                                        class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </th>

                                        <th scope="col" class="px-3 py-3.5 text-center text-base font-semibold text-gray-900">
                                            <a href="javascript://" class="group inline-flex">
                                                # Cores
                                                <!-- Active: "bg-gray-200 text-gray-900 group-hover:bg-gray-300", Not Active: "invisible text-gray-400 group-hover:visible group-focus:visible" -->
                                                <span class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                    <!-- Heroicon name: mini/chevron-down -->
                                                    <svg
                                                        class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </th>

                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr
                                        class="cursor-pointer hover:bg-gray-200"
                                        v-for="server of displayServers"
                                        :key="server._id"
                                        @click="loadServer(server)"
                                    >
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {{server._id}}
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {{server.hostname}}
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                            {{displaySite(server)}}
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                            {{server.cores}}
                                        </td>

                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a href="javascript://" class="text-indigo-600 hover:text-indigo-900">
                                                Edit<span class="sr-only">, Lindsay Walton</span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <pre>{{JSON.stringify(servers, null, 2)}}</pre>
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <NuxtLink to="servers/add"
                            class="mx-3 px-3 py-1 text-2xl text-yellow-100 text-center font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                        >
                            Add New Server
                        </NuxtLink>

                        <AdminServersList
                            :servers="servers"
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
        //
    }),
    head: () => ({
        title: 'Server Manager — Nexa Rocks!',
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
        //     servers: 'admin/getServers'
        // }),

        displayServers () {
            if (!this.servers) {
                return []
            }

            return this.servers.slice(0, 5)
        }
    },
    created: function () {
        this.init()
    },
    mounted: function () {
        //
    },
    methods: {
        init () {
            /* Request servers. */
            this.$store.dispatch('admin/loadServers')
        },

        addServer () {
            //
        },

        loadServer (_server) {
            this.$router.push('/admin/servers/' + _server._id)
        },

        displaySite (_server) {
            switch (_server.siteid) {
            case '3cd5d763-b9f2-4bc4-af31-6c3ee786c572':
                return 'The Vaalserberg'
            case '6cbbbd78-4d9e-4791-aca0-8906b7d6f173':
                return 'Transfagarasan'
            case '386031c9-6128-4531-9fa9-cf53cdb500a0':
                return 'Kékestető'
            default:
                return 'Unknown Site'
            }
        }
    }
}
</script>
