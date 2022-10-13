<template>
    <main class="mt-10 border-t border-b border-gray-200">

        <input
            class="hidden block w-full text-indogo-800 text-lg bg-indigo-100 py-2 pl-10 pr-3 border-2 border-indigo-500 rounded-lg leading-5 focus:text-gray-900 placeholder-indogo-800 focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0"
            placeholder="Find your preferred currency"
            type="search"
            v-model="search"
            @keyup="findAsset"
            @paste="findAsset"
        />
    
        <h1 class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">
            Payment Coins
        </h1>

        <div class="flex grid grid-cols-3 gap-10">
            <div 
                v-for="coin of coins" 
                :key="coin.id" 
                @click="loadAsset(coin.id)" 
                class="flex flex-col items-center"
            >
                <img
                    :src="coin.iconUrl"
                    :alt="coin.alt"
                    class="h-16 w-16 flex-none rounded-md object-cover object-center"
                />

                <span class="mt-1 block text-sm text-gray-600 text-center">
                    {{coin.name}} ({{coin.id}})
                </span>
            </div>
        </div>

        <h1 class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">
            Stable Coins
        </h1>

        <div class="flex grid grid-cols-3 gap-10">
            <div 
                v-for="coin of stablecoins" 
                :key="coin.id" 
                @click="loadAsset(coin.id)" 
                class="flex flex-col items-center"
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

        <hr class="my-5" />

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
        
        isShowingPaymentMonitor: null,
    }),
    computed: {
        //
    },
    methods: {
        findAsset() {
            console.log('FIND ASSET', this.search)
        },

        async loadAsset(_asset) {
            console.log('LOAD ASSET', _asset)

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
            // console.log('RAW RESPONSE', rawResponse)

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

        // FOR DEV ONLY
        this.orderid = '6e687eda1447765d3d70'

        this.coins = []
        this.stablecoins = []

        /* PAYMENT COINS */

        this.coins.push({
            id: 'BCH',
            name: 'Bitcoin Cash',
            iconUrl: 'https://assets.telr.io/coins/svg/bch.svg',
        })

        this.coins.push({
            id: 'BTC',
            name: 'Bitcoin',
            iconUrl: 'https://assets.telr.io/coins/svg/btc.svg',
        })

        this.coins.push({
            id: 'DASH',
            name: 'Dash',
            iconUrl: 'https://assets.telr.io/coins/svg/dash.svg',
        })

        this.coins.push({
            id: 'AVAX',
            name: 'Avalanche',
            iconUrl: 'https://assets.telr.io/coins/svg/avax.svg',
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


        /* STABLE COINS */

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
            id: 'DAI',
            name: 'Dai',
            network: {
                name: 'Ethereum',
                iconUrl: 'https://assets.telr.io/coins/svg/eth.svg',    
            },
            iconUrl: 'https://assets.telr.io/coins/svg/dai.svg',
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
            id: 'MIM',
            name: 'Matic Internet Money',
            network: {
                name: 'Avalanche',
                iconUrl: 'https://assets.telr.io/coins/svg/avax.svg',    
            },
            iconUrl: 'https://assets.telr.io/coins/svg/mim.svg',
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
