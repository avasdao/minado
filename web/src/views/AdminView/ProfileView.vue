<template>
    <main class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
                Profile Information
            </h3>
            
            <p class="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
            </p>
        </div>

        <div class="mt-5 md:col-span-2 md:mt-0">
            <h1 class="px-3 py-1 text-2xl text-yellow-800 font-medium bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                {{profile._id}}
            </h1>
            
            <div class="mt-5 grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-4">
                    <label for="nickname" class="block text-sm font-medium text-gray-700">
                        Nickname
                    </label>
                    
                    <input 
                        type="text" 
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                        v-model="nickname"
                    />
                </div>

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

        <footer class="col-span-3 flex justify-end">
            <button 
                @click="updateProfile" 
                class="px-3 py-1 text-xl font-medium bg-yellow-200 border-2 border-yellow-400 rounded-lg hover:text-yellow-800 bg-yellow-300"
            >
                Update Profile
            </button>

        </footer>

    </main>
</template>

<script>
/* Set API endpoint. */
const ENDPOINT = 'https://api.nexa.rocks/v1/admin'

export default {
    props: {
        profile: Object,
    },
    data: () => ({
        nickname: null,
        firstName: null,
        lastName: null,
        email: null,
        address: null,
    }),
    watch: {
        profile: function (_profile) {
            console.log('PROFILE CHANGED', _profile)

            this.nickname = _profile.nickname
            this.firstName = _profile.firstName
            this.lastName = _profile.lastName
            this.email = _profile.email
            this.address = _profile.address
        }
    },
    computed: {
        //
    },
    methods: {
        async updateProfile() {
            /* Request issuer. */
            const didToken = this.$store.state.didToken

            const nickname = this.nickname
            const firstName = this.firstName
            const lastName = this.lastName
            const email = this.email
            const address = this.address

            const rawResponse = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    didToken,
                    action: 'update_profile',
                    profile: {
                        ...this.profile,
                        nickname,
                        firstName,
                        lastName,
                        email,
                        address,
                    }
                })
            })
            // console.log('RAW RESPONSE', rawResponse)

            const content = await rawResponse.json()
            console.log('CONTENT', content)

            alert('update local')
        },
    },
    created: function () {
        this.firstName = this.profile.firstName
    },
    mounted: function () {
        //
    },
}
</script>
