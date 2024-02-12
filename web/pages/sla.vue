<script setup lang="ts">
useHead({
    title: `Refunds — Nexa Rocks!`,
    meta: [
        { name: 'description', content: `The premiere token mining experience on Nexa.` }
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
            <section class="bg-purple-100 mx-auto max-w-7xl py-12 sm:px-2 lg:px-4 rounded-lg border-2 border-purple-300">
                <!-- <section class="overflow-hidden divide-y divide-gray-200 sm:divide-y-0"> -->
                <h2 class="sr-only" id="support-center-title">
                    Servcie Level Agreement
                </h2>

                <div class="">
                    <h2 class="text-2xl text-gray-500">
                        We Believe Customer Satisfaction Comes First
                    </h2>

                    <h1 class="text-5xl">
                        Hashing Guarantee!
                    </h1>

                    <p class="mt-5 text-lg">
                        Rest easy and know that you can ALWAYS cancel your contract for a FULL refund within the first week of mining.
                    </p>

                    <p class="mt-5 text-lg">
                        We understand that sometimes our customers needs can change quickly.
                        That's why we offer you the flexibility to cancel and return your unwanted coins for a full refund.
                    </p>

                    <h2 class="mt-5 text-2xl text-red-500 font-medium">
                        Important Notice
                    </h2>

                    <p class="mt-3 text-lg">
                        In order to <a class="text-blue-500 font-medium hover:underline" href="javascript://">comply with AML regulations</a>, we first require receipt of <span class="font-medium">ALL UTXOs</span> generated from the Cloud Mining contract <span class="font-medium">BEFORE</span> we can proceed to process your refund.
                    </p>

                    <p class="mt-5 text-lg">
                        Please visit our <NuxtLink to="/help" class="text-blue-500 font-medium hover:underline">Support Center</NuxtLink> for help with managing your wallet's UTXOs.
                    </p>

                    <p class="mt-3 text-lg">
                        In order to discourage platform abuse, we first require <span class="font-medium">KYC verification</span> from our 3rd-party vendor <a class="text-blue-500 font-medium hover:underline" href="https://www.veriff.com/" target="_blank">Veriff</a> <span class="font-medium">BEFORE</span> we can proceed to process your refund.
                    </p>
                </div>
            </section>
        </section>

        <Footer />
    </main>
</template>
