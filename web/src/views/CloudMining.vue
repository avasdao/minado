<template>
    <main class="-mt-24 pb-8">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="sr-only">Cloud Mining</h1>

            <!-- Main 3 column grid -->
            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <section class="p-5 col-span-2 bg-yellow-100 border-2 border-yellow-300 rounded-lg shadow">
                    <p class="text-yellow-800">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aliquam maiores animi iusto est laborum quas dolore assumenda voluptate quis! Quaerat corrupti enim autem iusto voluptates dolorum quae voluptate eligendi.
                    </p>
                </section>

                <!-- Right column -->
                <div class="grid grid-cols-1 gap-4">
                    <PayoutsPanel />

                    <BlockRewardsPanel />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import components. */
import BlockRewardsPanel from '@/components/BlockRewardsPanel'
import PayoutsPanel from '@/components/PayoutsPanel'

export default {
    components: {
        BlockRewardsPanel,
        PayoutsPanel,
    },
}
</script>
