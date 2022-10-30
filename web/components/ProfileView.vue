<template>
    <main>
        <div class="pb-6">
            <div class="h-24 bg-yellow-400 sm:h-20 lg:h-28"></div>

            <div class="-mt-16 sm:-mt-10 lg:-mt-20 flow-root px-4 sm:flex sm:items-end sm:px-6">
                <div>
                    <div class="-m-1 flex">
                        <div class="inline-flex overflow-hidden rounded-lg border-4 border-white">
                            <img
                                class="h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                                src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div class="mt-6 sm:ml-6 sm:flex-1">
                    <div>
                        <div class="flex items-center">
                            <h3 class="text-xl font-medium text-gray-700 sm:text-2xl">
                                {{firstName}} {{lastName}}
                            </h3>
                            <span class="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400 animate-ping">
                                <span class="sr-only">Online</span>
                            </span>
                        </div>
                        <p class="text-sm text-gray-500">
                            {{nickname}}
                        </p>
                    </div>

                    <div class="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                        <button
                            type="button"
                            class="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:flex-1"
                        >
                            Message
                        </button>

                        <button
                            type="button"
                            class="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                        >
                            Call
                        </button>

                        <div class="ml-3 inline-flex sm:ml-0">
                            <div class="relative inline-block text-left">
                                <button
                                    type="button"
                                    class="inline-flex items-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                    id="options-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span class="sr-only">Open options menu</span>
                                    <!-- Heroicon name: mini/ellipsis-vertical -->
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                    </svg>
                                </button>

                                <!--
        Dropdown panel, show/hide based on dropdown state.

        Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    -->
                                <div
                                    class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu-button"
                                    tabindex="-1"
                                >
                                    <div class="py-1" role="none">
                                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                        <a href="javascript://" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="options-menu-item-0">
                                            View profile
                                        </a>

                                        <a href="javascript://" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="options-menu-item-1">
                                            Copy profile link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 py-5 sm:px-0 sm:py-0">
            <dl class="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                <div class="sm:flex sm:px-6 sm:py-5">
                    <dt class="space-y-3 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                        <h1 class="text-3xl text-gray-400">
                            Bio
                        </h1>

                        <p class="text-sm text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        <p class="text-sm text-gray-500">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </dt>

                    <dd class="w-full mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                        <SkeletonList />

                        <highchart
                            :options="chartOptions"
                            :modules="['exporting']"
                            :update="watchers"
                            style="width:100%;"
                        />
                    </dd>
                </div>

                <div class="sm:flex sm:px-6 sm:py-5">
                    <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                        My Accounts
                    </dt>

                    <dd class="mt-1 flex flex-col sm:col-span-2 sm:mt-0 sm:ml-6">
                        <a href="javascript://" class="text-base text-blue-500 font-medium hover:underline">
                            {{display0xAddress}}
                        </a>

                        <small>Magic.Link <em>(default)</em></small>
                    </dd>
                </div>

                <div class="sm:flex sm:px-6 sm:py-5">
                    <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                        Joined Since
                    </dt>

                    <dd class="mt-1 text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                        <span class="text-base ">
                            June 21, 2022

                            <em class="text-sm">
                                (3 months ago)
                            </em>
                        </span>
                    </dd>
                </div>
            </dl>
        </div>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        firstName: null,
        lastName: null,
        nickname: null
    }),
    computed: {
        ...mapGetters({
            // panelIsShowing: 'system/getPanelState'
        }),

        display0xAddress () {
            if (!this.$store.state.profile.user) {
                return 'n/a'
            }

            return this.$store.state.profile.user.publicAddress
        }
    },
    methods: {
        //
    },
    created: function () {
        this.firstName = 'Ava'
        this.lastName = 'Nakamoto'
        this.nickname = '@anak'
    },
    mounted: function () {
        //
    }
}
</script>
