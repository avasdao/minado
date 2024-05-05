<template>
    <main class="min-h-full">
        <Header />

        <OrderFullView />

        <Footer />
    </main>
</template>

<script>
export default {
    middleware: 'magic.auth',
    head: () => ({
        title: 'Order Mining Contracts — Minado',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
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
    }
}
</script>
