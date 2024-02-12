<script setup lang="ts">
useHead({
    title: `$ROCKS — Nexa Rocks!`,
    meta: [
        { name: 'description', content: `The premiere token mining experience on Nexa.` }
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
                <h1 class="sr-only">
                    ROCKS Tokens
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="px-3 py-2 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            $ROCKS
                        </h1>

                        <p class="text-yellow-900">
                            The native tokens for Nexa Rocks!
                        </p>

                        <h2 class="text-2xl text-gray-600 font-medium">
                            Why $ROCKS?
                        </h2>

                        <ol class="list-disc pl-10">
                            <!-- <li>Receive "spendable" $NEX with each payout</li> -->
                            <!-- <li>Receive daily interest payouts ONLY for "active" $ROCKS <em>(to discourage HODLing)</em></li> -->
                            <li>Vote on "public" pool proposals</li>
                        </ol>

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
