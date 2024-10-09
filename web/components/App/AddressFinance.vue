<template>
    <main class="p-5 flex flex-col bg-gray-700 space-y-4 rounded-lg shadow">
        <p class="text-gray-100">
            Here is a comprehensive breakdown of your address activity on the Nexa network.
            You can drill down to the various charts for more details.
        </p>

        <div class="flex justify-end">
            <h2
                class="p-3 bg-indigo-100 border-2 border-indigo-200 rounded-2xl"
                v-html="displayBalance"
            ></h2>
        </div>

        <p class="text-gray-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure suscipit eaque et optio nulla illo id, veniam eos ipsam provident assumenda odio iste incidunt sapiente eius minima inventore nobis. Magnam.
        </p>

        <img
            src="~/assets/lottie/78285-original-httpslottiefilescom24811-saving-money.gif"
            class="rounded-xl border-4 border-yellow-500"
        />
    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'

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
        if (process.client) {
            this.init()
        }
    },
    mounted: function () {
        //
    }
}
</script>
