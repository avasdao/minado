<script setup lang="ts">
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
    <main class="-mt-24 pb-8">
        <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="sr-only">Minado Dashboard</h1>

            <!-- Main 3 column grid -->
            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <section class="col-span-2">
                    <WelcomePanel />

                    <ActivityPanel class="mt-5" />
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
