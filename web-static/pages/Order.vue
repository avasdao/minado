<template>
    <main class="min-h-full">
        <HeaderView />

        <OrderFullView />

        <FooterView />
    </main>
</template>

<script>
export default {
    middleware: 'magic.auth',
    head: () => ({
        title: 'Order Mining Contracts — Nexa Rocks!',
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
