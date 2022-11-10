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
                        <button @click="openWebMining" class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow text-lg font-bold rounded-lg text-yellow-200 bg-blue-800 hover:bg-blue-600">
                            Start Web Mining
                        </button>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                <div class="grid grid-cols-1 divide-y divide-gray-200">
                    <section class="flex flex-col items-center justify-center">
                        <h3 class="text-xs text-gray-400">
                            Market Capitalization
                        </h3>

                        <div v-html="displayMarketCap"></div>
                    </section>

                    <section class="flex flex-col items-center justify-center">
                        <h3 class="text-xs text-gray-400">
                            Network Difficulty
                        </h3>

                        <div v-html="displayDifficulty"></div>
                    </section>

                    <section class="flex flex-col items-center justify-center">
                        <h3 class="text-xs text-gray-400">
                            Network Hashrate
                        </h3>

                        <div v-html="displayHashrate"></div>
                    </section>
                </div>

                <div @click="openArbitrage" class="group cursor-pointer flex flex-col justify-center px-6 py-5 text-sm font-medium text-center">
                    <span class="text-gray-600 text-2xl tracking-widest">
                         Market Value
                    </span>

                    <span class="text-2xl text-green-500">
                        {{displayMarketValue}}
                        <sup class="text-xs opacity-50">USD</sup>
                    </span>

                    <span class="text-gray-400 text-xs">
                        Value Per MEX <span class="font-medium text-gray-600">(VPM)</span>
                    </span>

                    <div class="my-3 relative">
                        <div class="absolute inset-0 flex items-center" aria-hidden="true">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>

                        <div class="relative flex justify-center">
                            <div class="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xl font-bold leading-5 text-rose-500 shadow transform duration-300 ease-in group-hover:bg-rose-600 group-hover:text-rose-100 group-hover:text-2xl">
                                <span>{{displayMultiplier}}</span>
                            </div>
                        </div>
                    </div>

                    <span class="text-gray-600 text-2xl tracking-widest">
                        Mining Cost
                    </span>

                    <span class="text-2xl text-green-500">
                        {{displayMiningCost}}
                        <sup class="text-xs opacity-50">USD</sup>
                    </span>

                    <span class="text-gray-400 text-xs">
                        Cost Per MEX <span class="font-medium text-gray-600">(CPM)</span>
                    </span>
                </div>

                <div class="grid grid-cols-1 divide-y divide-gray-200">
                    <section class="flex flex-col items-center justify-center">
                        <h3 class="text-xs text-gray-400">
                            Pool Hashrate
                        </h3>

                        <div v-html="displayPoolHashrate"></div>
                    </section>

                    <section class="flex flex-col items-center justify-center">
                        <h3 class="text-xs text-gray-400">
                            Last Block Found
                        </h3>

                        <div v-html="displayLastBlock"></div>
                    </section>

                    <section class="flex flex-col items-center justify-center">
                        <h3 class="text-xs text-gray-400">
                            Platform Hashrate
                        </h3>

                        <div v-html="displayPlatformHashrate"></div>
                    </section>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* global miner */

import { mapGetters } from 'vuex'

/* Import modules. */
import gravatar from 'gravatar'
// import * as miner from 'wasm-miner'
import numeral from 'numeral'

export default {
    data: () => ({
        blocks: null,
        difficulty: null,
        networkhashps: null,

        marketValue: null,
        miningCost: null,
        multiplier: null
    }),
    computed: {
        ...mapGetters({
            nexCap: 'system/getNexCap',
            nexUsd: 'system/getNexUsd'
        }),

        displayDifficulty () {
            if (!this.difficulty) {
                return
            }

            const strDifficulty = this.difficulty.toFixed(6)

            return `<span class="text-lg font-medium"><span class="text-gray-500">0.</span><span class="px-1 text-indigo-700 text-2xl">${strDifficulty.slice(2, 5)}</span><span class="text-gray-500">${strDifficulty.slice(5)}</span></span>`
        },

        displayHashrate () {
            if (!this.networkhashps) {
                return
            }

            return `<span class="text-lg font-medium"><span class="px-1 text-indigo-700 text-2xl">${numeral(this.networkhashps / 1000000.0).format('0,0.00')}</span><span class="text-gray-500">MH/s</span></span>`
        },

        displayMarketCap () {
            /* Validate state and market cap. */
            if (!this.$store.state.system || !this.nexCap) {
                return '<span class="text-lg font-medium"><span class="px-1 text-indigo-700 text-2xl">$0.00</span><span class="text-gray-500">USD</span></span>'
            }

            /* Set market cap. */
            const marketCap = this.nexCap // NOTE: Preserve responsiveness.

            /* Format market cap. */
            const formattedCap = numeral(marketCap).format('$0,0.00')

            /* Return (formatted) market cap. */
            return `<span class="text-lg font-medium"><span class="px-1 text-indigo-700 text-2xl">${formattedCap}</span><span class="text-gray-500">USD</span></span>`
        },

        displayPoolHashrate () {
            return '<span class="text-lg font-medium"><span class="px-1 text-indigo-700 text-2xl">50,226</span><span class="text-gray-500">H/s</span></span>'
        },

        displayPlatformHashrate () {
            return '<span class="text-lg font-medium"><span class="px-1 text-indigo-700 text-2xl">431,337</span><span class="text-gray-500">H/s</span></span>'
        },

        displayLastBlock () {
            const timeVal = '28'
            const timeUnits = 'mins'

            return `<span class="text-lg font-medium"><span class="px-1 text-indigo-700 text-2xl">${timeVal}</span><span class="text-gray-500">${timeUnits} ago</span></span>`
        },

        displayAvatar () {
            if (this.$store.state.profile.authenticated) {
                return gravatar.url(this.$store.state.profile.user.email)
            } else {
                return require('@/assets/lottie/9994-name-profile-icon-animation-circle.gif')
            }
        },

        displayMarketValue () {
            if (!this.marketValue) {
                return
            }

            return numeral(this.marketValue).format('$0,0.00[00]')
        },

        displayMiningCost () {
            if (!this.miningCost) {
                return
            }

            return numeral(this.miningCost).format('$0,0.00[00]')
        },

        displayMultiplier () {
            if (!this.multiplier) {
                return
            }

            return numeral(this.multiplier).format('0.[0]') + 'x'
        }
    },
    created: function () {
        /* Initialize panel. */
        this.init()
    },
    mounted: function () {
        //
    },
    methods: {
        async init () {
            // this.decodeAddress()
            await this.getMiningInfo() // NOTE: We need `blocks`.

            const rawResponse = await fetch('https://api.telr.io/v1/ticker/quote/NEX', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            const content = await rawResponse.json()
            // console.log('CONTENT (ticker quote NEX):', content) // eslint-disable-line no-console

            /* Set store price. */
            this.$store.dispatch('system/setNexUsd', content.price)

            /* Set store market cap. */
            const marketCap = (content.price * (this.blocks * 10))
            // console.log('MARKET CAP', marketCap)
            this.$store.dispatch('system/setNexCap', marketCap)

            this.marketValue = content.price
            this.miningCost = (5.0 / this.$store.state.system.rpm)
            this.multiplier = this.marketValue / this.miningCost
        },
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

            const content = await rawResponse.json()
            // console.log('CONTENT', content)

            /* Validate content. */
            if (content) {
                this.blocks = content.blocks
                this.difficulty = content.difficulty
                this.networkhashps = content.networkhashps
            }
        },

        openArbitrage () {
            /* Request referrals panel. */
            this.$store.dispatch('system/openPanel', 'arbitrage')
        }
    }
}
</script>
