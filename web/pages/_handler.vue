<template>
    <main class="min-h-full">
        <Header />

        <section class="-mt-24 pb-8">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">Application Handler</h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                    <section class="col-span-2">
                        <!-- Address View -->
                        <AppHandlerAddressView
                            v-if="addressStub"
                        />

                        <AppHandlerSharesBlock
                            :shares="shares"
                        />
                    </section>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <AppHandlerAddressFinance
                            v-if="addressStub"
                        />
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
export default {
    data: () => ({
        addressStub: null,
        shares: null
    }),
    computed: {
        //
    },
    methods: {
        init () {
            let params

            /* Set route. */
            const route = this.$route

            /* Validate route. */
            if (route) {
                params = route.params
                console.log('PARAMS', params)
            }

            /* Validate application handler. */
            if (params && params.handler) {
                /* Set id of app handler. */
                const id = params.handler

                /* Handle Nexa address. */
                if (id.slice(0, 7) === 'nexa:nq' || id.slice(0, 2) === 'nq') {
                    this.addressStub = params.handler

                    /* Set the application (active) address. */
                    return this.$store.dispatch('rostrum/setAddress', params.handler)
                }

                // TODO: Add more handlers.
                //         - first bits (short addresses)
                //         - referall
            }

            /* Fallback to homepage. */
            this.$router.push('/')
        },

        async streamShares () {
            const endpoint = 'https://stratum.nexa.rocks/v1'
            const rawResponse = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    method: 'register',
                    params: {
                        address: this.addressStub
                    }
                })
            })

            const content = await rawResponse.json()
            console.log('CONTENT (register):', content)

            /* Set (event) source. */
            const source = `https://stratum.nexa.rocks/v1/shares/${this.addressStub.slice(5)}`
            console.log('SOURCE', source)

            /* Initialize shares streaming. */
            const shares = new EventSource(source)

            /* Handle connection opening. */
            shares.onopen = () => {
                console.log('SHARES IS OPEN')

                /* Emit message. */
                // this.emit('open', msg)
            }

            /* Handle connection closing. */
            shares.onclose = () => {
                console.log('SHARES HAS CLOSED')

                /* Emit message. */
                // this.emit('close', msg)
            }

            /* Handle message. */
            shares.onmessage = (_evt) => {
                console.log('ONMESSAGE (evt):', _evt)

                try {
                    /* Parse data. */
                    const data = JSON.parse(_evt.data)
                    console.log('EVENT SOCKET (data):', data)

                    this.shares.push(data)

                    /* Emit data. */
                    // this.emit('update', data)
                } catch (err) {
                    console.error('EVENT SOCKET ERROR:', err)
                    /* Emit error. */
                    // this.emit('error', err)
                }
            }
        }
    },
    created: function () {
        /* Initialize handler. */
        this.init()

        this.shares = []

        if (process.client) {
            /* Initialize Rostrum. */
            this.$store.dispatch('rostrum/init')

            /* Start mining streams. */
            this.streamShares()
        }
    },
    mounted: function () {
        //
    }
}
</script>
