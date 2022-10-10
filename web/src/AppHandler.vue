<template>
    <main>
        <h1>App Handler</h1>

        <h2 class="text-xl font-medium">{{shortcutid}}</h2>

    </main>
</template>

<script>
export default {
    data: () => ({
        shortcutid: null,
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        let route
        let params

        /* Set route. */
        route = this.$route

        /* Validate route. */
        if (route) {
            params = route.params
            console.log('PARAMS', params)
        }

        /* Validate shortcut id. */
        if (params && params.shortcutid) {
            this.shortcutid = params.shortcutid
        }
    },
    mounted: function () {
        //
    },
}
</script>
