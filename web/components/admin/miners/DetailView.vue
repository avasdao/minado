<template>
    <main class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
                Miner Information
            </h3>

            <p class="mt-1 text-sm text-gray-500">
                Use a permanent pid where you can receive mail.
            </p>
        </div>

        <div class="mt-5 md:col-span-2 md:mt-0">
            <h1 class="px-3 py-1 text-2xl text-yellow-800 font-medium bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                {{miner ? miner._id : 'no miner'}}
            </h1>

            <div class="mt-5 grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-4">
                    <label for="hostname" class="block text-sm font-medium text-gray-700">
                        Hostname
                    </label>

                    <input
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="hostname"
                    />
                </div>

                <div class="col-span-6 sm:col-span-2">
                    <label for="serverid" class="block text-sm font-medium text-gray-700">
                        Server Id
                    </label>

                    <input
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="serverid"
                    />
                </div>

                <div class="col-span-6 sm:col-span-2">
                    <label for="hostname" class="block text-sm font-medium text-gray-700">
                        PID
                    </label>

                    <input
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="pid"
                    />
                </div>

                <div class="col-span-6 sm:col-span-4">
                    <label for="hostname" class="block text-sm font-medium text-gray-700">
                        Location
                    </label>

                    <input
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="location"
                    />
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium text-gray-700">
                        Authorization
                    </label>

                    <input
                        type="text"
                        autocomplete="given-name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="auth"
                    />
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium text-gray-700">
                        Count
                    </label>

                    <input
                        type="text"
                        autocomplete="family-name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="count"
                    />
                </div>

                <section class="p-3 col-span-6 grid grid-cols-2 gap-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl border-4 border-yellow-600">
                    <div class="col-span-2">
                        <label for="hostname" class="block text-sm font-medium text-gray-700">
                            Active Profile Id
                        </label>

                        <input
                            type="text"
                            class="px-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            v-model="profileid"
                        />
                    </div>

                    <div class="">
                        <label for="first-name" class="px-3 py-1 block text-sm font-medium text-gray-700">
                            First Name
                        </label>

                        <input
                            type="text"
                            autocomplete="given-name"
                            class="px-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            :value="profile && profile.firstName"
                            disabled
                        />
                    </div>

                    <div class="">
                        <label for="last-name" class="px-3 py-1 block text-sm font-medium text-gray-700">
                            Last Name
                        </label>

                        <input
                            type="text"
                            autocomplete="family-name"
                            class="px-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            :value="profile && profile.lastName"
                            disabled
                        />
                    </div>

                    <div class="">
                        <label for="last-name" class="px-3 py-1 block text-sm font-medium text-gray-700">
                            Nickname
                        </label>

                        <input
                            type="text"
                            autocomplete="family-name"
                            class="px-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            :value="profile && profile.nickname"
                            disabled
                        />
                    </div>

                    <div class="">
                        <label for="last-name" class="px-3 py-1 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="text"
                            autocomplete="family-name"
                            class="px-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            :value="profile && profile.email"
                            disabled
                        />
                    </div>

                    <div class="col-span-2">
                        <label for="last-name" class="px-3 py-1 block text-sm font-medium text-gray-700">
                            Address
                        </label>

                        <input
                            type="text"
                            autocomplete="family-name"
                            class="px-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            :value="profile && profile.address"
                            disabled
                        />

                        <a v-if="profile && profile.address" :href="'https://explorer.nexa.org/address/' + profile.address" target="_blank" class="pl-3 text-sm text-blue-500 font-medium hover:underline">
                            open in explorer
                        </a>
                    </div>

                </section>

                <div class="mt-1 col-span-6">
                    <h2 class="pl-2 text-xs text-gray-500 font-medium uppercase">
                        Connecting
                    </h2>

                    <textarea
                        rows="1"
                        class="p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        :value="cmdConn"
                    ></textarea>
                </div>

                <div class="mt-1 col-span-6">
                    <h2 class="pl-2 text-xs text-gray-500 font-medium uppercase">
                        Launch miners
                    </h2>

                    <textarea
                        rows="6"
                        class="p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        :value="cmdLaunchMiners"
                    ></textarea>
                </div>

                <section class="col-span-6">
                    <div>
                        Created At: {{fullDate(createdAt)}}
                    </div>

                    <div>
                        Updated At: {{fullDate(updatedAt)}}
                    </div>

                    <hr class="my-5" />

                    <div>
                        Expires At: {{fullDate(expiresAt)}}
                    </div>

                    <label for="expminer.createdAtiration" class="block text-sm font-medium text-gray-700">
                        Set New Expiration
                    </label>

                    <select
                        class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        v-model="expiration"
                        @change="updateExpiration"
                    >
                        <option value="-1">DISABLED</option>
                        <option value="">- no change -</option>
                        <option value="1">1 day</option>
                        <option value="7">1 week</option>
                        <option value="14">2 weeks</option>
                        <option value="21">3 weeks</option>
                        <option value="30">1 month</option>
                    </select>
                </section>

            </div>
        </div>

        <footer class="col-span-3 flex justify-end">
            <button
                @click="updateMiner"
                class="px-3 py-1 text-xl font-medium bg-yellow-200 border-2 border-yellow-400 rounded-lg hover:text-yellow-800 bg-yellow-300"
            >
                Update Miner
            </button>

        </footer>

    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'

/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    props: {
        miner: Object
    },
    data: () => ({
        auth: null,
        count: null,
        expiration: null,
        hostname: null,
        location: null,
        profile: null,
        profileid: null,
        serverid: null,
        pid: null,
        createdAt: null,
        updatedAt: null,
        expiresAt: null
    }),
    watch: {
        miner: function (_miner) {
            console.log('MINER CHANGED', _miner)

            /* Validate miner. */
            if (_miner) {
                this.hostname = _miner.hostname
                this.auth = _miner.auth
                this.count = _miner.count
                this.location = _miner.location
                this.profileid = _miner.profileid
                this.serverid = _miner.serverid
                this.pid = _miner.pid
                this.createdAt = _miner.createdAt
                this.updatedAt = _miner.updatedAt
                this.expiresAt = _miner.expiresAt

                /* Load profile. */
                this.loadProfile()
            }
        }
    },
    computed: {
        cmdConn () {
            return `./connect.sh ${this.location} ${this.auth}`
        },

        cmdLaunchMiners () {
            const cpus = this.count || 0
            const address = this.profile ? this.profile.address : ''
            const nickname = this.profile ? this.profile.nickname : ''

            if (cpus > 0) {
                return `/root/nexa-miner -datadir=/root/.nexa-rocks -cpus=${cpus} -address="${address}" -pool="stratum.nexa.rocks:443:${nickname}" &
sleep 1
disown %1
exit`
            } else {
                return 'Please select a miner count'
            }
        }
    },
    methods: {
        async updateMiner () {
            /* Request issuer. */
            const didToken = this.$store.state.profile.didToken

            const hostname = this.hostname
            const auth = this.auth
            const count = this.count
            const location = this.location
            const profileid = this.profileid
            const serverid = this.serverid
            const pid = this.pid
            const createdAt = this.createdAt
            const expiresAt = this.expiresAt

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
                        hostname,
                        auth,
                        count,
                        location,
                        profileid,
                        serverid,
                        pid,
                        createdAt,
                        expiresAt
                    }
                })
            })

            const content = await rawResponse.json()
            console.log('CONTENT', content)

            this.$emit('loadMiner')

            // alert('re-loaded miner')
        },

        fullDate (_timestamp) {
            if (!_timestamp) {
                return 'loading...'
            }

            return moment.unix(_timestamp).format('llll') + ' | ' + moment.unix(_timestamp).fromNow()
        },

        async loadProfile () {
            if (!this.profileid) {
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
                    profileid: this.profileid
                })
            })

            const content = await rawResponse.json()
            console.log('CONTENT (get_profile):', content) // eslint-disable-line no-console

            this.profile = content

            return content
        },

        updateExpiration () {
            if (!this.expiration || this.expiration === '') {
                this.expiresAt = null

                return
            }

            if (this.expiration === '-1') {
                this.expiresAt = -1

                return
            }

            this.expiresAt = moment().add(this.expiration, 'days').unix()
        }
    },
    created: function () {
        /* Validate miner. */
        if (this.miner) {
            this.hostname = this.miner.hostname
            this.auth = this.miner.auth
            this.count = this.miner.count
            this.location = this.miner.location
            this.profileid = this.miner.profileid
            this.serverid = this.miner.serverid
            this.pid = this.miner.pid
            this.createdAt = this.miner.createdAt
            this.updatedAt = this.miner.updatedAt
            this.expiresAt = this.miner.expiresAt

            this.expiration = ''

            /* Load profile. */
            this.loadProfile()
        }
    },
    mounted: function () {
        //
    }
}
</script>
