<template>
    <main aria-labelledby="recent-hires-title">
        <div class="rounded-lg bg-white overflow-hidden shadow">
            <div class="p-6">
                <header class="flex justify-between">
                    <h2 class="text-xl font-medium text-gray-900" id="recent-hires-title">
                        Miners
                    </h2>

                    <button @click="$emit('addMiner')" class="mx-3 px-3 py-1 text-xl text-pink-100 font-medium bg-pink-500 border-2 border-pink-700 rounded-lg hover:text-pink-50 hover:bg-pink-400">
                        Add New Miner
                    </button>
                </header>

                <div class="flow-root mt-6">
                    <div v-if="minerid" class="my-3 p-3 bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                        <h2 class="text-xl font-medium">
                            {{minerid}}
                        </h2>

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
                            Location / Ip address
                        </label>
                        <div class="mt-1">
                            <input 
                                type="text" 
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                                placeholder="127.0.0.1" 
                                aria-describedby="email-description"
                                v-model="location"
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
                                v-model="auth"
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

                        <label for="location" class="block text-sm font-medium text-gray-700">Miner Count</label>
                        <select v-model="count" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4" selected>4</option>
                            <option value="8">8</option>
                        </select>

                        <div class="flex justify-end">
                            <button @click="updateMiner" class="px-3 py-1 bg-yellow-500 border-2 border-yellow-700 rounded-lg">
                                Update miner
                            </button>
                        </div>

                        <div class="mt-1">
                            <textarea 
                                rows="4" 
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                :value="startMinerCmd"
                            ></textarea>
                        </div>                        
                    </div>

                    <ul role="list" class="-my-5 divide-y divide-gray-200">
                        
                        <li class="py-4" v-for="miner of miners" :key="miner._id">
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
                                        {{profile ? profile.nickname : "n/a"}} | {{miner.hostname}}
                                        
                                    </p>
                                    
                                    <p class="text-sm text-gray-500 truncate italic">
                                        {{miner.location}} | {{miner.pid}} | {{miner.count}}
                                    </p>
                                </div>
                                
                                <div>
                                    <button @click="toggleEdit(miner._id)" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
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
/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    props: {
        miners: Object,
        profile: Object,
    },
    data: () => ({
        payouts: null,
        minerid: null,
        hostname: null,
        location: null,
        auth: null,
        pid: null,
        count: null,
    }),
    watch: {
        minerid: function(_minerid) {
            const miner = this.miners.find(_miner => {
                return _miner._id === _minerid
            })

            this.miner = miner
            this.hostname = miner.hostname
            this.location = miner.location
            this.auth = miner.auth
            this.pid = miner.pid
            this.count = miner.count
        },
    },
    computed: {
        startMinerCmd() {
            return `/root/nexa-miner -cpus=4 -address="${this.profile.address}" -pool="stratum.nexa.rocks:443:${this.profile.nickname}" &
sleep 1
disown %1
exit`            
        }
    },
    methods: {
        toggleEdit(_minerid) {
            // this.showEdit = true

            this.minerid = _minerid

            // alert(`edit ${_minerid}`)
        },

        async updateMiner() {
            /* Request issuer. */
            const didToken = this.$store.state.didToken

            const rawResponse = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    didToken,
                    action: 'update_miner',
                    miner: {
                        ...this.miner,
                        hostname: this.hostname,
                        location: this.location,
                        auth: this.auth,
                        pid: Number(this.pid),
                        count: Number(this.count),
                    }
                })
            })
            // console.log('RAW RESPONSE', rawResponse)

            const content = await rawResponse.json()
            console.log('CONTENT', content)


        },
    },
    created: function () {
        this.showEdit = false

        console.log('PROFILES PANEL (miners):', this.miners)
        this.payouts = []

        this.payouts.push({
            id: 'temp-id-1',
            amount: '8 432 192 NEX',
            summary: `paid to 48 miners 10 mins ago`,
            icon: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            createdAt: 1234567890,
        })

        this.payouts.push({
            id: 'temp-id-2',
            amount: '2 823 932 NEX',
            summary: `paid to 18 miners 32 mins ago`,
            icon: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            createdAt: 1234567890,
        })

        this.payouts.push({
            id: 'temp-id-3',
            amount: '12 932 823 NEX',
            summary: `paid to 51 miners 2 hours ago`,
            icon: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            createdAt: 1234567890,
        })
    },
    mounted: function () {
        //
    },
}
</script>
