<template>
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    My Profile
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="px-3 py-2 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <ProfileView v-if="$store.state.profile.authenticated" />
                        <AuthView v-else />
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <PayoutsBlock />

                        <BlockRewardsPanel />
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
export default {
    head: () => ({
        title: 'My Profile — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    data: () => ({
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
    methods: {
        //
    },
    created: function () {
        console.log('PROFILE PANEL (magic)', this.$magic)
    },
    mounted: function () {
        //
    }
}
</script>
