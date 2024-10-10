<script setup lang="ts">
useHead({
    title: `Page Not Found (404) — Nexa Studio`,
    meta: [
        { name: 'description', content: `Nexa Studio makes building your next BIG idea effortless.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

/* Initialize route. */
const route = useRoute()

/* Set (not found) path. */
const path = route.params.notfound
console.log('NOT FOUND PATH', path)

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
    <main class="-mt-16 pb-8 flex flex-col gap-4">
        <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="sr-only">Page Not Found</h1>

            <section class="flex flex-col gap-6 leading-8">
                <h1 class="text-5xl font-light text-amber-300 tracking-widest">
                    Page Not Found
                </h1>

                <h3 class="text-xl font-bold tracking-widest">
                    ( {{path}} )
                </h3>

                <h1 class="text-5xl font-medium">

                </h1>

                <p class="w-2/3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsam pariatur explicabo eveniet neque natus, molestias corrupti tenetur rerum dolorem deleniti aliquam tempore porro aut a eum quas officiis mollitia!
                </p>

                <p class="w-2/3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsam pariatur explicabo eveniet neque natus, molestias corrupti tenetur rerum dolorem deleniti aliquam tempore porro aut a eum quas officiis mollitia!
                </p>

                <p class="w-2/3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsam pariatur explicabo eveniet neque natus, molestias corrupti tenetur rerum dolorem deleniti aliquam tempore porro aut a eum quas officiis mollitia!
                </p>

            </section>

            <!-- TODO -->
        </div>
    </main>
</template>
