<template>
    <main aria-labelledby="recent-hires-title">
        <div class="rounded-lg bg-white overflow-hidden shadow">
            <div class="p-6">
                <h2 class="text-xl font-medium text-gray-900" id="recent-hires-title">
                    Orders List
                </h2>

                <div class="flow-root mt-6">
                    <ul role="list" class="-my-5 divide-y divide-gray-200">

                        <li class="py-4" v-for="order of recentOrders" :key="order._id">
                            <router-link :to="'/admin/orders/' + order._id" class="flex items-center space-x-4">
                                <div class="flex-shrink-0">
                                    <img
                                        class="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </div>

                                <div class="flex-1 min-w-0">
                                    <h2 class="text-base font-medium text-gray-800 truncate">
                                        {{order.totalMiners}}
                                        [ {{order.numVaalserberg}} | {{order.numTransfagarasan}} | {{order.numKekesteto}} ]

                                        <span class="text-xs text-gray-400">
                                            {{order.isDelivered}}
                                        </span>
                                    </h2>

                                    <p class="text-xs text-gray-500 truncate italic">
                                        {{order.payment && order.payment.shift && order.payment.shift.status}}
                                    </p>

                                    <p class="text-sm text-gray-500 truncate italic">
                                        {{order.payment && order.payment.address}}
                                    </p>

                                    <p class="text-sm text-gray-500 truncate">
                                        <span class="font-bold">
                                            ${{order.payment && order.payment.pair && order.payment.pair.min}}
                                        </span>

                                        {{order.payment && order.payment.pair && order.payment.pair.depositCoin}}

                                        <em>
                                            ({{order.payment && order.payment.pair && order.payment.pair.depositNetwork}})
                                        </em>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>

                <div class="mt-6">
                    <a href="javascript://" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        View all
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        orders: Array
    },
    data: () => ({
        //
    }),
    computed: {
        /**
         * Recent Orders
         *
         * Retrieves the 10 most recent orders.
         */
        recentOrders () {
            if (!this.orders) {
                return []
            }

            const orders = JSON.parse(JSON.stringify(this.orders))

            /* Sort by most recent. */
            const recent = orders.sort(function (a, b) {
                return b.updatedAt - a.updatedAt
            })

            /* Return most recent 10. */
            return recent.slice(0, 10)
        }
    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    }
}
</script>
