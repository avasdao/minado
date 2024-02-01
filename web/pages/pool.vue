<template>
    <main class="min-h-full">
        <HeaderView />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">Pool Mining</h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <div class="flex flex-row justify-between">
                            <div>
                                <h1 class="text-4xl font-bold text-yellow-900">
                                    Pool Mining
                                </h1>

                                <p class="mt-3 text-yellow-900">
                                    If you're interested in mining $NEX coins, but dont' have the CPU <em>(hash)</em>power to Solo mine, then Pool mining is perfect for you!
                                    You will earn a proportional share of each block reward <em>(10,000,000 NEX)</em>.
                                </p>
                            </div>

                            <img
                                src="~/assets/lottie/90472-saving-the-money.gif"
                                class="ml-20 p-1 h-20 border-2 border-yellow-600 rounded-xl"
                            />
                        </div>

                        <p class="text-yellow-900 font-medium">
                            Pool Payouts are sent after each block as a combination of $NEX coins and <NuxtLink to="/token" class="text-blue-500 font-medium hover:underline">$ROCKS</NuxtLink> tokens.
                        </p>

                        <div class="grid grid-cols-3 gap-5">
                            <div class="p-3 flex flex-col items-center bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                                <h3 class="text-xs text-yellow-600 font-medium uppercase">
                                    Block Height
                                </h3>

                                <h2 class="text-2xl text-yellow-800 font-medium">
                                    {{displayBlocks}}
                                </h2>
                            </div>

                            <div class="p-3 flex flex-col items-center bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                                <h3 class="text-xs text-yellow-600 font-medium uppercase">
                                    Mining Difficulty
                                </h3>

                                <h2 class="text-2xl text-yellow-800 font-medium">
                                    {{displayDifficulty}}
                                </h2>
                            </div>

                            <div class="p-3 flex flex-col items-center bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                                <h3 class="text-xs text-yellow-600 font-medium uppercase">
                                    Network Hashrate
                                </h3>

                                <h2 class="text-2xl text-yellow-800 font-medium">
                                    {{displayHashrate}}
                                </h2>
                            </div>
                        </div>

                        <hr class="border-t border-yellow-600" />

                        <div class="grid grid-cols-1 gap-5">
                            <div class="flex gap-5">
                                <div class="p-3 flex flex-col w-fit bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                                    <h3 class="text-xs text-yellow-600 font-medium uppercase">
                                        Mining ID
                                    </h3>

                                    <h2 class="text-2xl text-yellow-800 font-medium">
                                        0x{{miningid}}
                                    </h2>
                                </div>

                                <div class="p-3 flex flex-col w-fit bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                                    <h3 class="text-xs text-yellow-600 font-medium uppercase">
                                        nBits
                                    </h3>

                                    <h2 class="text-2xl text-yellow-800 font-medium">
                                        0x{{nBits}}
                                    </h2>
                                </div>
                            </div>

                            <div class="p-3 flex flex-col w-fit bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                                <h3 class="text-xs text-yellow-600 font-medium uppercase">
                                    Header Commitment
                                </h3>

                                <h2 class="text-xl text-yellow-800 font-medium">
                                    0x{{headerCommitment}}
                                </h2>
                            </div>

                            <div class="p-3 flex flex-col w-fit bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                                <h3 class="text-xs text-yellow-600 font-medium uppercase">
                                    Pool Address
                                </h3>

                                <a @click="loadPoolAddress" class="text-xl text-blue-500 font-medium hover:underline cursor-pointer">
                                    {{poolAddress}}
                                </a>
                            </div>
                        </div>

                        <p class="text-sm text-yellow-700 italic">
                            NOTE: <NuxtLink to="/token" class="text-blue-500 font-medium hover:underline">$ROCKS</NuxtLink> are automatically converted 1-for-1 into $NEX coins after staking in the <NuxtLink to="/quarry" class="text-blue-500 font-medium hover:underline">Quarry</NuxtLink> for seven (7) days.
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
/* Import modules. */
import numeral from 'numeral'

export default {
    head: () => ({
        title: 'Pool Mining — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    data: () => ({
        blocks: null,
        difficulty: null,
        networkhashps: null,

        poolAddress: null,
        miningid: null,
        headerCommitment: null,
        nBits: null
    }),
    computed: {
        displayBlocks () {
            if (!this.blocks) {
                return 'loading...'
            }

            return numeral(this.blocks).format('0,0')
        },

        displayDifficulty () {
            if (!this.difficulty) {
                return 'loading...'
            }

            return numeral(this.difficulty).format('0,0.0000[00]')
        },

        displayHashrate () {
            if (!this.networkhashps) {
                return 'loading...'
            }

            return numeral(this.networkhashps / 1000000).format('0,0.00') + ' MH/s'
        }
    },
    methods: {
        async getMiningInfo () {
            const endpoint = 'https://api.nexa.rocks/v1/core/'

            let content
            let rawResponse

            rawResponse = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'getmininginfo',
                    params: []
                })
            })

            content = await rawResponse.json()
            // console.log('CONTENT', content)

            /* Validate content. */
            if (content) {
                this.blocks = content.blocks
                this.difficulty = content.difficulty
                this.networkhashps = content.networkhashps
            }

            rawResponse = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'getminingcandidate',
                    params: [null, this.poolAddress]
                })
            })

            content = await rawResponse.json()
            console.log('CONTENT', content)

            /* Validate content. */
            if (content) {
                this.miningid = content.id
                this.headerCommitment = content.headerCommitment
                this.nBits = content.nBits
            }
        },

        loadPoolAddress () {
            /* Request help panel. */
            this.$store.dispatch('system/openPanel', {
                tab: 'address',
                metadata: this.poolAddress
            })
        }
    },
    created: function () {
        /* Set pool address. */
        this.poolAddress = 'nexa:nqtsq5g5lepsdnyt9tmpyjr5wkn58me00e7pdh7d248lrre0'

        /* Request mining info. */
        this.getMiningInfo()
    },
    mounted: function () {
        //
    }
}
</script>
