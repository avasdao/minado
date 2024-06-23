<script setup lang="ts">
useHead({
    title: `Register A Project — Minado`,
    meta: [
        { name: 'description', content: `Register a new $TOKEN project on the Minado platform for CPU and/or GPU token mining to community participants.` }
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
    <main class="-mt-48 pb-8 max-w-3xl mx-auto lg:max-w-7xl">
        <h1 class="sr-only">Register A Project</h1>

        <!-- Main 3 column grid -->
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            <section class="col-span-2">
                <!-- <SoloMining /> -->

                <section class="px-3 py-2 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                    <h1 class="text-4xl font-bold text-yellow-900">
                        Register A Project
                    </h1>

                    <h2 class="pt-5 text-3xl">
                        Introduction
                    </h2>

                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eius voluptatem minus natus at eveniet dolorum eos mollitia, maxime animi excepturi harum omnis illum odit recusandae pariatur! Unde, explicabo molestias.
                    </p>

                    <ul class="pl-10 list-disc">
                        <li>500 $AVAS staked <span class="italic">(one-time)</span></li>
                        <li>1% asset mining fee</li>
                    </ul>
                </section>
            </section>

            <!-- Right column -->
            <div class="grid grid-cols-1 gap-4">
                <PayoutsBlock />

                <BlockRewardsPanel />
            </div>
        </div>
    </main>
</template>
