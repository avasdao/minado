<template>
    <main aria-labelledby="recent-hires-title">
        <div class="rounded-lg bg-white overflow-hidden shadow">
            <div class="p-6">
                <h2 class="text-xl font-medium text-gray-900" id="recent-hires-title">
                    Pool Payouts
                </h2>

                <div class="flow-root mt-6">
                    <ul role="list" class="-my-5 divide-y divide-gray-200">

                        <li class="py-4" v-for="payout of payouts" :key="payout.id">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0">
                                    <img
                                        class="h-8 w-8 rounded-full"
                                        :src="payout.icon"
                                        alt=""
                                    />
                                </div>

                                <div class="flex-1 min-w-0">
                                    <p class="text-base font-medium text-gray-900 truncate">
                                        {{payout.amount}}
                                    </p>

                                    <p class="text-sm text-gray-500 truncate italic">
                                        {{payout.summary}}
                                    </p>
                                </div>

                                <div>
                                    <a href="javascript://" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                                        View
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="mt-6">
                    <a href="javascript://" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        View all
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data: () => ({
        payouts: null
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        this.payouts = []

        this.payouts.push({
            id: 'temp-id-1',
            amount: '8 432 192 NEX',
            summary: 'paid to 48 miners 10 mins ago',
            icon: 'https://i.ibb.co/ThRSRqB/nexa-logo.png',
            createdAt: 1234567890
        })

        this.payouts.push({
            id: 'temp-id-2',
            amount: '2 823 932 NEX',
            summary: 'paid to 18 miners 32 mins ago',
            icon: 'https://i.ibb.co/ThRSRqB/nexa-logo.png',
            createdAt: 1234567890
        })

        this.payouts.push({
            id: 'temp-id-3',
            amount: '12 932 823 NEX',
            summary: 'paid to 51 miners 2 hours ago',
            icon: 'https://i.ibb.co/ThRSRqB/nexa-logo.png',
            createdAt: 1234567890
        })
    },
    mounted: function () {
        //
    }
}
</script>
