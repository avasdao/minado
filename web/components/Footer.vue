<template>
    <main>
        <div class="flex flex-col sm:flex-row justify-between border-t border-gray-200 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div class="flex-col sm:flex-row py-8 text-sm text-gray-500 text-center sm:text-left">
                <span class="block sm:inline mr-1">
                    &copy; {{new Date().getFullYear()}} Minado
                </span>

                <span class="block sm:inline">
                    All rights reserved.
                </span>
            </div>

            <div class="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-right">
                <NuxtLink to="/guarantee">
                    100% Money-back Guarantee!
                </NuxtLink>
            </div>
        </div>

        <SidePanel />
    </main>
</template>

<script>
export default {
    data: () => ({
        //
    }),
    methods: {
        //
    },
    created: function () {
        // NOTE: This is a fail-safe to prevent the entire UI from
        //       being blocked by the side panel's background overlay.
        // this.$store.dispatch('system/closePanel')
    },
    mounted: function () {
        //
    }
}
</script>
