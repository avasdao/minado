<script setup lang="ts">
useHead({
    title: `Address — Nexa Rocks!`,
    meta: [
        { name: 'description', content: `The premiere token mining experience on Nexa.` }
    ],
})

const Router = useRouter()

const route = useRoute()
console.log('ROUTE PARAMS', route.params)

const address = route.params.address
console.log('ADDRESS', address)

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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Address
        </h1>

        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eius voluptatem minus natus at eveniet dolorum eos mollitia, maxime animi excepturi harum omnis illum odit recusandae pariatur! Unde, explicabo molestias.
        </p>

        {{address}}
    </main>

    <Footer />
</template>
