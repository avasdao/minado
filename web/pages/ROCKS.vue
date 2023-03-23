<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    ROCKS Tokens
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            $ROCKS
                        </h1>

                        <p class="text-yellow-900">
                            These are the native tokens of the Nexa Rocks! mining pool which are paid out along with $NEX during regular payouts.
                        </p>

                        <h2 class="text-2xl text-gray-600 font-medium">
                            Why $ROCKS?
                        </h2>

                        <ol class="list-disc pl-10">
                            <li>Receive "spendable" $NEX with each payout</li>
                            <li>Receive daily interest payouts ONLY for "active" $ROCKS <em>(to discourage HODLing)</em></li>
                            <li>Vote on "public" pool proposals</li>
                        </ol>

                        <p class="text-yellow-900">
                            $ROCKS enable the pool to make "instant" $NEX payouts to miners.
                        </p>

                        <p class="text-yellow-900">
                            $ROCKS are automatically converted 1-for-1 into $NEX coins after staking in the <router-link to="/quarry" class="text-blue-500 font-medium hover:underline">Quarry</router-link> for seven (7) days.
                        </p>

                        <p class="text-sm text-yellow-700 italic">
                            NOTE: Daily interest is paid on $ROCKS UTXOs for up to 7-days.
                        </p>
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <PayoutsBlock />

                        <BlockRewardsPanel />
                    </div>
                </div>
            </div>
        </section>

        <FooterView />
    </main>
</template>

<script>
export default {
    data: () => ({
        //
    }),
    head: () => ({
        title: '$ROCKS — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    created: function () {
        //
    },
    mounted: function () {
        //
    },
    methods: {
        //
    }
}
</script>
