<template>
    <main class="-mt-24 pb-8">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="sr-only">Referral Manager</h1>

            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                    <h1 class="text-4xl font-bold text-yellow-900">
                        Referral Manager
                    </h1>

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
                                https://nexa.rocks/<span class="text-red-500 font-medium">{{referralid}}</span>
                            </li>

                            <li class="text-yellow-600">
                                https://nexa.rocks/<span class="text-yellow-800 italic">&lt;page-name-or-location&gt;</span>/<span class="text-red-500 font-medium">{{referralid}}</span>
                            </li>
                        </ol>
                            
                    </div>

                    <p class="text-yellow-900">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aliquam maiores animi iusto est laborum quas dolore assumenda voluptate quis! Quaerat corrupti enim autem iusto voluptates dolorum quae voluptate eligendi.
                    </p>
                </section>

                <!-- Right column -->
                <div class="grid grid-cols-1 gap-4">
                    <ReferralsPanel />

                    <ReferralRewardsPanel />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import components. */
import ReferralRewardsPanel from '@/components/ReferralRewardsPanel'
import ReferralsPanel from '@/components/ReferralsPanel'

export default {
    components: {
        ReferralRewardsPanel,
        ReferralsPanel,
    },
    data: () => ({
        referralid: null,
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        this.referralid = 'ab12c3'
    },
    mounted: function () {
        //
    },
}
</script>
