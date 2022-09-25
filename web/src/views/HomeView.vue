<template>
    <!-- Left column -->
    <div class="grid grid-cols-1 gap-4 lg:col-span-2">
        <WelcomePanel />

        <ActivityPanel />
    </div>
</template>

<script>
/* Import components. */
import ActivityPanel from '@/components/ActivityPanel'
import WelcomePanel from '@/components/WelcomePanel'

export default {
    components: {
        ActivityPanel,
        WelcomePanel,
    }
}
</script>
