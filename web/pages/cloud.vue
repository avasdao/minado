<script setup lang="ts">
useHead({
    title: `Cloud Mining — Nexa Rocks!`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">Cloud Mining</h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="px-3 py-2 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <div class="flex flex-row justify-between">
                            <div>
                                <h1 class="text-4xl font-bold text-yellow-900">
                                    Cloud Mining
                                </h1>

                                <p class="mt-3 text-yellow-900">
                                    If you're interested in mining $NEX coins, but dont' have the CPU <em>(hash)</em>power to Solo mine, then Cloud mining is perfect for you!
                                    You will earn a FULL share of each block reward <em>(10,000,000 NEX)</em>.
                                </p>
                            </div>

                            <img
                                src="~/assets/lottie/87192-money-cash-coin.gif"
                                class="ml-20 p-1 h-20 border-2 border-yellow-600 rounded-xl"
                            />
                        </div>

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

        <Footer />
    </main>
</template>
