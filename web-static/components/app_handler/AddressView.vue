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

        <h2 class="text-xl font-medium text-indigo-600">
            {{displayBalance}}
        </h2>

        <section class="space-y-5">
            <div
                v-for="(tx, index) of sortedTxHistory"
                :key="tx.tx_hash"
                class="px-3 py-1 bg-yellow-200 border-2 border-yellow-400 rounded-lg"
            >
                <span class="block">#{{(index + 1)}} {{tx.height}}</span>
                <span class="block">{{tx.tx_hash}}</span>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

/* Import modules. */
import numeral from 'numeral'
// import { v4 as uuidv4 } from 'uuid'
// import sha256 from 'crypto-js/sha256'
// import hexEnc from 'crypto-js/enc-hex'

export default {
    data: () => ({
        pageTitle: null,
        balance: null,
        txHistory: null
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

        sortedTxHistory () {
            if (!this.txHistory) {
                return []
            }

            const history = [...this.txHistory]

            const sorted = history.sort((a, b) => {
                return b.height - a.height
            })

            return sorted.slice(0, 20)
        }
    },
    methods: {
        async init () {
            let request

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
            this.txHistory = await this.$store.dispatch('rostrum/makeRequest', request)
            console.log('REQUESTED TX HISTORY', this.txHistory)
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
