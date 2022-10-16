<template>
    <main class="mt-10 border-t border-b border-gray-200">

        <h1 class="text-2xl font-medium">
            Payment Monitor
        </h1>

        <img
            @click="payInWallet"
            :src="dataUrl"
            class="mt-5 w-64 h-64 border-4 border-indigo-500 rounded-lg cursor-pointer"
        />

        <div v-if="shiftStatus && shiftStatus.depositAddress" class="mt-5 px-3 py-1 text-center text-xl font-medium text-gray-100 bg-indigo-700 border-2 border-indigo-800 rounded-lg">
            {{shiftStatus ? shiftStatus.depositAddress : ''}}
        </div>

        <div v-if="shiftStatus && shiftStatus.depositAmount" class="mt-5 px-3 py-1 text-center text-xl font-medium text-gray-100 bg-indigo-700 border-2 border-indigo-800 rounded-lg">
            {{shiftStatus ? shiftStatus.depositAmount : 0}} {{shiftStatus ? shiftStatus.depositCoin : ''}}
        </div>

        <section class="p-3 flex items-center grid grid-cols-5 gap-1 space-x-5">
            <span class="col-span-2 text-right text-base text-gray-600">
                Order ID <em class="text-xs">(Sideshift)</em>
            </span>
            <span class="col-span-3 text-lg text-gray-800">
                {{paymentRequest ? paymentRequest.shiftid : ''}}
            </span>

            <span class="col-span-2 text-right text-base text-gray-600">
                Status
            </span>
            <span class="col-span-3 text-lg text-gray-800">
                {{paymentRequest ? paymentRequest.status : ''}}
            </span>

            <span class="col-span-2 text-right text-base text-gray-600">
                Payment Network
            </span>
            <span class="col-span-3 text-lg text-gray-800">
                {{paymentRequest ? paymentRequest.depositNetwork : ''}}
            </span>

            <span class="col-span-2 text-right text-base text-gray-600">
                Invoice Created
            </span>
            <span class="col-span-3 text-lg text-gray-800">
                {{paymentCreated}}
            </span>

            <div v-if="paymentRequest && paymentRequest.status !== 'expired'" class="mt-3 px-3 py-1 col-span-5 text-center bg-yellow-100 border-2 border-yellow-300 rounded-lg">
                <span class="text-xl font-medium text-red-600">
                    Invoice expires {{timeLeftToPay}}
                </span>
            </div>
        </section>

    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'
import QRCode from 'qrcode'

export default {
    props: {
        paymentRequest: Object,
        shiftStatus: Object
    },
    data: () => ({
        dataUrl: null,
        search: null
    }),
    watch: {
        shiftStatus: function (_status) {
            console.log('CHANGED (shiftStatus):', _status)

            /* Update data URL. */
            this.updateDataUrl()
        },
        paymentRequest: function (_status) {
            console.log('CHANGED (paymentRequest):', _status)

            /* Update data URL. */
            this.updateDataUrl()
        }
    },
    computed: {
        paymentCreated () {
            if (!this.shiftStatus || !this.shiftStatus.createdAt) {
                return 'n/a'
            }

            return moment(this.shiftStatus.createdAt).format('lll')
        },

        timeLeftToPay () {
            if (!this.paymentRequest || !this.paymentRequest.expiresAt) {
                return 'unknown'
            }

            return moment(this.paymentRequest.expiresAt).fromNow()
        }
    },
    methods: {
        getPaymentUrl () {
            /* Initialize deposit address. */
            let depositAddress = ''

            /* Initialize deposit amount. */
            let depositAmount = 0.0

            const currencyPrefix = 'bitcoin:'

            /* Validate deposit address. */
            if (this.paymentRequest && this.paymentRequest.depositAddress) {
                depositAddress = this.paymentRequest.depositAddress
            }

            /* Validate deposit amount. */
            if (this.paymentRequest && this.paymentRequest.depositAmount) {
                depositAmount = this.paymentRequest.depositAmount
            }

            console.info('Updated deposit info:', depositAddress, depositAmount)

            const paymentLabel = window.encodeURIComponent('Nexa Rocks!')
            const paymentUrl = `${currencyPrefix}${depositAddress}?amount=${depositAmount}&label=${paymentLabel}`

            return paymentUrl
        },

        /**
         * Update Data URL
         */
        async updateDataUrl () {
            /* Set data URL. */
            this.dataUrl = await QRCode.toDataURL(this.getPaymentUrl())
        },

        findAsset () {
            console.log('FIND ASSET', this.search)
        },

        payInWallet () {
            window.open(this.getPaymentUrl())
        }
    },
    created: function () {
        /* Update data URL. */
        this.updateDataUrl()

        console.log('paymentRequest', this.paymentRequest)
        console.log('shiftStatus', this.shiftStatus)
    },
    mounted: function () {
        //
    }
}
</script>
