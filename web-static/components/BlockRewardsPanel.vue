<template>
    <main aria-labelledby="announcements-title">
        <div class="rounded-lg bg-white overflow-hidden shadow">
            <div class="p-6">
                <h2 class="text-xl font-medium text-gray-900" id="announcements-title">
                    Block Rewards
                </h2>

                <div class="flow-root mt-6">
                    <ul role="list" class="-my-5 divide-y divide-gray-200">

                        <li class="py-5" v-for="reward of rewards" :key="reward.id">
                            <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    <a href="javascript://" class="hover:underline focus:outline-none">
                                        <!-- Extend touch target to entire panel -->
                                        <span class="absolute inset-0" aria-hidden="true"></span>
                                        Block #{{reward.height}}
                                    </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                                    Solved {{reward.timeAgo}}.
                                </p>
                            </div>
                        </li>

                        <li class="py-5">
                            <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    <a href="javascript://" class="hover:underline focus:outline-none">
                                        <!-- Extend touch target to entire panel -->
                                        <span class="absolute inset-0" aria-hidden="true"></span>
                                        New password policy
                                    </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                                    Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus
                                    rerum. Culpa cum vel natus. Est sit autem mollitia.
                                </p>
                            </div>
                        </li>

                        <li class="py-5">
                            <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    <a href="javascript://" class="hover:underline focus:outline-none">
                                        <!-- Extend touch target to entire panel -->
                                        <span class="absolute inset-0" aria-hidden="true"></span>
                                        Office closed on July 2nd
                                    </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                                    Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab
                                    dicta et. Consequatur quis dignissimos voluptatem nisi.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="mt-6">
                    <a href="javascript://" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> View all </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data: () => ({
        rewards: null
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        this.rewards = []

        this.rewards.push({
            id: 'reward-id-1',
            height: 88572,
            timeAgo: '8 minutes ago',
            updatedAt: 1234567890
        })
    },
    mounted: function () {
        //
    }
}
</script>
