<template>
    <main class="mt-10 border-t border-b border-gray-200">

        <input
            class="block w-full text-indogo-800 text-lg bg-indigo-100 py-2 pl-10 pr-3 border-2 border-indigo-500 rounded-lg leading-5 focus:text-gray-900 placeholder-indogo-800 focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0"
            placeholder="Find your preferred currency"
            type="search"
            v-model="search"
            @keyup="findAsset"
            @paste="findAsset"
        />
    
        <h1 class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">
            Regular Coins
        </h1>

        <div class="flex gap-4">
            <div @click="loadAsset('BTC')" class="flex flex-col items-center">
                <img
                    src="https://assets.telr.io/coins/svg/btc.svg"
                    alt="Bitcoin (BTC)"
                    class="h-16 w-16 flex-none rounded-md object-cover object-center"
                />

                <span class="mt-1 block text-sm text-gray-600">
                    Bitcoin (BTC)
                </span>
            </div>

            <div @click="loadAsset('BTC')" class="flex flex-col items-center">
                <img
                    src="https://assets.telr.io/coins/svg/btc.svg"
                    alt="Tether (USDT)"
                    class="h-16 w-16 flex-none rounded-md object-cover object-center"
                />

                <span class="mt-1 block text-sm text-gray-600">
                    Tether
                </span>

                <span class="mt-0 block text-xs text-gray-400 italic">
                    Ethereum
                </span>
            </div>

        </div>

        <h1 class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">
            Stable Coins
        </h1>

        <div class="flex gap-4">
            <div @click="loadAsset('USDT')" class="flex flex-col items-center">
                <img
                    src="https://assets.telr.io/coins/svg/usdt-ethereum.svg"
                    alt="Tether (USDT)"
                    class="h-16 w-16 flex-none rounded-md object-cover object-center"
                />

                <span class="mt-1 block text-sm text-gray-600">
                    Tether (USDT)
                </span>

                <span class="mt-0 block text-xs text-gray-400 italic">
                    Ethereum
                </span>
            </div>

            <div @click="loadAsset('USDT')" class="flex flex-col items-center">
                <img
                    src="https://assets.telr.io/coins/svg/usdt-ethereum.svg"
                    alt="Tether (USDT)"
                    class="h-16 w-16 flex-none rounded-md object-cover object-center"
                />

                <span class="mt-1 block text-sm text-gray-600">
                    Tether (USDT)
                </span>

                <span class="mt-0 block text-xs text-gray-400 italic">
                    Ethereum
                </span>
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
    },
    mounted: function () {
        // 
    },
}
</script>
