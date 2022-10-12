<template>
    <main class="mt-10 border-t border-b border-gray-200">

        <h1 class="text-2xl font-medium">
                Payment Monitor
            </h1>

            <img 
                @click="payInWallet"
                :src="dataUrl" 
                class="mt-5 w-64 h-64 border-4 border-pink-500 rounded-lg cursor-pointer" 
            />

    </main>
</template>

<script>
/* Import modules. */
import QRCode from 'qrcode'

export default {
    data: () => ({
        dataUrl: null,
        search: null,
    }),
    computed: {
        //
    },
    methods: {
        async init() {
            const text = 'nexa:nqtsq5g5z7e9cgkv0nnt7k5trm552cuvtu2r50qxzeknvu3u'

            this.dataUrl = await QRCode.toDataURL(text)
            console.log('DATAURL', this.dataUrl);
        },

        findAsset() {
            console.log('FIND ASSET', this.search)
        },

        async payInWallet() {
            const body = {
                action: 'payment_request',
                profileid: 'satoshi',
                totalMiners: 2,
            }

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
                const json = await rawResponse.json()
                console.log('BODY', json)
            }

        },

    },
    created: function () {
        this.init()
    },
    mounted: function () {
        // 
    },
}
</script>
