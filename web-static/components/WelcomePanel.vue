<template>
    <main aria-labelledby="profile-overview-title">
        <div class="rounded-lg bg-white overflow-hidden shadow">
            <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>

            <div class="bg-white p-6">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="sm:flex sm:space-x-5">
                        <router-link to="/profile" class="flex-shrink-0">
                            <img
                                class="mx-auto h-20 w-20 rounded-full"
                                :src="displayAvatar"
                                alt="profile / avatar"
                            />
                        </router-link>

                        <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p class="text-sm font-medium text-gray-600">Nexa Rocks!</p>
                            <p class="text-xl font-bold text-gray-900 sm:text-2xl">Welcome Guest</p>
                            <p class="text-sm font-medium text-gray-600">NEXA Premier Mining Pool</p>
                        </div>
                    </div>
                    <div class="mt-5 flex justify-center sm:mt-0">
                        <button @click="openWebMining" class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-lg font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
                            Open Web Mining
                        </button>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                <div class="flex flex-col justify-center px-6 py-5 text-sm font-medium text-center">
                    <span class="text-2xl text-green-500">
                        30,226 H/s
                    </span>

                    <span class="text-gray-600">
                        Pool Hashrate
                    </span>

                    <hr class="my-2" />

                    <span class="text-base text-gray-900" v-html="displayDifficulty">
                    </span>

                    <span class="text-xs text-gray-600">
                        Network Difficulty
                    </span>

                    <span class="text-base text-gray-900">
                        {{displayHashRate}}
                    </span>

                    <span class="text-xs text-gray-600">
                        Network Hash Rate
                    </span>
                </div>

                <div class="flex flex-col justify-center px-6 py-5 text-sm font-medium text-center">
                    <span class="text-gray-600 text-xl">
                        Market Value
                    </span>

                    <span class="text-2xl text-green-500">
                        n/a
                    </span>

                    <span class="text-gray-600 text-xs">
                        Value Per Million (VPM)
                    </span>

                    <hr class="my-2" />

                    <span class="text-gray-600 text-xl">
                        Mining Cost
                    </span>

                    <span class="text-2xl text-green-500">
                        $0.0125
                    </span>

                    <span class="text-gray-600 text-xs">
                        Cost Per Million (CPM)
                    </span>
                </div>

                <div class="flex flex-col justify-center px-6 py-5 text-sm font-medium text-center">
                    <span class="text-2xl text-red-500">
                        6 mins 40 secs
                    </span>

                    <span class="text-gray-600">
                        Estimated Next Payout
                    </span>

                    <hr class="my-2" />

                    <span class="text-base text-gray-900">
                        4 mins 20 secs
                    </span>

                    <span class="text-xs text-gray-600">
                        Last Block Reward
                    </span>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* global miner */

/* Import modules. */
import gravatar from 'gravatar'
// import * as miner from 'wasm-miner'
import numeral from 'numeral'

export default {
    data: () => ({
        difficulty: null,
        networkhashps: null
    }),
    computed: {
        displayDifficulty () {
            if (!this.difficulty) {
                return
            }

            const strDifficulty = this.difficulty.toFixed(6)

            return `<span class="text-gray-500">0.</span><span class="px-1 text-red-500 text-2xl">${strDifficulty.slice(2, 5)}</span><span class="text-gray-500">${strDifficulty.slice(5)}</span>`
        },

        displayHashRate () {
            if (!this.networkhashps) {
                return
            }

            return numeral(this.networkhashps / 1000000.0).format('0,0.00') + ' MH/s'
        },

        displayAvatar () {
            if (this.$store.state.profile.authenticated) {
                return gravatar.url(this.$store.state.profile.user.email)
            } else {
                return require('@/assets/lottie/9994-name-profile-icon-animation-circle.gif')
            }
        }
    },
    created: function () {
        // this.decodeAddress()
        this.getMiningInfo()

        // const es = new EventSource('https://stratum.nexa.rocks/v1/shares')
        // console.log('EVENT SOURCE', es)

        // es.onmessage = function (_evt) {
        //     console.log('GOT A MESSAGE', _evt)
        // }

        // es.addEventListener('shares', function (_evt) {
        //     console.log('GOT A SHARE', _evt)
        // })
    },
    mounted: function () {
        //
    },
    methods: {
        test () {
            console.log('Starting test...')

            /* Display welcome. */
            miner.welcome('Anon')
        },

        openWebMining () {
            console.log('openWebMining')
            /* Request mining panel. */
            this.$store.dispatch('system/openPanel', 'mining')

            // /* Set placeholder. */
            // const placeholder = 'nexa:<address-goes-here>'

            // /* Request address. */
            // const address = prompt(
            //     'Please enter your NEXA address 👇',
            //     placeholder
            // )

            // /* Handle canceled request. */
            // if (address === null) {
            //     return
            // }

            // /* Handle empty address. */
            // if (address === '' || address === placeholder) {
            //     return alert('🚨 A valid NEXA address is required to continue 🚨')
            // }

            // alert(`Web mining is coming soon..\n\n[ ${address} ] 👈`)
        },

        // decodeAddress() {
        //     const bech32 = require('../libs/bech32')
        //     console.log('BECH32', bech32);

        //     const test = 'split1checkupstagehandshakeupstreamerranterredcaperred2y9e3w'

        //     const ret = bech32.decode(test, bech32.encodings.BECH32)
        //     console.log('RET', ret)
        // },

        async getMiningInfo () {
            const endpoint = 'https://api.nexa.rocks/v1/core/'
            const rawResponse = await fetch(endpoint, {
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
            // console.log('RAW RESPONSE', rawResponse)

            const content = await rawResponse.json()
            // console.log('CONTENT', content)

            /* Validate content. */
            if (content) {
                this.difficulty = content.difficulty
                this.networkhashps = content.networkhashps
            }
        }

    }
}
</script>
