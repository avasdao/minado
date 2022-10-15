<template>
    <main class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
        <h1 class="text-4xl font-bold text-yellow-900">
            Address Dashboard
        </h1>

        <p class="text-yellow-900">
            Here is a comprehensive breakdown of your address activity on the Nexa network.
            You can drill down to the various charts for more details.
        </p>

        <h2 class="italic">
            {{address}}
        </h2>

        <h2 class="p-3 text-3xl font-medium text-indigo-600 bg-indigo-200 border-4 border-indigo-400 rounded-2xl">
            {{displayBalance}}
        </h2>

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
import numeral from 'numeral'
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
                return '0.00 NEX'
            }

            return numeral(this.balance.confirmed / 100.0).format('0,0.00') + ' NEX'
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

            const scriptPubkey = '00511417b25c22cc7ce6bf5a8b1ee945638c5f143a3c06' // Rpi (nexa:nqtsq5g5z7e9cgkv0nnt7k5trm552cuvtu2r50qxzeknvu3u)
            console.log('scriptPubkey', scriptPubkey)

            const scriptHash = await this.$store.dispatch('utils/getScriptHash', scriptPubkey)
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
        this.init()
    },
    mounted: function () {
        //
    }
}
</script>
