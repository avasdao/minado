<template>
    <main class="-mt-24 pb-8">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="sr-only">Nexa Rocks Dashboard</h1>

            <!-- Main 3 column grid -->
            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <section class="col-span-2">
                    <WelcomePanel />

                    <ActivityPanel />
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
import ActivityPanel from '@/components/ActivityPanel'
import WelcomePanel from '@/components/WelcomePanel'
import BlockRewardsPanel from '@/components/BlockRewardsPanel'
import PayoutsPanel from '@/components/PayoutsPanel'

export default {
    components: {
        ActivityPanel,
        WelcomePanel,
        BlockRewardsPanel,
        PayoutsPanel,
    },
}
</script>
