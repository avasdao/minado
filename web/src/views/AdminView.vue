<template>
    <main class="-mt-24 pb-8">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="sr-only">Admin Center</h1>

            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <div class="flex flex-col col-span-2 space-y-4 ">
                    <section class="p-5 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        <h1 class="text-4xl font-bold text-yellow-900">
                            Admin Center
                        </h1>

                        <p class="text-yellow-900">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aliquam maiores animi iusto est laborum quas dolore assumenda voluptate quis! Quaerat corrupti enim autem iusto voluptates dolorum quae voluptate eligendi.
                        </p>
                    </section>

                    <section v-if="profile">
                        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                            <ProfileView :profile="profile" />
                        </div>

                        <MinersPanel 
                            :miners="miners" 
                            :profile="profile" 
                            @addMiner="addMiner"
                            class="mt-3"
                        />

                    </section>

<pre v-if="profile" class="mt-5 p-3 bg-pink-300 border-4 border-pink-500 rounded-lg">
<code class="text-xs" v-html="JSON.stringify(profile, null, 2)"></code>
</pre>

<pre v-if="miner" class="mt-5 p-3 bg-pink-300 border-4 border-pink-500 rounded-lg">
<code class="text-xs" v-html="JSON.stringify(miner, null, 2)"></code>
</pre>
                </div>

                <!-- Right column -->
                <div class="grid grid-cols-1 gap-4">
                    <button 
                        @click="addProfile" 
                        class="mx-3 px-3 py-1 text-2xl text-yellow-100 font-medium bg-yellow-500 border-2 border-yellow-700 rounded-lg hover:text-yellow-50 hover:bg-yellow-400"
                    >
                        Add New Profile
                    </button>

                    <ProfilesPanel :profiles="profiles" />

                    <BlockRewardsPanel />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import views. */
import MinersPanel from './AdminView/MinersPanel'
import ProfilesPanel from './AdminView/ProfilesPanel'
import ProfileView from './AdminView/ProfileView'

/* Import components. */
import BlockRewardsPanel from '@/components/BlockRewardsPanel'

/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    components: {
        ProfileView,
        BlockRewardsPanel,
        MinersPanel,
        ProfilesPanel,
    },
    data: () => ({
        profiles: null,
        profileid: null,
        profile: null,
        magic: null,

        miner: null,
        miners: null,

        hostname: null,
        location: null,
        auth: null,
        pid: null,
        count: null,
    }),
    watch: {
        $route: function (_to) {
            console.log('ROUTE CHANGED', _to)

            if (!_to || !_to.params || !_to.params.profileid) {
                return
            }

            this.profileid = _to.params.profileid
            console.log('ROUTE (profileid):', this.profileid)

            this.loadProfile(this.profileid)
        },
    },
    computed: {
        //
    },
    methods: {
        async init() {
            /* Request magic. */
            // this.magic = this.$store.state.magic
            // console.log('STORE (magic):', this.magic)

            /* Request issuer. */
            const didToken = this.$store.state.didToken

            /* Validate issuer. */
            if (didToken) {
                const rawResponse = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        didToken,
                        action: 'get_profiles',
                    })
                })
                // console.log('RAW RESPONSE', rawResponse)
    
                const content = await rawResponse.json()
                console.log('CONTENT (get_profiles):', content)

                /* Set profiles. */
                this.profiles = content.data

                if (this.$route.params && this.$route.params.profileid) {
                    this.loadProfile(this.$route.params.profileid)
                }
            }


        },

        loadProfile(_profileid) {
            this.getMiners()

            const profile = this.profiles.find(_profile => {
                return _profile._id === _profileid
            })

            /* Set first name. */
            this.firstName = profile.firstName

            /* Set last name. */
            this.lastName = profile.lastName

            /* Set email. */
            this.email = profile.email

            /* Set address. */
            this.address = profile.address

            /* Set profile display. */
            this.profile = profile

        },

        async getMiners() {
            /* Request issuer. */
            const didToken = this.$store.state.didToken

            /* Validate issuer. */
            if (didToken) {
                const rawResponse = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        didToken,
                        action: 'get_miners',
                        profileid: this.profileid,
                    })
                })
                // console.log('RAW RESPONSE', rawResponse)
    
                const content = await rawResponse.json()
                console.log('CONTENT (get_miners):', content)

                /* Set profiles. */
                this.miners = content.data
            }

        },

        async addProfile() {
            /* Request issuer. */
            const didToken = this.$store.state.didToken

            const rawResponse = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    didToken,
                    action: 'add_profile',
                })
            })
            // console.log('RAW RESPONSE', rawResponse)

            const content = await rawResponse.json()
            console.log('CONTENT', content)

            /* Set profiles. */
            this.init()
        },

        async addMiner() {
            /* Request issuer. */
            const didToken = this.$store.state.didToken

            const rawResponse = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    didToken,
                    action: 'add_miner',
                    profileid: this.profileid,
                    hostname: this.hostname,
                    location: this.location,
                    auth: this.auth,
                    pid: this.pid,
                    count: this.count,
                })
            })
            // console.log('RAW RESPONSE', rawResponse)

            const content = await rawResponse.json()
            console.log('CONTENT', content)

            /* Set profiles. */
            // this.init()
        },
    },
    created: function () {
        this.profiles = []

        this.init()

        const route = this.$route
        const params = route.params
        
        this.profileid = params.profileid
        console.log('PROFILE ID', this.profileid)

        this.getMiners()

    },
    mounted: function () {
        //
    },
}
</script>
