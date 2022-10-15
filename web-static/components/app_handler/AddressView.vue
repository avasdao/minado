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
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

/* Import modules. */
import numeral from 'numeral'
import { v4 as uuidv4 } from 'uuid'

import sha256 from 'crypto-js/sha256'
import hexEnc from 'crypto-js/enc-hex'

export default {
    data: () => ({
        pageTitle: null
        // balance: null
    }),
    watch: {
        address: function (_address) {
            console.log('ADDRESS HAS CHANGED (from AddressView):', _address)
        },
        balance: function (_balance) {
            console.log('BALANCE HAS CHANGED (from AddressView):', _balance)
        },
        requests: {
            function (_requests) {
                console.log('REQUESTS HAVE CHANGED (from AddressView):', _requests)
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters({
            address: 'rostrum/getAddress',
            balance: 'rostrum/getBalance',
            requests: 'rostrum/getRequests'
        }),

        requests () {
            return this.$store.state.rostrum.requests
        },

        displayBalance () {
            if (!this.balance) {
                return '0.00 NEX'
            }

            return numeral(this.balance / 100.0).format('0,0.00') + ' NEX'
        }
    },
    methods: {
        /**
         * Make Request
         *
         * Performs an RPC request to an ElectrumX server.
         *
         * @param {*} _method
         * @param {*} _params
         */
        makeRequest (_method, _params) {
            const id = uuidv4()

            const request = {
                id,
                method: _method,
                params: _params
            }
            console.log('RPC makeRequest', request)

            // this.requests[id] = request
            this.$store.dispatch('rostrum/makeRequest', request)

            // this.socket.send(JSON.stringify(request) + '\n')
        },

        getScriptHash (_scriptPubkey) {
            let addrScripthash = hexEnc.stringify(sha256(hexEnc.parse(_scriptPubkey)))

            addrScripthash = addrScripthash.match(/[a-fA-F0-9]{2}/g).reverse().join('')

            return addrScripthash
        }

        // initRostrum () {
        //     /* Initialize socket connection to Electrum server. */
        //     // this.socket = new WebSocket('ws://electrum.nexa.org:20003')
        //     this.socket = new WebSocket('ws://rostrum.devops.cash:20003')

        //     /* Handle open connection. */
        //     this.socket.onopen = () => {
        //         const scriptPubkey = '00511417b25c22cc7ce6bf5a8b1ee945638c5f143a3c06' // Rpi (nexa:nqtsq5g5z7e9cgkv0nnt7k5trm552cuvtu2r50qxzeknvu3u)
        //         console.log('scriptPubkey', scriptPubkey)

        //         const params = [this.getScriptHash(scriptPubkey)]
        //         this.makeRequest('blockchain.scripthash.get_balance', params)
        //     }

        //     /* Handle message. */
        //     this.socket.onmessage = (msg) => {
        //         // console.log('ONMESSAGE', msg);

        //         let data
        //         let request
        //         let result
        //         let params

        //         if (msg && msg.data) {
        //             try {
        //                 data = JSON.parse(msg.data)
        //                 console.log('DATA MESSAGE', data)

        //                 if (data && data.result) {
        //                     result = data.result
        //                     console.log('MESSAGE RESULT', data.id, result)

        //                     if (this.requests[data.id]) {
        //                         console.log('FOUND', this.requests[data.id])

        //                         request = this.requests[data.id]

        //                         if (request && request.method === 'blockchain.scripthash.get_balance') {
        //                             this.balance = result.confirmed
        //                         }
        //                     }
        //                 }

        //                 if (data && data.params) {
        //                     params = data.params
        //                     console.log('PARAMS', params)
        //                 }
        //             } catch (err) {
        //                 console.error(err)
        //             }
        //         }
        //     }

        //     /* Handle connection close. */
        //     this.socket.onclose = function () {
        //         console.log('ONCLOSE')
        //     }

        //     /* Handle connection error. */
        //     this.socket.onerror = function (e) {
        //         console.log('ONERROR', e)
        //     }
        // }

    },
    created: function () {
        // this.pageTitle = 'Oops! Not sure what to do here..'

        // this.requests = {}

        // this.initRostrum()
    },
    mounted: function () {
        // setTimeout(() => {
        //     /* Handle message. */
        //     // console.log('this.$store.state.rostrum', this.$store.state.rostrum)
        //     this.$store.state.rostrum.socket.onmessage = (msg) => {
        //         console.log('ROSTRUM SOCKET ONMESSAGE (from AddressView)', msg)
        //     }
        // }, 2000)
    }
}
</script>
