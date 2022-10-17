<template>
    <main class="h-full overflow-y-auto bg-white p-8">
        <div class="space-y-6 pb-16">
            <div>
                <div class="grid grid-cols-2 gap-5 aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
                    <img
                        src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                        alt=""
                        class="object-cover w-full h-32"
                    />

                    <img
                        src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt=""
                        class="object-cover w-full h-32"
                    />
                </div>

                <button @click="loadAddress" class="text-xl text-blue-500 font-medium hover:underline">
                    {{address}}
                </button>

                <highchart
                    :options="chartOptions"
                    :modules="['exporting']"
                    :update="watchers"
                    style="width:100%;"
                />

                <pre class="bg-pink-200 border-4 border-pink-400 rounded-lg">{{JSON.stringify(metadata, null, 2)}}</pre>

                <div class="mt-4 flex items-start justify-between">
                    <div>
                        <h2 class="text-lg font-medium text-gray-900"><span class="sr-only">Details for </span>IMG_4985.HEIC</h2>
                        <p class="text-sm font-medium text-gray-500">3.9 MB</p>
                    </div>
                    <button type="button" class="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <!-- Heroicon name: outline/heart -->
                        <svg class="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                        <span class="sr-only">Favorite</span>
                    </button>
                </div>
            </div>
            <div>
                <h3 class="font-medium text-gray-900">Information</h3>
                <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                    <div class="flex justify-between py-3 text-sm font-medium">
                        <dt class="text-gray-500">Uploaded by</dt>
                        <dd class="text-gray-900">Marie Culver</dd>
                    </div>
                    <div class="flex justify-between py-3 text-sm font-medium">
                        <dt class="text-gray-500">Created</dt>
                        <dd class="text-gray-900">June 8, 2020</dd>
                    </div>
                    <div class="flex justify-between py-3 text-sm font-medium">
                        <dt class="text-gray-500">Last modified</dt>
                        <dd class="text-gray-900">June 8, 2020</dd>
                    </div>
                    <div class="flex justify-between py-3 text-sm font-medium">
                        <dt class="text-gray-500">Dimensions</dt>
                        <dd class="text-gray-900">4032 x 3024</dd>
                    </div>
                    <div class="flex justify-between py-3 text-sm font-medium">
                        <dt class="text-gray-500">Resolution</dt>
                        <dd class="text-gray-900">72 x 72</dd>
                    </div>
                </dl>
            </div>
            <div>
                <h3 class="font-medium text-gray-900">Description</h3>
                <div class="mt-2 flex items-center justify-between">
                    <p class="text-sm italic text-gray-500">Add a description to this image.</p>
                    <button type="button" class="-mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <!-- Heroicon name: mini/pencil -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                        </svg>
                        <span class="sr-only">Add description</span>
                    </button>
                </div>
            </div>
            <div>
                <h3 class="font-medium text-gray-900">Shared with</h3>
                <ul role="list" class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                    <li class="flex items-center justify-between py-3">
                        <div class="flex items-center">
                            <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80" alt="" class="h-8 w-8 rounded-full" />
                            <p class="ml-4 text-sm font-medium text-gray-900">Aimee Douglas</p>
                        </div>
                        <button type="button" class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Remove<span class="sr-only"> Aimee Douglas</span>
                        </button>
                    </li>
                    <li class="flex items-center justify-between py-3">
                        <div class="flex items-center">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                                class="h-8 w-8 rounded-full"
                            />
                            <p class="ml-4 text-sm font-medium text-gray-900">Andrea McMillan</p>
                        </div>
                        <button type="button" class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Remove<span class="sr-only"> Andrea McMillan</span>
                        </button>
                    </li>
                    <li class="flex items-center justify-between py-2">
                        <button type="button" class="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                                <!-- Heroicon name: mini/plus -->
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                </svg>
                            </span>
                            <span class="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">Share</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="flex">
                <button
                    type="button"
                    class="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Download
                </button>
                <button
                    type="button"
                    class="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Delete
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'

export default {
    data: () => ({
        metadata: null,

        caption: 'Chart caption here',
        title: 'Basic Chart',
        subtitle: 'More details here',
        points: [10, 0, 8, 2, 6, 4, 5, 5],
        seriesColor: '',
        animationDuration: 1000,
        chartType: '',
        colorInputIsSupported: null,
        chartTypes: [],
        durations: [0, 500, 1000, 2000],
        seriesName: 'My Data',
        yAxis: 'My Values',
        watchers: [
            'options.title',
            'options.series'
        ],
        colors: [
            'Red',
            'Green',
            'Blue',
            'Pink',
            'Orange',
            'Brown',
            'Black',
            'Purple'
        ],
        lastPointClicked: {
            timestamp: '',
            x: '',
            y: ''
        },
        sexy: false
    }),
    computed: {
        ...mapGetters({
            address: 'system/getPanelMetadata'
        }),

        chartOptions () {
            const ctx = this
            return {
                caption: {
                    text: this.caption,
                    style: {
                        color: this.sexy ? this.invertedColor(0) : '#black'
                    }
                },
                chart: {
                    backgroundColor: this.sexy
                        ? {
                            linearGradient: {
                                x1: 0,
                                x2: 0,
                                y1: 0,
                                y2: 1
                            },
                            stops: [
                                [0, this.seriesColor],
                                [0.5, '#ffffff'],
                                [1, this.seriesColor]
                            ]
                        }
                        : '#ffffff',
                    className: 'my-chart',
                    type: this.chartType ? this.chartType.toLowerCase() : null
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click () {
                                    ctx.$emit('pointClicked', this)
                                }
                            }
                        }
                    }
                },
                yAxis: [{
                    title: {
                        text: this.yAxis,
                        style: {
                            color: '#000000'
                        }
                    }
                }],
                title: {
                    style: {
                        color: this.sexy ? this.invertedColor(0) : '#black'
                    },
                    text: `${this.title} ` +
                        (this.lastPointClicked.timestamp !== ''
                            ? `(Point clicked: ${this.lastPointClicked.timestamp})`
                            : '')
                },
                subtitle: {
                    style: {
                        color: this.sexy ? this.invertedColor(0) : '#black'
                    },
                    text: `${this.subtitle}`
                },
                legend: {
                    itemStyle: {
                        color: this.sexy ? this.invertedColor(0) : '#black'
                    }
                },
                series: [{
                    name: this.seriesName,
                    data: this.points,
                    color: this.seriesColor
                }]
            }
        }
    },
    created: function () {
        this.init()

        this.$store.dispatch('rostrum/init')
    },
    mounted: function () {
        //
    },
    methods: {
        loadAddress () {
            this.$store.dispatch('system/closePanel')

            this.$router.push(this.address)
        },

        async init () {
            let request

            this.txDetails = {}
            this.parsedHistory = []

            this.metadata = await this.$utils.validateAddress(this.address)
            console.log('ADDRESS METADATA', this.metadata)

            const scriptPubkey = this.metadata.hex
            console.log('scriptPubkey', scriptPubkey)

            const scriptHash = this.$utils.getScriptHash(scriptPubkey)
            console.log('SCRIPT HASH', scriptHash)

            request = {
                method: 'blockchain.scripthash.get_balance',
                params: [scriptHash]
            }
            const balance = await this.$store.dispatch('rostrum/makeRequest', request)
            console.log('REQUESTED BALANCE', balance)

            this.balance = balance

            request = {
                method: 'blockchain.scripthash.get_history',
                params: [scriptHash]
            }
            const history = await this.$store.dispatch('rostrum/makeRequest', request)
            console.log('REQUESTED TX HISTORY', history)

            const final = []

            history.forEach(async (_tx) => {
                const txid = _tx.tx_hash
                const details = await this.getTxDetails(txid)
                final.push({
                    txid,
                    ..._tx,
                    ...details
                })
            })

            this.txHistory = final
        },

        async getTxDetails (_txHash) {
            const request = {
                method: 'blockchain.transaction.get',
                params: [_txHash, true]
            }
            const txDetails = await this.$store.dispatch('rostrum/makeRequest', request)
            // console.log('TX DETAILS', this.txDetails)

            return txDetails
        },

        timeAgo (_timestamp) {
            return `${moment.unix(_timestamp).fromNow()} -- ${moment.unix(_timestamp).format('lll')}`
        }
    }
}
</script>
