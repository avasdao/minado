<template>
    <main class="grid grid-cols-1 gap-4 lg:col-span-2">
        <section aria-labelledby="profile-overview-title">
            <div class="rounded-lg bg-white overflow-hidden shadow">
                <h2 class="sr-only" id="profile-overview-title">Support Center</h2>

                <div class="bg-white p-6">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <div class="sm:flex sm:space-x-5">
                            <div class="flex-shrink-0">
                                <img
                                    class="mx-auto h-20 w-20 rounded-full"
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </div>
                            <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p class="text-sm font-medium text-gray-600">Support Center</p>
                                <p class="text-xl font-bold text-gray-900 sm:text-2xl">Support Center</p>
                                <p class="text-sm font-medium text-gray-600">NEXA Premier Mining Pool</p>
                            </div>
                        </div>
                        <div class="mt-5 flex justify-center sm:mt-0">
                            <a href="javascript://" @click="test" class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-lg font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
                                Start Web Mining
                            </a>
                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                    <div class="flex flex-col px-6 py-5 text-sm font-medium text-center">
                        <span class="text-2xl text-green-500">
                            30,226 H/s
                        </span>

                        <span class="text-gray-600">
                            Your Hash Rate
                        </span>

                        <hr class="my-2" />

                        <span class="text-base text-gray-900">
                            1.2MH/s
                        </span>

                        <span class="text-xs text-gray-600">
                            Pool Hash Rate
                        </span>
                    </div>

                    <div class="flex flex-col px-6 py-5 text-sm font-medium text-center">
                        <span class="text-2xl text-red-500">
                            4
                        </span>

                        <span class="text-gray-600">
                            Your Active Miners
                        </span>

                        <hr class="my-2" />

                        <span class="text-base text-gray-900">
                            42
                        </span>

                        <span class="text-xs text-gray-600">
                            Active Pool Miners
                        </span>
                    </div>

                    <div class="flex flex-col px-6 py-5 text-sm font-medium text-center">
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

                <div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                    <div class="flex flex-col px-6 py-5 text-sm font-medium text-center">
                        <span class="text-2xl text-green-500">
                            $0.0125
                        </span>

                        <span class="text-gray-600">
                            Mining Value Per Million (MVPM)
                        </span>
                    </div>

                    <div class="flex flex-col px-6 py-5 text-sm font-medium text-center">
                        <span class="text-2xl text-green-500">
                            n/a
                        </span>

                        <span class="text-gray-600">
                            Exchange Value Per Million (EVPM)
                        </span>
                    </div>
                </div>

            </div>
        </section>

        <section aria-labelledby="quick-links-title">
            <div class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0">
                <h2 class="sr-only" id="quick-links-title">
                    Pool Mining links
                </h2>

                <div class="bg-white p-6">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate debitis aut exercitationem quas enim eaque. Ipsam saepe, sunt cum debitis, est illum assumenda non laboriosam nesciunt aperiam labore optio officiis!
                </div>
            </div>
        </section>

    </main>
</template>

<script>
/* Import components. */
// import ActivityPanel from '@/components/ActivityPanel'
// import WelcomePanel from '@/components/WelcomePanel'

export default {
    components: {
        // ActivityPanel,
        // WelcomePanel,
    },
    data: () => ({
        //
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>
