<script setup lang="ts">
useHead({
    title: `Solo Mining — Minado`,
    meta: [
        { name: 'description', content: `Learn how to setup and start solo mining Nexa (NEX) assets.` }
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
    <main class="-mt-20 pb-8 min-h-full">
        <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="sr-only">Solo Mining</h1>

            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <section class="px-3 py-2 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                    <SoloMining />
                </section>

                <!-- Right column -->
                <div class="grid grid-cols-1 gap-4">
                    <PayoutsBlock />

                    <BlockRewardsPanel />
                </div>
            </div>
        </div>
    </main>
</template>
