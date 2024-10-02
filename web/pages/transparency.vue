<script setup lang="ts">
useHead({
    title: `Transparency — Minado`,
    meta: [
        { name: 'description', content: `` }
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
        <section class="-mt-48 pb-8">
            <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Transparency
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="px-3 py-2 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            Transparency
                        </h1>

                        <p class="text-yellow-900">
                            Providing maximum transparency is paramount to our mission of building trust with our community of users.
                            Please contact us if you have any additional questions about the data collected and provided by Minado
                        </p>

                        <div class="bg-amber-800 py-24 sm:py-32 border-2 border-amber-600 rounded-xl shadow">
                            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                                <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                                    <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                                        <dt class="text-base leading-7 text-amber-400">Transactions every 24 hours</dt>
                                        <dd class="order-first text-5xl font-semibold tracking-tight text-white lg:text-4xl">44 million</dd>
                                    </div>
                                    <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                                        <dt class="text-base leading-7 text-amber-400">Assets under holding</dt>
                                        <dd class="order-first text-5xl font-semibold tracking-tight text-white lg:text-4xl">$119 trillion</dd>
                                    </div>
                                    <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                                        <dt class="text-base leading-7 text-amber-400">New users annually</dt>
                                        <dd class="order-first text-5xl font-semibold tracking-tight text-white lg:text-4xl">46,000</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <PayoutsBlock />

                        <BlockRewardsPanel />
                    </div>
                </div>
            </div>

        </section>
    </main>
</template>
