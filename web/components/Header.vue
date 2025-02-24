<script setup lang="ts">
/* Import modules. */
import gravatar from 'gravatar'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

/* Initialize route. */
const route = useRoute()

/* Initialize router. */
const router = useRouter()

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const System = useSystemStore()
const Wallet = useWalletStore()

const search = ref(null)
const isMenuOpen = ref(false)
const isMenuVisible = ref(false)
const isAdmin = ref(false)

const displayAvatar = computed(() => {
    return '~/assets/lottie/9994-name-profile-icon-animation-circle.gif'
    // if (System.state.profile.authenticated) {
    //     return gravatar.url(System.state.profile.user.email)
    // } else {
    //     return '~/assets/lottie/9994-name-profile-icon-animation-circle.gif'
    // }
})

const displayEmail = computed(() => {
    if (!Profile.user) {
        return 'not signed in'
    }

    return Profile.user.email
})

const init = () => {
    /* Validate admin path. */
    isAdmin.value = route.path.slice(0, 6) === '/admin'
}

const checkAddress = async () => {
    let address

    /* Validate search. */
    if (!this.search) {
        return
    }

    /* Set address (to lowercase). */
    address = this.search ? this.search.toLowerCase() : null
    // console.log('ADDRESS', address)

    /* Validate address length. */
    if (address.length < 40) {
        return
    }

    /* Normalize address. */
    if (address.slice(0, 5) !== 'nexa:') {
        address = 'nexa:' + address
    }
    console.log('ADDRESS (norm):', address)

    const { isvalid } = await System.validateAddress(address)
    console.log('ADDRESS IS VALID', isvalid)

    /* Request address panel. */
    System.dispatch('system/openPanel', {
        tab: 'address',
        metadata: address
    })
}

const openMenu = () => {
    this.isMenuVisible = true
    setTimeout(() => {
        this.isMenuOpen = true
    }, 0)
}

const closeMenu = () => {
    this.isMenuOpen = false
    setTimeout(() => {
        this.isMenuVisible = false
    }, 150)
}

const toggleMenu = () => {
    if (System.state.profile.authenticated) {
        if (this.isMenuOpen) {
            this.closeMenu()
        } else {
            this.openMenu()
        }
    } else {
        this.openMyProfile()
    }
}

const openMyProfile = () => {
    /* Close menu. */
    this.closeMenu()

    /* Open profile. */
    router.push('/profile')
}

const openMyDashboard = () => {
    /* Close menu. */
    this.closeMenu()

    /* Open dashboard. */
    this.$router.push('/dashboard')
}

const signOut = () => {
    /* Close menu. */
    this.closeMenu()

    /* Sign out. */
    System.dispatch('profile/signout')
}

const openReferrals = () => {
    /* Close menu. */
    this.closeMenu()

    /* Request referrals panel. */
    System.dispatch('system/openPanel', 'referrals')
}

const openHelp = () => {
    /* Close menu. */
    this.closeMenu()

    /* Request help panel. */
    System.dispatch('system/openPanel', 'help')
}

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="pb-24 bg-gradient-to-r from-fuchsia-900 to-fuchsia-800">
        <div class="max-w-3xl mx-auto px-3 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="relative flex flex-wrap items-center justify-center lg:justify-between">
                <!-- Logo -->
                <div class="absolute left-0 py-5 flex-shrink-0 lg:static">
                    <NuxtLink to="/" class="flex flex-row items-center">
                        <span class="sr-only">Minado</span>

                        <img class="w-16 h-16" src="~/assets/logo.png" />

                        <div class="hidden lg:block ml-3 flex flex-col gap-2">
                            <h1 class="text-6xl text-gray-200 font-light">
                                Minado
                            </h1>

                            <h3 class="text-xs text-amber-200 font-medium tracking-widest">
                                CPU &amp; GPU Crypto $TOKEN Mining
                            </h3>
                        </div>
                    </NuxtLink>
                </div>

                <!-- Right section on desktop -->
                <div class="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5 gap-5">
                    <NuxtLink to="/transparency" class="flex-shrink-0 p-1 text-fuchsia-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                        <span class="sr-only">Transparency</span>

                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"></path></svg>
                    </NuxtLink>

                    <button @click="openReferrals" class="flex-shrink-0 p-1 text-fuchsia-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                        <span class="sr-only">Referral Manager</span>

                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path></svg>
                    </button>

                    <button @click="openHelp" class="flex-shrink-0 p-1 text-fuchsia-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                        <span class="sr-only">Support Center</span>

                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                    </button>

                    <!-- Profile dropdown -->
                    <div class="relative flex-shrink-0">
                        <button @click="toggleMenu" class="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open profile menu</span>
                            <img class="p-1 h-8 w-8 rounded-full" src="~/assets/lottie/9994-name-profile-icon-animation-circle.gif" alt="profile / avatar" />
                        </button>

                        <div
                            v-if="isMenuVisible"
                            class="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-in duration-150"
                            :class="[ isMenuOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95' ]"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabindex="-1"
                        >
                            <!-- Active: "bg-gray-100", Not Active: "" -->
                            <button @click="openMyProfile" class="flex w-full px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">
                                My Profile
                            </button>

                            <button @click="openMyDashboard" class="flex w-full px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">
                                My Dashboard
                            </button>

                            <button @click="signOut" class="flex w-full px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>

                <div class="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                    <div class="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                        <!-- Admin Navigation -->
                        <div v-if="isAdmin" class="hidden lg:block lg:col-span-2">
                            <nav class="flex space-x-4">
                                <NuxtLink to="/admin" class="text-white text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10" aria-current="page">
                                    Home
                                </NuxtLink>

                                <NuxtLink to="/admin/profiles" class="text-fuchsia-100 text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                                    Profiles
                                </NuxtLink>

                                <NuxtLink to="/admin/miners" class="text-fuchsia-100 text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                                    Miners
                                </NuxtLink>

                                <NuxtLink to="/admin/servers" class="text-fuchsia-100 text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                                    Servers
                                </NuxtLink>

                                <NuxtLink to="/admin/notifs" class="text-fuchsia-100 text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                                    Notifs
                                </NuxtLink>

                                <NuxtLink to="/admin/orders" class="text-fuchsia-100 text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                                    Orders
                                </NuxtLink>
                            </nav>
                        </div>

                        <!-- General Navigation -->
                        <div v-else class="hidden lg:block lg:col-span-2">
                            <nav class="flex space-x-4">
                                <NuxtLink to="/" class="text-white text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10" aria-current="page">
                                    Home
                                </NuxtLink>

                                <NuxtLink to="/solo" class="text-fuchsia-100 text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                                    Solo Mining
                                </NuxtLink>

                                <NuxtLink to="/pool" class="text-fuchsia-100 text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                                    Pool Mining
                                </NuxtLink>

                                <NuxtLink to="/cloud" class="text-fuchsia-100 text-lg font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                                    Cloud Mining
                                </NuxtLink>

                                <NuxtLink to="/register" class="text-yellow-300 text-lg font-bold rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                                    Register An Asset
                                </NuxtLink>
                            </nav>
                        </div>

                        <div class="px-12 lg:px-0">
                            <div class="max-w-xs mx-auto w-full lg:max-w-md">
                                <label for="search" class="sr-only">Enter Nexa address</label>

                                <div class="relative text-white focus-within:text-gray-600">
                                    <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                        </svg>
                                    </div>

                                    <input
                                        class="block w-full text-white text-lg bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0"
                                        placeholder="Type or paste your nexa: address"
                                        type="search"
                                        v-model="search"
                                        @keyup="checkAddress"
                                        @paste="checkAddress"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Menu button -->
                <div class="absolute right-0 flex-shrink-0 lg:hidden">
                    <!-- Mobile menu button -->
                    <button
                        @click="openMenu"
                        type="button"
                        class="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-fuchsia-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-expanded="false"
                    >
                        <span class="sr-only">Open main menu</span>
                        <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
                        <svg class="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
                        <svg class="hidden h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on mobile menu state. -->
        <div v-if="isMenuVisible" class="lg:hidden">
            <!--
        Mobile menu overlay, show/hide based on mobile menu state.

        Entering: "duration-150 ease-out"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "duration-150 ease-in"
          From: "opacity-100"
          To: "opacity-0"
      -->
            <div
                class="z-20 fixed inset-0 bg-black bg-opacity-25 duration-150 ease-out"
                :class="[ isMenuOpen ? 'opacity-100' : 'opacity-0' ]"
                aria-hidden="true"
            ></div>

            <!--
        Mobile menu, show/hide based on mobile menu state.

        Entering: "duration-150 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-150 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
            <div
                class="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top duration-150 ease-out"
                :class="[ isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95' ]"
            >
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                    <div class="pt-3 pb-2">
                        <div class="flex items-center justify-between px-4">
                            <div>
                                <img class="h-12 w-auto" src="~/assets/logo.png" alt="Minado Logo" />
                            </div>

                            <div class="-mr-2">
                                <button
                                    type="button"
                                    class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-fuchsia-500"
                                    @click="closeMenu"
                                >
                                    <span class="sr-only">Close menu</span>
                                    <!-- Heroicon name: outline/x -->
                                    <svg class="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="mt-3 px-2 space-y-1">
                            <NuxtLink to="/" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                Home
                            </NuxtLink>

                            <NuxtLink to="/register" class="block rounded-md px-3 py-2 text-lg text-blue-500 font-medium hover:bg-gray-100 hover:text-gray-800">
                                Register An Asset
                            </NuxtLink>

                            <NuxtLink to="/solo" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                Solo Mining
                            </NuxtLink>

                            <NuxtLink to="/pool" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                Pool Mining
                            </NuxtLink>

                            <NuxtLink to="/cloud" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                Cloud Mining
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="pt-4 pb-2">
                        <div class="flex items-center px-5">
                            <div class="flex-shrink-0">
                                <img class="h-12 w-12 rounded-full" :src="displayAvatar" alt="Profile photo" />
                            </div>

                            <div class="ml-3 min-w-0 flex-1">
                                <div class="text-base font-medium text-gray-800 truncate">
                                    Welcome Guest
                                </div>

                                <div class="text-sm font-medium text-gray-500 truncate">
                                    {{displayEmail}}
                                </div>
                            </div>

                            <button type="button" class="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                                <span class="sr-only">View notifications</span>
                                <!-- Heroicon name: outline/bell -->
                                <svg class="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div v-if="$store.state.profile.authenticated" class="mt-3 px-2 space-y-1">
                            <NuxtLink to="/profile" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                My Profile
                            </NuxtLink>

                            <NuxtLink to="/dashboard" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                My Dashboard
                            </NuxtLink>

                            <button @click="openReferrals" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                Referrals
                            </button>

                            <a @click="signOut" href="javascript://" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                Sign out
                            </a>
                        </div>

                        <div v-else class="mt-3 px-2 space-y-1">
                            <button @click="openMyProfile" class="w-full block rounded-md px-3 py-2 text-xl text-rose-600 font-medium hover:bg-gray-100 hover:text-gray-800">
                                Click here to Sign In
                            </button>
                        </div>

                        <div class="mt-3 px-2 space-y-1">
                            <button @click="openHelp" class="w-full block rounded-md px-3 py-2 text-lg text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                                24x7 Support Center
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
