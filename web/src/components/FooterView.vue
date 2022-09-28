<template>
    <main>
        <div class="flex flex-row justify-between max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div class="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
                <span class="block sm:inline">
                    &copy; {{new Date().getFullYear()}} Nexa Rocks!
                </span>

                <span class="block sm:inline">
                    All rights reserved.
                </span>
            </div>

            <div class="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-right">
                <router-link to="/guarantee">
                    Money-back Guarantee!
                </router-link>
            </div>
        </div>
    </main>
</template>

<script>
export default {
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
