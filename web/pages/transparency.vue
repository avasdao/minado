<template>
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Transparency
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            Transparency
                        </h1>

                        <p class="text-yellow-900">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aliquam maiores animi iusto est laborum quas dolore assumenda voluptate quis! Quaerat corrupti enim autem iusto voluptates dolorum quae voluptate eligendi.
                        </p>
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <PayoutsBlock />

                        <BlockRewardsPanel />
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-white py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
                    <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                        <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
                            <p class="text-xl leading-8 text-gray-600">
                                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend
                                egestas fringilla sapien.
                            </p>
                            <p class="mt-10 max-w-xl text-base leading-7 text-gray-700">
                                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat
                                velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                            </p>
                        </div>
                        <div class="lg:flex lg:flex-auto lg:justify-center">
                            <dl class="w-64 space-y-8 xl:w-80">
                                <div class="flex flex-col-reverse gap-y-4">
                                    <dt class="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
                                    <dd class="text-5xl font-semibold tracking-tight text-gray-900">44 million</dd>
                                </div>
                                <div class="flex flex-col-reverse gap-y-4">
                                    <dt class="text-base leading-7 text-gray-600">Assets under holding</dt>
                                    <dd class="text-5xl font-semibold tracking-tight text-gray-900">$119 trillion</dd>
                                </div>
                                <div class="flex flex-col-reverse gap-y-4">
                                    <dt class="text-base leading-7 text-gray-600">New users annually</dt>
                                    <dd class="text-5xl font-semibold tracking-tight text-gray-900">46,000</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
export default {
    data: () => ({
        //
    }),
    head: () => ({
        title: 'Transparency — Nexa Rocks!',
        meta: [
            {
                hid: 'description', // `vmid` for it as it will not work
                name: 'description',
                content: 'TBD..'
            }
        ]
    }),
    created: function () {
        //
    },
    mounted: function () {
        //
    },
    methods: {
        //
    }
}
</script>
