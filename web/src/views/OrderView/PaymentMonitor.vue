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

        payInWallet() {
            alert('pay in wallet')
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
