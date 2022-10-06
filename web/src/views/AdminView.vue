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

                    <section v-if="profile" class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                        <ProfileView :profile="profile" />
                    </section>

<pre v-if="profile" class="mt-5 p-3 bg-pink-300 border-4 border-pink-500 rounded-lg">
<code class="text-xs" v-html="JSON.stringify(profile, null, 2)"></code>
</pre>
                </div>

                <!-- Right column -->
                <div class="grid grid-cols-1 gap-4">
                    <ProfilesPanel :profiles="profiles" />

                    <button @click="addProfile" class="mx-3 px-3 py-1 text-xl text-pink-100 font-medium bg-pink-500 border-2 border-pink-700 rounded-lg hover:text-pink-50 hover:bg-pink-400">
                        Add New Profile
                    </button>

                    <BlockRewardsPanel />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import views. */
import ProfileView from './AdminView/ProfileView'

/* Import components. */
import BlockRewardsPanel from '@/components/BlockRewardsPanel'
import ProfilesPanel from '@/components/ProfilesPanel'

/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    components: {
        ProfileView,
        BlockRewardsPanel,
        ProfilesPanel,
    },
    data: () => ({
        profiles: null,
        profileid: null,
        profile: null,
        magic: null,
    }),
    watch: {
        $route: function (_to) {
            console.log('ROUTE CHANGED', _to)

            if (!_to || !_to.params || !_to.params.profileid) {
                return
            }

            this.profileid = _to.params.profileid
            console.log('ROUTE (profileid):', this.profileid)

            const profile = this.profiles.find(_profile => {
                return _profile._id === this.profileid
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
                console.log('CONTENT', content)

                /* Set profiles. */
                this.profiles = content.data
            }

            /* Validate login auth. */
            // const isLoggedIn = await this.magic.user.isLoggedIn()
            // console.info('Magic Link (isLoggedIn):', isLoggedIn)

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
    },
    created: function () {
        this.profiles = []

        this.init()

        const route = this.$route
        const params = route.params
        
        this.profileid = params.profileid
        console.log('PROFILE ID', this.profileid)
    },
    mounted: function () {
        //
    },
}
</script>
