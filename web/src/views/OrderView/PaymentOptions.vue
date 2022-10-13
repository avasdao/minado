<template>
    <main class="mt-10 border-t border-gray-200">

        <section :class="{ 'opacity-30': isShowingNetworks }">
            <h1 class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">
                Payment &amp; Privacy Coins
            </h1>

            <div class="flex grid grid-cols-3 gap-7">
                <div 
                    v-for="coin of coins" 
                    :key="coin.id" 
                >
                    <div 
                        @click="loadAsset(coin)" 
                        class="flex flex-col p-3 items-center bg-gray-100 border border-gray-200 rounded-lg cursor-pointer shadow"
                    >
                        <img
                            :src="coin.iconUrl"
                            :alt="coin.alt"
                            class="h-16 w-16 flex-none rounded-md object-cover object-center"
                        />

                        <span class="mt-1 block text-sm text-gray-600 text-center whitespace-nowrap">
                            {{coin.name}}
                        </span>

                        <span class="mt-1 block text-xs text-gray-400 text-center">
                            ( {{coin.id}} )
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <section :class="{ 'hidden': isShowingNetworks }">
            <h1 class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">
                Stable Coins
            </h1>

            <div class="flex grid grid-cols-3 gap-7">
                <div v-for="coin of stablecoins" :key="coin.id">
                    <div 
                        @click="loadAsset(coin)" 
                        class="flex flex-col p-3 items-center bg-gray-100 border border-gray-200 rounded-lg cursor-pointer shadow"
                    >
                        <img
                            :src="coin.iconUrl"
                            :alt="coin.alt"
                            class="h-16 w-16 flex-none rounded-md object-cover object-center"
                        />

                        <span class="mt-1 block text-sm text-gray-600 text-center">
                            {{coin.name}}
                        </span>

                        <span class="mt-1 block text-xs text-gray-400 text-center">
                            ( {{coin.id}} )
                        </span>

                        <span v-if="coin.network" class="mt-0 flex items-center text-xs text-gray-600 text-center italic">
                            {{coin.network.name}}
                            <img :src="coin.network.iconUrl" class="ml-1 w-3 h-3" />
                        </span>

                        <div v-if="coin.networks" class="mt-1 px-1 py-1 grid grid-cols-3 gap-2 bg-gray-200 border border-gray-400 rounded-xl shadow">
                            <img 
                                v-for="url of coin.networks" 
                                :key="url" 
                                :src="url" 
                                class="w-4 h-4" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section :class="{ 'hidden': !isShowingNetworks }">
            <div class="my-5 flex justify-end items-center">
                <button @click="isShowingNetworks=false" class="flex items-center h-10 px-3 py-1 bg-blue-100 border-2 border-blue-300 rounded-lg shadow">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                    
                    <span class="ml-2 text-gray-800 font-bold whitespace-nowrap">
                        CHANGE COIN
                    </span>
                </button>
            </div>

            <h1 class="text-2xl font-medium text-gray-700">
                    USD Coin ( USDC )
            </h1>

            <p class="mt-3 text-sm">
                Select the network that you prefer to send your USD Coin (USDC) for payment.
            </p>

            <h3 class="mt-2 text-base font-medium">
                Please choose one of the following networks:
            </h3>

            <hr class="my-3" />

            <div class="mt-5 flex grid grid-cols-3 gap-7">
                <div class="p-3 flex flex-col items-center bg-gray-100 border-2 border-gray-200 rounded-lg cursor-pointer">
                    <img 
                        @click="loadAsset('')"
                        src="https://assets.telr.io/coins/svg/avax.svg" 
                        class="w-16 h-16" 
                    />

                    <h3 class="mt-1 text-gray-500 text-sm">
                        Avalanche
                    </h3>
                </div>
                
                <div class="p-3 flex flex-col items-center bg-gray-100 border-2 border-gray-200 rounded-lg cursor-pointer">
                    <img 
                        src="https://assets.telr.io/coins/svg/bnb.svg" 
                        class="w-16 h-16" 
                    />

                    <h3 class="mt-1 text-gray-500 text-sm">
                        Binance
                    </h3>
                </div>
                
                <div class="p-3 flex flex-col items-center bg-gray-100 border-2 border-gray-200 rounded-lg cursor-pointer">
                    <img 
                        src="https://assets.telr.io/coins/svg/eth.svg" 
                        class="w-16 h-16" 
                    />

                    <h3 class="mt-1 text-gray-500 text-sm">
                        Ethereum
                    </h3>
                </div>

                <div class="p-3 flex flex-col items-center bg-gray-100 border-2 border-gray-200 rounded-lg cursor-pointer">
                    <img 
                        src="https://assets.telr.io/coins/svg/sol.svg" 
                        class="w-16 h-16" 
                    />

                    <h3 class="mt-1 text-gray-500 text-sm">
                        Solana
                    </h3>
                </div>
                
                <div class="p-3 flex flex-col items-center bg-gray-100 border-2 border-gray-200 rounded-lg cursor-pointer">
                    <img 
                        src="https://assets.telr.io/coins/svg/trx.svg" 
                        class="w-16 h-16" 
                    />

                    <h3 class="mt-1 text-gray-500 text-sm">
                        Tron
                    </h3>
                </div>
                
            </div>
        </section>

        <hr v-if="isShowingPaymentMonitor" class="my-5" />

        <PaymentMonitor 
            v-if="isShowingPaymentMonitor" 
            :shiftStatus="shiftStatus"
        />
    </main>
</template>

<script>
/* Import component. */
import PaymentMonitor from './PaymentMonitor'

export default {
    props: {
        order: Object,
    },
    components: {
        PaymentMonitor,
    },
    data: () => ({
        dataUrl: null,
        search: null,
        
        coins: null,
        stablecoins: null,

        orderid: null,
        shiftStatus: null,
        paymentRequest: null,
        
        isShowingPaymentMonitor: null,
        isShowingNetworks: null,
    }),
    computed: {
        //
    },
    methods: {
        findAsset() {
            console.log('FIND ASSET', this.search)
        },

        loadNetworks() {
            console.log('LOADING NETWORKS')

            this.isShowingNetworks = true
        },

        async loadAsset(_asset) {
            console.log('LOAD ASSET', _asset)

            if (_asset.id === 'USDC') {
                return this.loadNetworks(_asset.id)
            }

            /* Build request body. */
            const body = {
                action: 'payment_request',
                basePair: _asset,
                order: this.order,
            }
            console.log('PAYMENT REQUEST (body):', body)

            /* Set endpoint. */
            const endpoint = 'https://api.nexa.rocks/v1/orders/'

            const rawResponse = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
            console.log('RAW RESPONSE', rawResponse)

            if (rawResponse) {
                this.paymentRequest = await rawResponse.json()
                console.log('BODY (paymentRequest):', this.paymentRequest)

                /* Set display flag. */
                this.isShowingPaymentMonitor = true
            }
        },

        async checkOrder() {
            console.log('CHECKING ORDER')

            /* Build request body. */
            const body = {
                action: 'get_sideshift',
                orderid: this.orderid,
            }

            /* Set endpoint. */
            const endpoint = 'https://api.nexa.rocks/v1/orders/'

            const rawResponse = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
            console.log('RAW RESPONSE', rawResponse)

            if (rawResponse) {
                this.shiftStatus = await rawResponse.json()
                console.log('BODY (get_sideshift)', this.shiftStatus)

                /* Set display flag. */
                this.isShowingPaymentMonitor = true
            }
        },
    },
    created: function () {
        this.isShowingPaymentMonitor = false
        this.isShowingNetworks = false

        // FOR DEV ONLY
        this.orderid = '6e687eda1447765d3d70'

        this.coins = []
        this.stablecoins = []

        /* PAYMENT & PRIVACY COINS */

        this.coins.push({
            id: 'BCH',
            name: 'Bitcoin Cash',
            iconUrl: 'https://assets.telr.io/coins/svg/bch.svg',
        })

        this.coins.push({
            id: 'DASH',
            name: 'Dash',
            iconUrl: 'https://assets.telr.io/coins/svg/dash.svg',
        })

        this.coins.push({
            id: 'BTC',
            name: 'Bitcoin',
            iconUrl: 'https://assets.telr.io/coins/svg/btc.svg',
        })

        this.coins.push({
            id: 'XMR',
            name: 'Monero',
            iconUrl: 'https://assets.telr.io/coins/svg/xmr.svg',
        })

        this.coins.push({
            id: 'ZEC',
            name: 'Zcash',
            iconUrl: 'https://assets.telr.io/coins/svg/zec.svg',
        })

        this.coins.push({
            id: 'AVAX',
            name: 'Avalanche',
            iconUrl: 'https://assets.telr.io/coins/svg/avax.svg',
        })


        /* STABLE COINS */

        this.stablecoins.push({
            id: 'USDC',
            name: 'USD Coin',
            networks: [
                'https://assets.telr.io/coins/svg/bnb.svg',
                'https://assets.telr.io/coins/svg/trx.svg',
                'https://assets.telr.io/coins/svg/avax.svg',
                'https://assets.telr.io/coins/svg/sol.svg',
                'https://assets.telr.io/coins/svg/eth.svg',
            ],
            iconUrl: 'https://assets.telr.io/coins/svg/usdc.svg',
        })

        this.stablecoins.push({
            id: 'USDT',
            name: 'Tether',
            networks: [
                'https://assets.telr.io/coins/svg/bnb.svg',
                'https://assets.telr.io/coins/svg/trx.svg',
                'https://assets.telr.io/coins/svg/avax.svg',
                'https://assets.telr.io/coins/svg/sol.svg',
                'https://assets.telr.io/coins/svg/eth.svg',
            ],
            iconUrl: 'https://assets.telr.io/coins/svg/usdt.svg',
        })

        this.stablecoins.push({
            id: 'MIM',
            name: 'Matic Internet Money',
            network: {
                name: 'Avalanche',
                iconUrl: 'https://assets.telr.io/coins/svg/avax.svg',    
            },
            iconUrl: 'https://assets.telr.io/coins/svg/mim.svg',
        })

        this.stablecoins.push({
            id: 'BUSD',
            name: 'Binance USD',
            network: {
                name: 'Binance',
                iconUrl: 'https://assets.telr.io/coins/svg/bnb.svg',    
            },
            iconUrl: 'https://assets.telr.io/coins/svg/busd.svg',
        })

        this.stablecoins.push({
            id: 'DAI',
            name: 'Dai',
            network: {
                name: 'Ethereum',
                iconUrl: 'https://assets.telr.io/coins/svg/eth.svg',    
            },
            iconUrl: 'https://assets.telr.io/coins/svg/dai.svg',
        })

        this.stablecoins.push({
            id: 'USDD',
            name: 'Decentralized USD',
            network: {
                name: 'Tron',
                iconUrl: 'https://assets.telr.io/coins/svg/trx.svg',    
            },
            iconUrl: 'https://assets.telr.io/coins/svg/usdd.svg',
        })
    },
    mounted: function () {
        // 
    },
}
</script>
