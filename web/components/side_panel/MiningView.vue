<template>
    <main>
        <section class="bg-purple-100 mx-auto max-w-7xl py-12 sm:px-2 lg:px-4 rounded-lg border-2 border-purple-300">
        <!-- <section class="overflow-hidden divide-y divide-gray-200 sm:divide-y-0"> -->
            <h2 class="sr-only" id="support-center-title">
                Web Mining
            </h2>

            <div class="">
                <h2 class="text-3xl">
                    Earn FREE Nexa right now!
                </h2>

                <h1 class="text-5xl">
                    Start Web Mining
                </h1>

                <p class="mt-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate debitis aut exercitationem quas enim eaque. Ipsam saepe, sunt cum debitis, est illum assumenda non laboriosam nesciunt aperiam labore optio officiis!
                </p>
            </div>
        </section>

    </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters({
            // panelIsShowing: 'system/getPanelState'
        })
    },
    methods: {
        //
    },
    created: function () {
        // console.log('PROFILE PANEL (magic)', this.$magic)

        if (process.browser) {
            console.log('PROCESS (browser):', process)
        }

        if (process.server) {
            console.log('PROCESS (server):', process)
        }
    },
    mounted: function () {
        //
    }
}
</script>
