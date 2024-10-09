<template>
    <main aria-labelledby="recent-hires-title">
        <div class="rounded-lg bg-white overflow-hidden shadow">
            <div class="p-6">
                <h2 class="text-xl font-medium text-gray-900" id="recent-hires-title">
                    Mining Shares
                </h2>

                <div class="flow-root mt-6">
                    <ul role="list" class="-my-5 divide-y divide-gray-200">

                        <li class="py-4" v-for="share of displayShares" :key="share.hash">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0">
                                    {{displayBits(share.pow)}}
                                </div>

                                <div class="flex-1 min-w-0">
                                    <p class="text-base font-medium text-gray-900 truncate">
                                        {{share.hash}}
                                    </p>

                                    <p class="text-xs text-gray-500 truncate italic">
                                        Hash Power is
                                        <span class="text-lg text-rose-500 font-bold">
                                            {{calcPower(share.pow, share.hash)}}
                                        </span>
                                        <span class="text-sm text-gray-500 font-medium">
                                            in
                                            {{calcTotal(share.pow, share.target)}}
                                        </span>
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
/* Import modules. */
import numeral from 'numeral'

export default {
    props: {
        shares: Array
    },
    data: () => ({
        payouts: null
    }),
    computed: {
        displayShares () {
            /* Validate shares. */
            if (!this.shares) {
                return []
            }

            /* Clone shares (for mutation). */
            const shares = [...this.shares]

            /* Return (display) shares. */
            return shares.reverse().slice(0, 5)
        }
    },
    methods: {
        displayBits (_difficulty) {
            if (!_difficulty) {
                return 'n/a'
            }

            return _difficulty.slice(0, 8)
        },

        calcPower (_pow, _hash) {
            const power = BigInt(`0x${_pow}`) / BigInt(`0x${_hash}`)
            return numeral(power).format('0,0')
        },

        calcTotal (_pow, _target) {
            const total = BigInt(`0x${_pow}`) / BigInt(`0x${_target}`)
            return numeral(total).format('0,0[.]0a')
        }
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    }
}
</script>
