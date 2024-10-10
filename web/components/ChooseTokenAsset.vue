<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

const enableAvas = () => {
    if (confirm('Would you like to take a moment and learn how YOU CAN HELP to enable $AVAS mining in Minado?')) {
        window.open('https://avas.cash/bootstrap')
    }
}

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
    <main>
        <legend class="pl-3 text-xs font-medium tracking-widest text-gray-400 uppercase">
            Choose A Token Asset For Mining
        </legend>

        <div class="mt-3 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            <!-- Active: "border-sky-600 ring-2 ring-sky-600", Not Active: "border-gray-300" -->
            <label @click.prevent="enableAvas" aria-label="Nexa Core" aria-description="Last activity was an hour ago to 621 users" class="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none">
                <input type="radio" name="project-type" value="Nexa Core" class="sr-only" />
                <span class="flex flex-1">
                    <span class="flex flex-col">
                        <span class="block text-lg font-medium text-gray-700 tracking-tighter">
                            Ava's Cash
                            <small class="text-xs opacity-50">$AVAS</small>
                        </span>

                        <span class="mt-1 flex items-center text-sm text-gray-500">
                            Last activity was an hour ago
                        </span>

                        <span class="mt-6 text-xs font-medium text-gray-500">
                            1M $CRYSTAL per block
                        </span>
                    </span>
                </span>
                <!-- Not Checked: "invisible" -->
                <svg class="invisible h-7 w-auto text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
                <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-sky-600", Not Checked: "border-transparent"
          -->
                <span class="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent" aria-hidden="true"></span>
            </label>

            <!-- Active: "border-sky-600 ring-2 ring-sky-600", Not Active: "border-gray-300" -->
            <label aria-label="Nxy Supernet" aria-description="Last activity was 2 weeks ago to 1200 users" class="relative flex cursor-pointer rounded-lg border border-sky-600 ring-2 ring-sky-600 bg-white p-4 shadow-sm focus:outline-none">
                <input type="radio" name="project-type" value="Nxy Supernet" class="sr-only" />
                <span class="flex flex-1">
                    <span class="flex flex-col">
                        <span class="block text-lg font-medium text-gray-700 tracking-tighter">
                            Nxy Cash
                            <small class="text-xs opacity-50">$NXY</small>
                        </span>

                        <span class="mt-1 flex items-center text-sm text-gray-500">
                            Last activity was 4 days ago
                        </span>

                        <span class="mt-6 text-xs font-medium text-gray-500">
                            100K $CRYSTAL per block
                        </span>
                    </span>
                </span>
                <!-- Not Checked: "invisible" -->
                <svg class="h-7 w-auto text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
                <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-sky-600", Not Checked: "border-transparent"
          -->
                <span class="pointer-events-none absolute -inset-px rounded-lg border border-sky-600" aria-hidden="true"></span>
            </label>

            <!-- Active: "border-sky-600 ring-2 ring-sky-600", Not Active: "border-gray-300" -->
            <label aria-label="Nxy MetaNet" aria-description="Last activity was 4 days ago to 2740 users" class="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none">
                <input type="radio" name="project-type" value="Nxy MetaNet" class="sr-only" />
                <span class="flex flex-1">
                    <span class="flex flex-col">
                        <span class="block text-lg font-medium text-gray-700 tracking-tighter">
                            Agnar
                            <small class="text-xs opacity-50">$AGNAR</small>
                        </span>

                        <span class="mt-1 flex items-center text-sm text-gray-500">
                            There is NO activity recorded yet
                        </span>

                        <span class="mt-6 text-xs font-medium text-gray-500">
                            10K $CRYSTAL per block
                        </span>
                    </span>
                </span>
                <!-- Not Checked: "invisible" -->
                <svg class="invisible h-7 w-auto text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
                <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-sky-600", Not Checked: "border-transparent"
          -->
                <span class="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent" aria-hidden="true"></span>
            </label>
        </div>
    </main>
</template>
