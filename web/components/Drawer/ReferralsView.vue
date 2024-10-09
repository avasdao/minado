<template>
    <main class="px-3 py-2 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
        <div>
            <span class="ml-3 text-sm uppercase font-bold text-yellow-600">
                My Referral ID
            </span>

            <input
                class="px-3 py-1 block bg-yellow-200 text-2xl rounded-lg"
                type="text"
                :value="referralid"
                disabled
            />

            <ol class="pl-5 pt-3 list-disc list-inside">
                <li class="text-yellow-600">
                    https://minado.io/<span class="text-red-500 font-medium">{{referralid}}</span>
                </li>

                <li class="text-yellow-600">
                    https://minado.io/<span class="text-yellow-800 italic">&lt;page-name-or-location&gt;</span>/<span class="text-red-500 font-medium">{{referralid}}</span>
                </li>
            </ol>

        </div>

        <p class="text-yellow-900">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aliquam maiores animi iusto est laborum quas dolore assumenda voluptate quis! Quaerat corrupti enim autem iusto voluptates dolorum quae voluptate eligendi.
        </p>
    </main>
</template>

<script>
export default {
    data: () => ({
        referralid: null
    }),
    methods: {
        //
    },
    created: function () {
        this.referralid = 'ab12c3'
    },
    mounted: function () {
        //
    }
}
</script>
