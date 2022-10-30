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

                <div class="col-span-6 sm:col-span-4">
                    <label for="profileid-pid" class="block text-sm font-medium text-gray-700">
                        Email pid
                    </label>

                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <!-- Heroicon name: mini/envelope -->
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                            </svg>
                        </div>

                        <input
                            type="profileid"
                            autocomplete="profileid"
                            class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="anon@bitcoin.org"
                            v-model="profileid"
                        >
                    </div>
                </div>

                <div class="col-span-6">
                    <label for="nexa-pid" class="block text-sm font-medium text-gray-700">
                        Nexa pid
                    </label>

                    <input
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        v-model="pid"
                    />

                    <a v-if="pid" :href="'https://explorer.nexa.org/pid/' + pid" target="_blank" class="pl-3 text-sm text-blue-500 font-medium hover:underline">
                        open in explorer
                    </a>
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                    <select
                        id="country"
                        name="country"
                        autocomplete="country-name"
                        class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                    </select>
                </div>

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
/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    props: {
        miner: Object
    },
    data: () => ({
        auth: null,
        count: null,
        hostname: null,
        location: null,
        profileid: null,
        pid: null
    }),
    watch: {
        miner: function (_miner) {
            console.log('MINER CHANGED', _miner)

            /* Validate miner. */
            if (_miner) {
                this.hostname = _miner.hostname
                this.auth = _miner.auth
                this.location = _miner.location
                this.profileid = _miner.profileid
                this.pid = _miner.pid
            }
        }
    },
    computed: {
        //
    },
    methods: {
        async updateMiner () {
            /* Request issuer. */
            const didToken = this.$store.state.didToken

            const hostname = this.hostname
            const auth = this.auth
            const location = this.location
            const profileid = this.profileid
            const pid = this.pid

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
                        location,
                        profileid,
                        pid
                    }
                })
            })

            const content = await rawResponse.json()
            console.log('CONTENT', content)

            alert('update local')
        }
    },
    created: function () {
        /* Validate miner. */
        if (this.miner) {
            this.hostname = this.miner.hostname
            this.auth = this.miner.auth
            this.location = this.miner.location
            this.count = this.miner.count
            this.profileid = this.miner.profileid
            this.pid = this.miner.pid
        }
    },
    mounted: function () {
        //
    }
}
</script>
