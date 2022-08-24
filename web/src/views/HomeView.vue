<template>
    <!--
      This example requires updating your template:

      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    -->
    <main class="min-h-full">
        <HeaderView />

        <main class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">Profile</h1>
                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <!-- Left column -->
                    <div class="grid grid-cols-1 gap-4 lg:col-span-2">
                        <WelcomeView />

                        <ActivityPanel />
                    </div>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <BlockRewards />

                        <RecentPayouts />
                    </div>
                </div>
            </div>
        </main>

        <FooterView />
    </main>
</template>

<script>
/* Import components. */
import ActivityPanel from '@/components/ActivityPanel'
import BlockRewards from '@/components/BlockRewards'
import FooterView from '@/components/FooterView'
import HeaderView from '@/components/HeaderView'
import RecentPayouts from '@/components/RecentPayouts'
import WelcomeView from '@/components/WelcomeView'

export default {
    components: {
        ActivityPanel,
        BlockRewards,
        FooterView,
        HeaderView,
        RecentPayouts,
        WelcomeView,
    }
}
</script>
