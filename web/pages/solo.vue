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
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto lg:max-w-7xl">
                <h1 class="sr-only">Solo Mining</h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="col-span-2">
                        <SoloMining />
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
