<template>
    <main class="p-5 flex flex-col space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
        <div class="flex flex-row justify-between">
            <div>
                <h1 class="text-4xl font-bold text-yellow-900">
                    Monitoring Station
                </h1>

                <h2 class="text-2xl text-yellow-700 font-bold italic">
                    {{address && address.slice(5)}}
                </h2>
            </div>

            <img
                :src="require('@/assets/lottie/58692-mining.gif')"
                class="p-1 h-20 border-2 border-yellow-600 rounded-xl"
            />
        </div>

        <p class="text-yellow-900">
            Here is a comprehensive breakdown of your address activity on the Nexa network.
            You can drill down to the various charts for more details.
        </p>

        <div class="flex justify-end">
            <h2
                class="p-3 bg-indigo-100 border-2 border-indigo-200 rounded-2xl"
                v-html="displayBalance"
            ></h2>
        </div>

        <nav>
            <div class="sm:hidden">
                <label for="tabs" class="sr-only">Select a tab</label>
                <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                    <option>My Account</option>

                    <option>Company</option>

                    <option selected>Team Members</option>

                    <option>Billing</option>
                </select>
            </div>

            <div class="hidden sm:block">
                <div class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
                        <a href="javascript://" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-base">
                            <!--
                    Heroicon name: mini/user

                    Current: "text-indigo-500", Default: "text-gray-400 group-hover:text-gray-500"
                -->
                            <svg class="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>

                            <span>Transactions</span>
                        </a>

                        <a href="javascript://" class="border-indigo-500 text-indigo-600 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-base" aria-current="page">
                            <svg class="text-indigo-500 -ml-0.5 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>

                            <span>Finance Center</span>
                        </a>

                        <a href="javascript://" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-base">
                            <svg class="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>

                            <span>Mining Shares</span>
                        </a>

                        <a href="javascript://" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-base">
                            <svg class="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>

                            <span>Notifications</span>
                        </a>
                    </nav>
                </div>
            </div>
        </nav>

        <section class="space-y-5">
            <div
                v-for="(tx, index) of displayTxHistory"
                :key="tx.txid"
                class="p-3 bg-gray-800 border-4 border-indigo-300 rounded-lg"
            >
                <div class="px-3">
                    <h1 class="block text-lg text-gray-300">
                        #{{(index + 1)}} {{tx.height}}
                    </h1>

                    <h3 class="block text-xs text-gray-100">
                        {{tx.txid}}
                    </h3>
                </div>

                <hr class="my-3 bg-yellow-300" />

                <h2 class="px-3 text-2xl font-medium text-gray-200">
                    Tx Details
                </h2>

                <div class="mt-3 space-y-3">
                    <div class="px-3 py-1 block bg-indigo-100 border-2 border-indigo-300 rounded-lg">
                        <h3 class="text-gray-500 text-xs font-medium uppercase">
                            Block Hash
                        </h3>

                        <span class="text-xs">
                            {{tx.blockhash}}
                        </span>
                    </div>

                    <div class="px-3 py-1 block bg-indigo-100 border-2 border-indigo-300 rounded-lg">
                        <h3 class="text-gray-500 text-xs font-medium uppercase">
                            Block Time
                        </h3>

                        {{timeAgo(tx.blocktime)}}
                    </div>

                    <div class="px-3 py-1 block bg-indigo-100 border-2 border-indigo-300 rounded-lg">
                        <h3 class="text-gray-500 text-xs font-medium uppercase">
                            Confirmations
                        </h3>

                        {{tx.confirmations}}
                    </div>

                    <div class="px-3 py-1 block bg-indigo-100 border-2 border-indigo-300 rounded-lg">
                        <h3 class="text-gray-500 text-xs font-medium uppercase">
                            Value (satoshis)
                        </h3>

                        {{tx.vout[0].value_satoshi}}
                    </div>

                    <div class="px-3 py-3 block bg-indigo-800 border-2 border-indigo-300 rounded-lg space-y-2">
                        <h3 class="text-gray-100 text-xs font-medium uppercase">
                            Coinbase
                        </h3>

                        <h3 class="px-2 py-1 text-xs text-gray-200 font-medium bg-indigo-400 border-2 border-yellow-400 rounded">
                            {{tx.vout[0].scriptPubKey.hex}}
                        </h3>

                        <h3 class="px-2 py-1 text-xs text-gray-200 font-medium bg-indigo-400 border-2 border-yellow-400 rounded">
                            {{tx.vout[1].scriptPubKey.hex}}
                        </h3>
                    </div>

                    <pre class="hidden block text-xs">{{JSON.stringify(tx, null, 2)}}</pre>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'
// import numeral from 'numeral'
// import { v4 as uuidv4 } from 'uuid'

export default {
    data: () => ({
        pageTitle: null,
        balance: null,
        txHistory: null,
        txDetails: null,
        parsedHistory: null
    }),
    watch: {
        address: function (_address) {
            console.log('ADDRESS HAS CHANGED (from AddressView):', _address)
        }
    },
    computed: {
        ...mapGetters({
            address: 'rostrum/getAddress'
        }),

        displayBalance () {
            if (!this.balance || !this.balance.confirmed) {
                return '<span class="text-3xl font-medium">0.00 NEX</span>'
            }

            // return numeral(this.balance.confirmed / 100.0).format('0,0.00') + ' NEX'

            let value

            value = (this.balance.confirmed / 100.0).toFixed(2)
            const decimals = value.slice(-3)

            value = value.slice(0, -3)
            const base = value.slice(-3).slice(0, 3)

            value = value.slice(0, -3)
            const kilo = value.slice(-3).slice(0, 3)

            value = value.slice(0, -3)
            const mega = value.slice(-3).slice(0, 3)

            return `<span class="text-3xl font-medium">
                <span class="text-5xl text-indigo-500">${mega}</span>
                <span class="text-yellow-600">,</span>
                <span>${kilo}</span>
                <span class="text-yellow-600">,</span>
                <span>${base}</span>
                <span class="text-2xl text-gray-400">${decimals}</span>
                <span class="text-yellow-600"> NEX</span>
            </span>`
        },

        displayTxHistory () {
            if (!this.txHistory) {
                return []
            }

            const history = [...this.txHistory]

            const sorted = history.sort((a, b) => {
                return b.height - a.height
            })

            const sliced = sorted.slice(0, 20)

            return sliced
        }
    },
    methods: {
        async init () {
            let request

            this.txDetails = {}
            this.parsedHistory = []

            this.metadata = await this.$utils.validateAddress(this.address)
            console.log('ADDRESS METADATA', this.metadata)

            const scriptPubkey = this.metadata.hex
            console.log('scriptPubkey', scriptPubkey)

            // const scriptPubkey = '00511417b25c22cc7ce6bf5a8b1ee945638c5f143a3c06' // Rpi (nexa:nqtsq5g5z7e9cgkv0nnt7k5trm552cuvtu2r50qxzeknvu3u)
            // console.log('scriptPubkey', scriptPubkey)

            const scriptHash = this.$utils.getScriptHash(scriptPubkey)
            console.log('SCRIPT HASH', scriptHash)

            request = {
                method: 'blockchain.scripthash.get_balance',
                params: [scriptHash]
            }
            const balance = await this.$store.dispatch('rostrum/makeRequest', request)
            console.log('REQUESTED BALANCE', balance)

            this.balance = balance

            request = {
                method: 'blockchain.scripthash.get_history',
                params: [scriptHash]
            }
            const history = await this.$store.dispatch('rostrum/makeRequest', request)
            console.log('REQUESTED TX HISTORY', history)

            const final = []

            history.forEach(async (_tx) => {
                const txid = _tx.tx_hash
                const details = await this.getTxDetails(txid)
                final.push({
                    txid,
                    ..._tx,
                    ...details
                })
            })

            this.txHistory = final
        },

        async getTxDetails (_txHash) {
            const request = {
                method: 'blockchain.transaction.get',
                params: [_txHash, true]
            }
            const txDetails = await this.$store.dispatch('rostrum/makeRequest', request)
            // console.log('TX DETAILS', this.txDetails)

            return txDetails
        },

        timeAgo (_timestamp) {
            return `${moment.unix(_timestamp).fromNow()} -- ${moment.unix(_timestamp).format('lll')}`
        }
    },
    created: function () {
        if (process.browser) {
            this.init()
        }
    },
    mounted: function () {
        //
    }
}
</script>
