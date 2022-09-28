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
                        <div class="md:grid md:grid-cols-3 md:gap-6">
                            <div class="md:col-span-1">
                                <h3 class="text-lg font-medium leading-6 text-gray-900">
                                    Personal Information
                                </h3>
                                
                                <p class="mt-1 text-sm text-gray-500">
                                    Use a permanent address where you can receive mail.
                                </p>
                            </div>

                            <div class="mt-5 md:col-span-2 md:mt-0">
                                <h1 class="px-3 py-1 text-2xl text-yellow-800 font-medium bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                                    {{profileid}}
                                </h1>
                                
                                <div class="mt-5 grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="first-name" class="block text-sm font-medium text-gray-700">
                                            First name
                                        </label>
                                        
                                        <input 
                                            type="text" 
                                            autocomplete="given-name" 
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                                            v-model="firstName"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="last-name" class="block text-sm font-medium text-gray-700">
                                            Last name
                                        </label>
                                        
                                        <input 
                                            type="text" 
                                            autocomplete="family-name" 
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                                            v-model="lastName"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="email-address" class="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        
                                        <input 
                                            type="text" 
                                            autocomplete="email" 
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                                            v-model="email"
                                        />
                                    </div>

                                    <div class="col-span-6">
                                        <label for="nexa-address" class="block text-sm font-medium text-gray-700">
                                            Nexa address
                                        </label>
                                        
                                        <input 
                                            type="text" 
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                                            v-model="address"
                                        />

                                        <a v-if="address" :href="'https://explorer.nexa.org/address/' + address" target="_blank" class="pl-3 text-sm text-blue-500 font-medium hover:underline">
                                            open in explorer
                                        </a>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                                        <select
                                            id="country"
                                            name="country"
                                            autocomplete="country-name"
                                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                                        <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                                        <input type="text" name="city" id="city" autocomplete="address-level2" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                                        <input type="text" name="region" id="region" autocomplete="address-level1" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                        <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

<pre v-if="profile" class="mt-5 p-3 bg-pink-300 border-4 border-pink-500 rounded-lg">
<code class="text-xs" v-html="profile"></code>
</pre>
                </div>

                <!-- Right column -->
                <div class="grid grid-cols-1 gap-4">
                    <ProfilesPanel :profiles="profiles" />

                    <BlockRewardsPanel />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import components. */
import BlockRewardsPanel from '@/components/BlockRewardsPanel'
import ProfilesPanel from '@/components/ProfilesPanel'

/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    components: {
        BlockRewardsPanel,
        ProfilesPanel,
    },
    data: () => ({
        profiles: null,
        profileid: null,
        profile: null,

        firstName: null,
        lastName: null,
        email: null,
        address: null,
    }),
    watch: {
        $route: function (_to) {
            console.log('ROUTE CHANGED', _to)

            if (!_to || !_to.params || !_to.params.profileid) {
                return
            }

            this.profileid = _to.params.profileid
            console.log('ROUTE (profileid):', this.profileid)

            this.profile = this.profiles.find(_profile => {
                return _profile._id === this.profileid
            })

            /* Set first name. */
            this.firstName = this.profile.firstName

            /* Set last name. */
            this.lastName = this.profile.lastName

            /* Set email. */
            this.email = this.profile.email

            /* Set address. */
            this.address = this.profile.address

            /* Set profile display. */
            this.profile = JSON.stringify(this.profile, null, 2)
        },
    },
    computed: {
        //
    },
    methods: {
        async init() {
            /* Set issuer. */
            const didToken = this.$store.state.didToken
            // console.log('STORE (didToken):', didToken)

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
