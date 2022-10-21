<template>
    <div
        v-if="panelIsVisible"
        class="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
    >
        <!-- Background backdrop. -->
        <div
            class="fixed inset-0 bg-gray-800 transform transition ease-in-out duration-500"
            :class="[ panelIsOpen ? 'opacity-80' : 'opacity-0' ]"
        ></div>

        <div class="fixed inset-0 overflow-hidden">
            <div
                @click="closePanel()"
                class="absolute inset-0 overflow-hidden"
            >
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                    <div
                        @click.stop="noop()"
                        class="pointer-events-auto w-screen max-w-2xl transform transition ease-in-out duration-500 sm:duration-700"
                        :class="[ panelIsOpen ? 'translate-x-0' : 'translate-x-full' ]"
                    >
                        <!-- FIXME: Should we "always" show the vertical scrollbar? -->
                        <!-- <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"> -->
                        <div class="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                            <div class="px-4 py-6 sm:px-6">
                                <div class="flex items-start justify-between">
                                    <h1 class="text-3xl font-medium text-yellow-900">
                                        {{displayTitle}}
                                    </h1>

                                    <div class="ml-3 flex h-7 items-center">
                                        <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-yellow-500">
                                            <span class="sr-only">Close panel</span>
                                            <svg class="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                @click="closePanel"
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <section class="p-5 mr-2">
                                <SidePanelAddressView v-if="panelTab === 'address'" />
                                <SidePanelArbitrageView v-if="panelTab === 'arbitrage'" />
                                <SidePanelHelpView v-if="panelTab === 'help'" />
                                <SidePanelMiningView v-if="panelTab === 'mining'" />
                                <SidePanelReferralsView v-if="panelTab === 'referrals'" />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters({
            panelIsOpen: 'system/getPanelState',
            panelIsVisible: 'system/getPanelVisibility',
            panelTab: 'system/getPanelTab'
        }),

        displayTitle () {
            switch (this.panelTab) {
            case 'address':
                return 'Address Dashboard'
            case 'arbitrage':
                return 'Arbitrage Portal'
            case 'help':
                return 'Support Center'
            case 'mining':
                return 'Web Mining Center'
            case 'referrals':
                return 'Referrals Manager'
            default:
                return 'Unknown Panel'
            }
        }
    },
    methods: {
        noop () {},

        closePanel () {
            this.$store.dispatch('system/closePanel')
        },

        openPanel () {
            this.$store.dispatch('system/openPanel')
        },

        togglePanel () {
            if (this.panelIsOpen) {
                this.closePanel()
            } else {
                this.openPanel()
            }
        }
    },
    created: function () {
        // console.log('SIDE PANEL (panelIsVisible):', this.panelIsVisible)
    },
    mounted: function () {
        document.onkeydown = (evt) => {
            evt = evt || window.event
            let isEscape = false

            if ('key' in evt) {
                isEscape = (evt.key === 'Escape' || evt.key === 'Esc')
            } else {
                isEscape = (evt.keyCode === 27)
            }

            if (isEscape) {
                this.closePanel()
            }
        }
    }
}
</script>
