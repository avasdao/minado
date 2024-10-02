<script setup lang="ts">
definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Admin — Minado`,
    meta: [
        { name: 'description', content: `Minado is the leader in CPU & GPU token mining of crypto assets.` }
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
            <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Admin Center
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="col-span-2 grid grid-cols-2 gap-5">
                        <NuxtLink to="/admin/profiles" class="p-3 bg-pink-200 border-4 border-pink-400 rounded-xl cursor-pointer hover:bg-pink-300">
                            <h1 class="text-3xl font-bold">
                                Profiles
                            </h1>
                        </NuxtLink>

                        <NuxtLink to="/admin/orders" class="p-3 bg-pink-200 border-4 border-pink-400 rounded-xl cursor-pointer hover:bg-pink-300">
                            <h1 class="text-3xl font-bold">
                                Orders
                            </h1>
                        </NuxtLink>

                        <NuxtLink to="/admin/miners" class="p-3 bg-pink-200 border-4 border-pink-400 rounded-xl cursor-pointer hover:bg-pink-300">
                            <h1 class="text-3xl font-bold">
                                Miners
                            </h1>
                        </NuxtLink>

                        <NuxtLink to="/admin/servers" class="p-3 bg-pink-200 border-4 border-pink-400 rounded-xl cursor-pointer hover:bg-pink-300">
                            <h1 class="text-3xl font-bold">
                                Servers
                            </h1>
                        </NuxtLink>

                        <NuxtLink to="/admin/notifs" class="p-3 bg-pink-200 border-4 border-pink-400 rounded-xl cursor-pointer hover:bg-pink-300">
                            <h1 class="text-3xl font-bold">
                                Notifications
                            </h1>
                        </NuxtLink>

                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            class="mx-3 px-3 py-1 text-2xl text-yellow-100 font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                            @click="addProfile"
                        >
                            Add New Profile
                        </button>

                        <AdminProfilesList :profiles="profiles" />

                        <BlockRewardsPanel />
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>
