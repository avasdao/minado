<template>
    <main class="-mt-24 pb-8 flex flex-col gap-3 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <OrderIncentives />

        <section>


        </section>


        <section aria-labelledby="mt-48 quick-links-title">
            <div class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0">
                <h2 class="sr-only" id="quick-links-title">
                    Pool Mining links
                </h2>

                <div class="bg-white p-6">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate debitis aut exercitationem quas enim eaque. Ipsam saepe, sunt cum debitis, est illum assumenda non laboriosam nesciunt aperiam labore optio officiis!
                </div>
            </div>
        </section>

    </main>
</template>

<script>
/* Import components. */
import OrderIncentives from '@/components/OrderIncentives'

export default {
    components: {
        OrderIncentives,
    },
    data: () => ({
        coins: null,
    }),
    computed: {
        //
    },
    methods: {
        /**
         * Initialize Coins
         */
        async initCoins() {
            let coin

            /* Set target. */
            const target = 'https://sideshift.ai/api/v2/coins'
            
            /* Request coins. */
            const result = await fetch(target)
                .catch(err => {
                    console.error(err)
                })
            // console.log('RESULT (coins):', result)

            const json = await result.json()
            console.log('JSON', json)

            /* Initialize coins container. */
            this.coins = {}


            /* 5x STABLECOINS */

            /* Find USD Coin. */
            coin = json.find(_coin => {
                return _coin.coin === 'USDC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['usdc'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Tether. */
            coin = json.find(_coin => {
                return _coin.coin === 'USDT'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['usdt'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Binance USD. */
            coin = json.find(_coin => {
                return _coin.coin === 'BUSD'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['busd'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find MakerDAO Dai. */
            coin = json.find(_coin => {
                return _coin.coin === 'DAI'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['dai'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Magic Internet Money. */
            coin = json.find(_coin => {
                return _coin.coin === 'MIM'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['mim'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }


            /* 11x COIN ASSETS */

            /* Find Avalanche. */
            coin = json.find(_coin => {
                return _coin.coin === 'AVAX'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['avax'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Binance Coin. */
            coin = json.find(_coin => {
                return _coin.coin === 'BNB'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['bnb'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Bitcoin Cash. */
            coin = json.find(_coin => {
                return _coin.coin === 'BCH'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['bch'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Bitcoin. */
            coin = json.find(_coin => {
                return _coin.coin === 'BTC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['btc'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Dash. */
            coin = json.find(_coin => {
                return _coin.coin === 'DASH'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['dash'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Dogecoin. */
            coin = json.find(_coin => {
                return _coin.coin === 'DOGE'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['doge'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Ethereum. */
            coin = json.find(_coin => {
                return _coin.coin === 'ETH'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['eth'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Litecoin. */
            coin = json.find(_coin => {
                return _coin.coin === 'LTC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['ltc'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Monero. */
            coin = json.find(_coin => {
                return _coin.coin === 'XMR'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['xmr'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Polygon. */
            coin = json.find(_coin => {
                return _coin.coin === 'MATIC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['matic'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Zcash. */
            coin = json.find(_coin => {
                return _coin.coin === 'ZEC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['zec'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }
        }
    },
    created: async function () {
        /* Get coins. */
        await this.initCoins()
        console.log('COINS', this.coins)

        console.log('USDC', this.coins.usdc)
        console.log('USDT', this.coins.usdt)
        console.log('BUSD', this.coins.busd)
        console.log('DAI', this.coins.dai)
        console.log('MIM', this.coins.mim)

        console.log('AVAX', this.coins.avax)
        console.log('BCH', this.coins.bch)
        console.log('BTC', this.coins.btc)
        console.log('DASH', this.coins.dash)
        console.log('ETH', this.coins.eth)
        console.log('MATIC', this.coins.matic)
    },
    mounted: function () {
        //
    },
}
</script>
