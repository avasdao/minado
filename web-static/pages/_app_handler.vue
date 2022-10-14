<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">Application Handler</h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            {{pageTitle}}
                        </h1>

                        <p class="text-yellow-900">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aliquam maiores animi iusto est laborum quas dolore assumenda voluptate quis! Quaerat corrupti enim autem iusto voluptates dolorum quae voluptate eligendi.
                        </p>

                        <h2>
                            {{id}}
                        </h2>

                        <h2>
                            {{balance}}
                        </h2>
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <PayoutsPanel />

                        <BlockRewardsPanel />
                    </div>
                </div>
            </div>
        </section>

        <FooterView />
    </main>
</template>

<script>
/* global WebSocket */

/* Import modules. */
import { v4 as uuidv4 } from 'uuid'

import sha256 from 'crypto-js/sha256'
import hexEnc from 'crypto-js/enc-hex'

export default {
    data: () => ({
        id: null,
        socket: null,
        requests: null,

        pageTitle: null,
        balance: null
    }),
    computed: {
        //
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

            this.requests[id] = request

            this.socket.send(JSON.stringify(request) + '\n')
        },

        getScriptHash (_scriptPubkey) {
            let addrScripthash = hexEnc.stringify(sha256(hexEnc.parse(_scriptPubkey)))

            addrScripthash = addrScripthash.match(/[a-fA-F0-9]{2}/g).reverse().join('')

            return addrScripthash
        },

        initRostrum () {
            /* Initialize socket connection to Electrum server. */
            // this.socket = new WebSocket('ws://electrum.nexa.org:20003')
            this.socket = new WebSocket('ws://rostrum.devops.cash:20003')

            // const request = `{"method":"blockchain.address.get_balance","params":["nexa:nqtsq5g5mtglrfqmnr45s0x364pxcg2uw88h72hl9c864cyj", true],"id":"${uuidv4()}"}`

            /* Handle open connection. */
            this.socket.onopen = () => {
                // console.log('ONOPEN');

                // const txBytes = '3feb2e20a908ccd7d31f84224276b02f2c3951ed3448da58722a107ec4ab393c'
                // const txid = txBytes.match(/[a-fA-F0-9]{2}/g).reverse().join('')

                // request = `{"method":"blockchain.transaction.get","params":["66ce81cec5a010e151c68d63bd135133cd54cc5f4904817c738a4a19986ccb0c",true],"id":"${uuidv4()}"}`
                // request = `{"method":"blockchain.transaction.get","params":["${txid}",true],"id":"${uuidv4()}"}`
                // this.socket.send(request + '\n')

                // NOTE: Subscribe to receive block headers when a new block is found.
                // const request = `{"method":"","params":[""],"id":"${uuidv4()}"}`
                // console.log('REQUEST-002', request)
                // this.socket.send(request + '\n')

                // const params = []
                // this.makeRequest('blockchain.headers.subscribe', params)

                // const params = [90712]
                // this.makeRequest('blockchain.block.header', params)

                const scriptPubkey = '00511417b25c22cc7ce6bf5a8b1ee945638c5f143a3c06' // Rpi (nexa:nqtsq5g5z7e9cgkv0nnt7k5trm552cuvtu2r50qxzeknvu3u)
                console.log('scriptPubkey', scriptPubkey)

                const params = [this.getScriptHash(scriptPubkey)]
                this.makeRequest('blockchain.scripthash.get_balance', params)
            }

            /* Handle message. */
            this.socket.onmessage = (msg) => {
                // console.log('ONMESSAGE', msg);

                let data
                let request
                let result
                let params

                if (msg && msg.data) {
                    try {
                        data = JSON.parse(msg.data)
                        console.log('DATA MESSAGE', data)

                        if (data && data.result) {
                            result = data.result
                            console.log('MESSAGE RESULT', data.id, result)

                            if (this.requests[data.id]) {
                                console.log('FOUND', this.requests[data.id])

                                request = this.requests[data.id]

                                if (request && request.method === 'blockchain.scripthash.get_balance') {
                                    this.balance = result.confirmed
                                }
                            }

                            // TODO: Validate result isHex
                            // this.parseTx(result)
                        }

                        if (data && data.params) {
                            params = data.params
                            console.log('PARAMS', params)
                        }

                        if (params && params[0].height) {
                            console.log('NEW BLOCK', params[0])

                            // TODO: Validate result isHex
                            this.parseBlock(params[0].hex)

                            const height = parseInt(params[0].height)
                            console.log('HEIGHT', height)

                            if (height > 0) {
                                // let request

                                // request = `{"method":"blockchain.block.header","params":[${height}],"id":"${uuidv4()}"}`
                                // this.socket.send(request + '\n')
                            }
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }
            }

            /* Handle connection close. */
            this.socket.onclose = function () {
                console.log('ONCLOSE')
            }

            /* Handle connection error. */
            this.socket.onerror = function (e) {
                console.log('ONERROR', e)
            }
        },

        isHex (_str) {
            /* Define regex. */
            const regexp = /^[0-9a-fA-F]+$/

            /* Test regex. */
            if (regexp.test(_str)) {
                return true
            } else {
                return false
            }
        },

        /*

        Block # 56241

        Raw Data
        9fcf961578ca8a7a2a99a02ec5e279b295498284ae85dffd33ebbec442dacb90f055091d0d5e3d9771a01061a4d5002b8ac49c27d33f45ec492b1a2f8e16f40536a5ffc20f9fba807ac9794a87d796cf827452c29a095a4dde5df050462e450e4c32c518000000000000000000000000000000000000000000000000000000000000000008150c6382b63118283bf668160000000000000000000000000000000000000000000000000000f90000000000000001000000046a659130

        Parsed Data
        9fcf961578ca8a7a2a99a02ec5e279b295498284ae85dffd33ebbec442dacb90 <-- previous hash
        f055091d <-- bits (BE)
        0d5e3d9771a01061a4d5002b8ac49c27d33f45ec492b1a2f8e16f40536a5ffc2 <-- ancestor hash
        0f9fba807ac9794a87d796cf827452c29a095a4dde5df050462e450e4c32c518 <-- coinbase txid (LE) / merkle root
        0000000000000000000000000000000000000000000000000000000000000000 <-- ??
        08150c6382b631 <-- ??
        18283bf668160000000000000000000000000000000000000000000000000000 <-- chainwork (BE)
        f900000000000000 <-- size (249 bytes)
        01 <-- # of transactions??
        00000004 <-- xx type??
        6a659130 <-- nonce

        */
        parseBlock (_rawBlock) {
            if (!this.isHex(_rawBlock)) {
                return
            }

            const block = _rawBlock

            const version = block.slice(0, 2)
            console.info('Block version:', version, parseInt(version, 16))

            const inputCount = block.slice(2, 4)
            console.info('Block input count:', inputCount, parseInt(inputCount, 16))

            // const val1 = block.slice(4, 4 + (parseInt(inputCount, 16) * 2))
            // console.info('Block value #1:', val1)
        },

        parseTx (_rawTx) {
            if (!this.isHex(_rawTx)) {
                return
            }

            const tx = _rawTx

            const version = tx.slice(0, 2)
            console.info('Transaction version:', version, parseInt(version, 16))
        }

    },
    created: function () {
        let params

        this.pageTitle = 'Oops! Not sure what to do here..'

        this.requests = {}

        /* Set route. */
        const route = this.$route

        /* Validate route. */
        if (route) {
            params = route.params
            console.log('PARAMS', params)
        }

        /* Validate application handler. */
        if (params && params.app_handler) {
            this.id = params.app_handler
        }
    },
    mounted: function () {
        this.initRostrum()
    }
}
</script>
