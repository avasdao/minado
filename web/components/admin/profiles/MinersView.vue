<template>
    <main aria-labelledby="recent-hires-title">
        <div class="rounded-lg bg-white overflow-hidden shadow">
            <div class="p-6">
                <header class="flex justify-between">
                    <h2 class="text-2xl font-medium text-gray-900" id="recent-hires-title">
                        Miners <span class="text-lg text-gray-500">( {{totalActiveMiners}} active miners )</span>
                    </h2>

                    <button @click="addMiner" class="mx-3 px-3 py-1 text-xl text-blue-100 font-medium bg-blue-500 border-2 border-blue-700 rounded-lg hover:text-blue-50 hover:bg-blue-400">
                        Add New Miner
                    </button>
                </header>

                <div class="flow-root mt-6">
                    <div class="my-3 p-3 bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                        <h2 class="text-xl font-medium">
                            {{ minerid }}
                        </h2>

                        <h3 class="my-3" v-if="lastMinerUpdate">
                            last updated: {{ lastMinerUpdate }}
                        </h3>

                        <div class="grid grid-cols-5 gap-4">
                            <div v-if="minerid" class="col-span-3">
                                <div class="relative mt-1 rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        class="block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                        placeholder="domain.ext"
                                        v-model="hostname"
                                        aria-invalid="true"
                                        aria-describedby="email-error"
                                    >

                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <!-- Heroicon name: mini/exclamation-circle -->
                                        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                <p class="mt-2 text-sm text-red-600" id="email-error">
                                    Your hostname must be valid.
                                </p>

                                <label for="email" class="block text-sm font-medium text-gray-700">
                                    Server ID (IP Address)
                                </label>

                                <div class="mt-1">
                                    <input
                                        type="text"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="127.0.0.1"
                                        aria-describedby="email-description"
                                        v-model="serverid"
                                    >
                                </div>

                                <p class="mt-2 text-sm text-gray-500" id="email-description">
                                    We'll only use this for spam.
                                </p>

                                <label for="email" class="block text-sm font-medium text-gray-700">
                                    Authorization / Password
                                </label>

                                <div class="mt-1">
                                    <input
                                        type="password"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="auth/login password"
                                        aria-describedby="email-description"
                                        :value="server && server.auth"
                                    >
                                </div>

                                <p class="mt-2 text-sm text-gray-500" id="email-description">
                                    We'll only use this for spam.
                                </p>

                                <label for="email" class="block text-sm font-medium text-gray-700">
                                    PID
                                </label>

                                <div class="mt-1">
                                    <input
                                        type="text"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="123456"
                                        aria-describedby="email-description"
                                        v-model="pid"
                                    >
                                </div>

                                <p class="mt-2 text-sm text-gray-500" id="email-description">
                                    We'll only use this for spam.
                                </p>

                                <label for="serverid" class="block text-sm font-medium text-gray-700">
                                    Miner Count
                                </label>

                                <select v-model="count" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    <option value="-1">
                                        Disabled
                                    </option>
                                    <option value="0">
                                        Offline
                                    </option>
                                    <option value="1">
                                        1
                                    </option>
                                    <option value="2">
                                        2
                                    </option>
                                    <option value="4">
                                        4
                                    </option>
                                    <option value="8">
                                        8
                                    </option>
                                </select>

                                <div class="flex justify-end">
                                    <button @click="updateMiner" class="px-3 py-1 bg-yellow-500 border-2 border-yellow-700 rounded-lg">
                                        Update miner
                                    </button>
                                </div>

                                <div class="mt-1">
                                    <h2 class="pl-2 text-xs text-gray-500 font-medium uppercase">
                                        Provisioning
                                    </h2>

                                    <textarea
                                        rows="1"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        :value="cmdProv"
                                    ></textarea>
                                </div>

                                <div class="mt-1">
                                    <h2 class="pl-2 text-xs text-gray-500 font-medium uppercase">
                                        Connecting
                                    </h2>

                                    <textarea
                                        rows="1"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        :value="cmdConn"
                                    ></textarea>
                                </div>

                                <div class="mt-1">
                                    <h2 class="pl-2 text-xs text-gray-500 font-medium uppercase">
                                        Start miners
                                    </h2>

                                    <textarea
                                        rows="6"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        :value="cmdLaunchMiners"
                                    ></textarea>
                                </div>
                            </div>

                            <div :class="[ minerid ? 'col-span-2' : 'col-span-5']">
                                <ul role="list" class="-my-5 divide-y divide-yellow-500">
                                    <li
                                        v-for="miner of recentMiners"
                                        :key="miner._id"
                                        class="py-4 cursor-pointer"
                                        @click="toggleEdit(miner._id)"
                                    >
                                        <div class="flex items-center space-x-4">
                                            <div class="flex-shrink-0">
                                                <img
                                                    class="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </div>

                                            <div class="flex-1 min-w-0">
                                                <p class="text-base font-medium text-gray-900 truncate">
                                                    {{ (miner && miner.hostname) ? miner.hostname : (profile && profile.nickname) ? profile.nickname : "Unknown" }}
                                                </p>

                                                <p class="text-xs text-yellow-800 truncate italic">
                                                    {{ miner.serverid }}
                                                </p>

                                                <p class="text-xs text-yellow-800 truncate">
                                                    PID: {{ miner.pid }} | Miners: {{ miner.count }}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="mt-6">
                    <a href="javascript://" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        View all miners
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'

/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    props: {
        miners: Array,
        profile: Object
    },
    data: () => ({
        payouts: null,
        minerid: null,
        hostname: null,
        serverid: null,
        server: null,
        pid: null,
        count: null,
        updatedAt: null
    }),
    watch: {
        minerid: function (_minerid) {
            this.loadMiner(_minerid)
        }
    },
    computed: {
        profileid () {
            return this.profile._id
        },

        cmdProv () {
            return `./provision.sh ${this.serverid} ${this.server && this.server.auth}`
        },

        cmdConn () {
            return `./connect.sh ${this.serverid} ${this.server && this.server.auth}`
        },

        cmdLaunchMiners () {
            const cpus = this.count
            const address = this.profile.address
            const nickname = this.profile.nickname

            if (cpus > 0) {
                return `/root/nexa-miner -datadir=/root/.nexa-rocks -cpus=${cpus} -address="${address}" -pool="stratum.nexa.rocks:443:${nickname}" &
sleep 1
disown %1
exit`
            } else {
                return 'Please select a miner count'
            }
        },

        lastMinerUpdate () {
            if (!this.updatedAt) {
                return null
            }

            return moment.unix(this.updatedAt).fromNow()
        },

        /**
         * Recent Miners
         *
         * Retrieves the 10 most recent miners.
         */
        recentMiners () {
            if (!this.miners) {
                return []
            }

            // const miners = JSON.parse(JSON.stringify(this.miners))
            const miners = [...this.miners]

            /* Sort by most recent. */
            const recent = miners.sort(function (a, b) {
                return b.updatedAt - a.updatedAt
            })

            /* Return most recent 10. */
            // return recent.slice(0, 10)
            return recent.slice(0, 20)
        },

        totalActiveMiners () {
            if (!this.miners) {
                return 0
            }

            let total = 0

            this.miners.forEach((_miner) => {
                total += Number(_miner.count)
            })

            return total
        }
    },
    methods: {
        toggleEdit (_minerid) {
            // this.showEdit = true

            this.minerid = _minerid

            // alert(`edit ${_minerid}`)
        },

        async addMiner () {
            /* Request new miner. */
            await this.$store.dispatch('admin/addMiner', this.profileid)

            /* Re-load miners. */
            await this.$store.dispatch('admin/loadMiners', this.profileid)

            /* Re-load miner data. */
            // this.loadMiner(this.miner._id)
        },

        async updateMiner () {
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
                    action: 'update_miner',
                    miner: {
                        ...this.miner,
                        hostname: this.hostname,
                        serverid: this.serverid,
                        pid: Number(this.pid),
                        count: Number(this.count)
                    }
                })
            })

            const content = await rawResponse.json()
            console.log('CONTENT', content)

            /* Re-load miners. */
            await this.$store.dispatch('admin/loadMiners', this.profileid)

            /* Re-load miner data. */
            this.loadMiner(this.miner._id)
        },

        loadMiner (_minerid) {
            const miner = this.miners.find((_miner) => {
                return _miner._id === _minerid
            })
            // console.log('UPDATE (miner):', miner)

            /* Validate miner. */
            if (miner) {
                this.miner = miner
                this.hostname = miner.hostname
                this.serverid = miner.serverid
                this.pid = miner.pid
                this.count = miner.count
                this.updatedAt = miner.updatedAt

                /* Load server details. */
                this.loadServer()
            }
        },

        async loadServer () {
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
                    action: 'get_server',
                    serverid: this.serverid
                })
            })

            const content = await rawResponse.json()
            console.log('CONTENT (get_server):', content) // eslint-disable-line no-console

            this.server = content
        }
    },
    created: function () {
        this.showEdit = false
    },
    mounted: function () {
        //
    }
}
</script>
