<script setup lang="ts">
/* global miner */

/* Import modules. */
import gravatar from 'gravatar'
// import * as miner from 'wasm-miner'
import numeral from 'numeral'


const blocks = ref(null)
const difficulty = ref(null)
const networkhashps = ref(null)

const marketValue = ref(null)
const miningCost = ref(null)
const multiplier = ref(null)





</script>

<template>
    <main aria-labelledby="profile-overview-title">
        <div class="rounded-lg bg-white overflow-hidden shadow">
            <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>

            <div class="bg-white p-6">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="sm:flex sm:space-x-5">
                        <NuxtLink to="/profile" class="flex-shrink-0">
                            <img
                                class="mx-auto h-20 w-20 rounded-full"
                                :src="displayAvatar"
                                alt="profile / avatar"
                            />
                        </NuxtLink>

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
