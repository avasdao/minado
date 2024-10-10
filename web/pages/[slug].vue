<script setup lang="ts">
/* Import modules. */

const route = useRoute()

const addressStub = ref(null)
const shares = ref([])

/* Set (route) slug. */
const slug = route?.params.slug

const init = () => {
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
}

const streamShares = async () => {
    const endpoint = 'https://stratum.minado.io/v1'
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
    const source = `https://stratum.minado.io/v1/shares/${this.addressStub.slice(5)}`
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

onMounted(() => {
    console.log('Mounted!')

    if (process.client) {
        /* Initialize Rostrum. */
        // this.$store.dispatch('rostrum/init')

        /* Start mining streams. */
        // this.streamShares()
    }
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="-mt-16 pb-8 flex flex-col gap-4">
        <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="sr-only">Application Handler</h1>

            <section class="flex flex-col gap-6 leading-8">
                <h1 class="text-5xl font-light text-amber-300 tracking-widest">
                    Application Handler
                </h1>

                <h3 class="text-xl font-bold tracking-widest">
                    ( {{slug}} )
                </h3>

                <p class="w-2/3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsam pariatur explicabo eveniet neque natus, molestias corrupti tenetur rerum dolorem deleniti aliquam tempore porro aut a eum quas officiis mollitia!
                </p>

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
