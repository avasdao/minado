<script setup lang="ts">
/* Import modules. */
import CryptoJS from 'crypto-js'
import { createClient } from 'graphql-ws'
import JSConfetti from 'js-confetti'

import { listUnspent } from '@nexajs/address'
import { randomBytes } from '@nexajs/crypto'
import { getAddressHistory } from '@nexajs/provider'
import {
    binToHex,
    hexToBin,
    sleep,
} from '@nexajs/utils'


useHead({
    title: 'Nxy Mining',
    meta: [
        { name: 'description', content: 'Nxy web mining engine.' }
    ],
})

/* Initialize stores. */
import { useMiningStore } from '@/stores/mining'
import { useWalletStore } from '@/stores/wallet'
const Mining = useMiningStore()
const Wallet = useWalletStore()

const router = useRouter()

const errors = ref(null)
const mintingAuth = ref(null)
const txidem = ref(null)

/* Initialize mining handlers. */
const enclave = ref(null)
const isMining = ref(false)
const isWaitingForBlock = ref(false)
const useConfetti = ref(true)

/* Initialize constants. */
const NXY_ID_HEX = '5f2456fa44a88c4a831a4b7d1b1f34176a29a3f28845af639eb9b1c88dd40000'

const RECONNECTION_DELAY = 3000
const CONNECTION_PING_DELAY = 30000
const SHORT_MINING_DELAY = 3000
const LONG_MINING_DELAY = 7000

/* Initialize globals. */
let jsConfetti
let initRounds

const toggleSolo = () => {
    alert(`Oops! You MUST have at least 20 $NXY in your wallet to pay the transaction fee and receive the mining reward.\n\nPlease check your balance and try again...`)
}

const toggleFiat = () => {
    alert(`Coming soon...`)
}

/**
 * Initialization
 *
 * TBD...
 */
const init = async () => {
console.log('WALLET ADDRESS', Wallet.address)
    /* Validate (wallet) address. */
    if (!Wallet.address && initRounds < 10) {
        initRounds++

        return setTimeout(init, 100)
    }

    /* Initialize confetti. */
    jsConfetti = new JSConfetti()

    /* Initialize errors. */
    errors.value = []

    /* Request wallet history. */
    // FIXME: This should already be saved somewhere??
    // const history = await getAddressHistory(Wallet.address)
    //     .catch(err => console.error(err))
    // console.log('MY HISTORY', history)
}

/**
 * Calculate Submission
 *
 * TBD...
 */
const calcSubmission = (_miner, _outpointHash, _candidate) => {
    /* Initialize locals. */
    let entropy
    let hash
    let raw
    let submission

    /* Set entropy. */
    entropy = hexToBin(_outpointHash)
    entropy = entropy.reverse() // NOTE Convert to little endian.

    /* Build (binary) submission. */
    submission = new Uint8Array([
        ..._miner,
        ...entropy,
        ..._candidate,
    ])
    // const myRaw = `${_miner}${_outpointHash}${_candidate}`
    console.log('SUBMISSION (pre-image)', binToHex(submission))

    raw = CryptoJS.enc.Hex.parse(binToHex(submission))
    // console.log('MY HEX-1', myHex)

    hash = CryptoJS.SHA1(raw)
    // console.log('HASH-1', hash)

    // let mySha1 = hash.toString(CryptoJS.enc.Hex)
    // console.log('MY SHA-1', mySha1)

    hash = CryptoJS.SHA256(hash)
    // console.log('HASH-2', hash)

    // let mySha256 = hash.toString(CryptoJS.enc.Hex)
    // console.log('MY SHA-256', mySha256)

    hash = CryptoJS.RIPEMD160(hash)
    // console.log('HASH-3', hash)

    /* Convert to (final) submission. */
    submission = hash.toString(CryptoJS.enc.Hex)
    // console.log('MY RIPEMD-160', submission)

    /* Return (final) submission. */
    return submission
}

const startMiner = async () => {
    /* Validate wallet. */
    if (!Wallet.address) {
        alert('Oops! You MUST first create OR import a Nexa wallet to begin mining.')

        /* Go to wallet. */
        router.push('/wallet')

        return // stop
    }

    console.log('COINS', Wallet.wallet.coins)
    /* Validate wallet. */
    if (Wallet.wallet.coins.length === 0) {
        alert('Oops! You MUST deposit at least 100 $NEXA to pay for Solo Mining transaction fees.')

        /* Go to wallet. */
        router.push('/wallet')

        return // stop
    }

    console.info('Starting miner...')

    /* Initialize locals. */
    let candidate
    let errMsg
    let miner
    let miningAddress
    let miningUnspent
    let mySubmission
    let outpointHash
    let provider
    let response

    /* Reset errors. */
    errors.value = []

    /* Reset result. */
    txidem.value = null

    // TODO Decode script hash from wallet address.
    miner = hexToBin('0000000000000000000000000000000000000000')
    console.log('MINER', binToHex(miner))

    /* Generate new candidate. */
    // candidate = '0000000000000000000000000000000000000000000000000000000000000000'
    candidate = randomBytes(32)
    console.log('CANDIDATE', binToHex(candidate))

    // TODO Record candidates to (local) logs (for auditing).

    /* Request enclave (mining) details. */
    enclave.value = await $fetch('https://enclave.nxy.cash/v1/mining')
        .catch(err => console.error(err))
    console.log('ENCLAVE', enclave.value)

    /* Validate enclave. */
    if (!enclave.value) {
        return alert('ERROR! Nxy Mining Enclave is currently unavailable. Please try again later..')
    }

    /* Validate minting authority. */
    if (enclave.value?.authority) {
        /* Set minting authority. */
        mintingAuth.value = enclave.value.authority

        return // exit function
    }

    /* Validate minting authority. */
    if (enclave.value?.address) {
        /* Set mining address. */
        miningAddress = enclave.value.address
        console.log('MINING ADDRESS', miningAddress)
    }

    /* Validate mining address. */
    if (!miningAddress) {
        throw new Error('Oops! There is NO mining address available.')
    }

    /* Request unspent of mining address. */
    // miningUnspent = await listUnspent(miningAddress)
    //     .catch(err => console.error(err))
    // console.log('MINING UNSPENT', miningUnspent)

    /* Validate enclave UTXO. */
    if (enclave.value?.utxo) {
        mintingAuth.value = enclave.value.utxo
    }
    /* Find latest minting authority. */
    // mintingAuth.value = miningUnspent.find(_unspent => {
    //     return _unspent.tokenidHex === NXY_ID_HEX && _unspent.tokens < BigInt(0)
    // })
    console.log('MINTING AUTH', mintingAuth.value)

    if (!mintingAuth.value?.outpointHash) {
        return alert('Loading mining parameters are STILL loading...')
    }

    /* Set flag. */
    isMining.value = true

    outpointHash = mintingAuth.value.outpointHash
    console.log('OUTPOINT HASH', outpointHash)

    mySubmission = calcSubmission(miner, outpointHash, candidate)
    console.log('SUBMISSION', mySubmission)

// TODO Validate submission BEFORE attempting to "manually" submit
// NOTE DO NOT verify for shares to mining pools.

    /* Set (mining) provider. */
    provider = enclave.value?.provider

    /* Validate provider. */
    if (!provider) {
        throw new Error('Oops! You MUST set a mining provider.')
    }
// return
    /* Submit candidate. */
    response = await Mining.submit(Wallet.wallet, miner, candidate, provider)
    console.log('SUBMISSION RESPONSE', response)

    /* Set flag. */
    isMining.value = false

    /* Validate response. */
    if (response.result) {
        txidem.value = response.result

        /* Validate confetti flag. */
        if (useConfetti.value) {
            // BURST CONFETTI
            jsConfetti.addConfetti({
                // emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                // confettiColors: [
                //     '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
                // ],
                // confettiRadius: 6,
                confettiNumber: 300,
            })
        }

        /* Automtically restart mining (after a successful reward). */
        setTimeout(startMiner, 30000)
    }

    /* Validate error. */
    if (response.error) {
        /* Validate error message. */
        if (
            response.error.includes('Script failed an OP_VERIFY operation') ||
            response.error.message?.includes('Script failed an OP_VERIFY operation')
        ) {
            /* Automtically restart mining (after an error or failure). */
            setTimeout(startMiner, SHORT_MINING_DELAY)

            errMsg = 'Your attempt failed! Will automatically retry in a few seconds...'

            errors.value.push(errMsg)
            return console.error(errMsg)
        }

        if (
            response.error.includes('txn-already-in-mempool') ||
            response.error.message?.includes('txn-already-in-mempool') ||
            response.error.includes('group-token-imbalance') ||
            response.error.message?.includes('group-token-imbalance')
        ) {
            /* Automtically restart mining (after an error or failure). */
            setTimeout(startMiner, LONG_MINING_DELAY)

            errMsg = 'Your attempt failed! Will automatically retry in a few seconds...'

            errors.value.push(errMsg)
            return console.error(errMsg)
        }

        if (
            response.error.includes('non-BIP68-final') ||
            response.error.message?.includes('non-BIP68-final')
        ) {
            /* Set flag. */
            isWaitingForBlock.value = true

            errMsg = 'Mining is paused, please wait... Mining will automatically resume immediately AFTER the current $NXY reward is processed.'

            errors.value.push(errMsg)
            return console.error(errMsg)
        }

        /* Display (unknown) error. */
        alert('UNKNOWN ERROR!\n\n' + (response.error?.message || response.error))
    }
}

/* Initialize globals. */
let activeSocket
let isReconnecting
let query
let response
let subscription
let wsClient

// get ready
const GRAPHQL_ENDPOINT = 'wss://nexa.sh/graphql'

const BLOCK_QUERY = `
{
  block(height: 1337) {
    hash
    bits
    time
    txcount
  }
}
`

const BLOCK_SUBSCRIPTION = `
subscription Block {
  block {
    height
    hash
    txcount
  }
}
`

const startMonitor = async () => {
console.log('START MONITOR')
    /* Create WebSocket client. */
    wsClient = createClient({
        url: 'wss://nexa.sh/graphql',
        lazy: false,
        // shouldRetry: () => true,
        // retryAttempts: Infinity,
        // retryAttempts: 3,
        keepAlive: CONNECTION_PING_DELAY,
        on: {
            connected: async (_socket) => {
                isReconnecting = false
                activeSocket = _socket // to be used at pings & pongs
                console.log('ACTIVE SOCKET', activeSocket)
                // get the access token expiry time and set a timer to close the socket
                // once the token expires... Since 'retryAttempts: Infinity' it will
                // try to reconnect again by getting a fresh token.
                // const token_expiry_time = getTokenExpiryDate();
                // const current_time = Math?.round(+new Date() / 1000);
                // const difference_time = (token_expiry_time - current_time) * 1000;
                // setTimeout(() => {
                //     if (socket?.readyState === WebSocket?.OPEN) {
                //         socket?.close(CloseCode?.Forbidden, "Forbidden");
                //     }
                // }, difference_time);
                // }

                query = wsClient.iterate({
                    query: BLOCK_QUERY,
                })

                response = await query
                    .next()
                    .catch(err => console.error(err))
                console.log('GRAPHQL QUERY RESPONSE', response?.value?.data?.block || response?.value?.data || response?.value || response)

                subscription = wsClient.iterate({
                    query: BLOCK_SUBSCRIPTION,
                })

                for await (const event of subscription) {
                    console.log('SUBSCRIPTION EVENT',
                        isWaitingForBlock.value,
                        event?.data?.block || event?.data || event)

                    /* Validate waiting flag. */
                    if (isWaitingForBlock.value === true) {
                        /* Set flag. */
                        isWaitingForBlock.value = false

                        /* Start miner. */
                        startMiner()
                    }
                }

            },
            ping: (received) => {
                console.log('PING', received)
                // if (!received)
                //     // sent
                //     timedOut = setTimeout(() => {
                //         if (activeSocket?.readyState === WebSocket?.OPEN)
                //             activeSocket?.close(4408, 'Request Timeout');
                //     }, 5000); // wait 5 seconds for the pong and then close the connection
            },
            pong: (received) => {
                console.log('PONG', received)
                // if (received) clearTimeout(timedOut); // pong is received, clear connection close timeout
            },
            closed: async (received) => {
                console.error('Oops! Client connection was closed.')

                if (!isReconnecting) {
                    wsClient = null
                    console.info('Re-connecting...')

                    isReconnecting = true

                    // Timeout and retry mechanism
                    await sleep(RECONNECTION_DELAY)
                    startMonitor()
                }
            }
        },
    })
}

onMounted(() => {
    initRounds = 0

    init()

    // setTimeout(init, 3000) // FIXME: TEMP FOR DEV ONLY

    isReconnecting = false
    startMonitor()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="w-full flex flex-col space-y-4">
        <h1 class="sr-only">Solo Mining</h1>

        <section class="w-full lg:col-span-2 flex flex-col gap-3">
            <ChooseTokenAsset />

            <MiningGlobalStats :mintingAuth="mintingAuth" />

            <button
                @click="startMiner"
                class="group px-5 py-5 bg-green-500 border border-green-700 rounded-xl shadow"
                :class="[ isMining ? 'opacity-30 cursor-not-allowed' : 'hover:bg-green-400' ]"
                :disabled="isMining"
            >
                <span
                    class="text-5xl text-amber-100 font-medium"
                    :class="[ isMining ? '' : 'group-hover:text-green-900' ]"
                >
                    Start Mining
                </span>
            </button>

            <div v-if="txidem" class="col-span-2 mb-3 px-3 py-2 flex flex-col gap-3 bg-gray-800 border-t-2 border-amber-300 rounded-lg shadow">
                <h3 class="text-gray-100 text-base font-medium">
                    Congratulations!
                    <br />You received a mining reward!
                </h3>

                <div class="">
                    <h4 class="text-xs uppercase text-amber-200 font-medium tracking-wider">
                        Transaction Idem
                    </h4>

                    <div class="w-full flex flex-row gap-1 items-center truncate">
                        <NuxtLink :to="'https://explorer.nexa.org/tx/' + txidem" target="_blank" class="w-full text-lg text-blue-200 font-medium truncate">
                            {{txidem}}
                        </NuxtLink>

                        <svg class="w-10 h-auto text-blue-200" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div v-if="errors && errors.length">
                <div class="rounded-md bg-red-50 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>

                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800 tracking-wide">
                                There were {{errors.length}} error(s) with your submission
                            </h3>

                            <div class="mt-2 text-sm text-red-700">
                                <ul role="list" class="list-disc space-y-1 pl-5">
                                    <li v-for="error of errors" :key="error">
                                        {{error}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="my-3 px-3 flex items-center justify-between gap-3">

                <span class="flex flex-grow flex-col">
                    <span class="text-base font-medium leading-6 text-gray-800 tracking-wider">
                        Enable SOLO mining?
                    </span>

                    <span class="text-sm text-gray-500" id="availability-description">
                        Receive the FULL reward for every accepted solution.
                        <em class="block text-xs text-rose-500 tracking-wider">(requires small amount of $NXY to pay transaction fee)</em>
                    </span>
                </span>

                <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                <button
                    @click="toggleSolo"
                    type="button"
                    class="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    role="switch"
                    aria-checked="false"
                    aria-labelledby="availability-label"
                    aria-describedby="availability-description"
                >
                    <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                    <span aria-hidden="true" class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
            </div>

            <div class="my-3 px-3 flex items-center justify-between gap-3">

                <span class="flex flex-grow flex-col">
                    <span class="text-base font-medium leading-6 text-gray-800 tracking-wider">
                        Display in FIAT?
                    </span>

                    <span class="text-sm text-gray-500" id="availability-description">
                        Display ALL monetary values in your local currency.
                    </span>
                </span>

                <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                <button
                    @click="toggleFiat"
                    type="button"
                    class="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    role="switch"
                    aria-checked="false"
                    aria-labelledby="availability-label"
                    aria-describedby="availability-description"
                >
                    <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                    <span aria-hidden="true" class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
            </div>

        </section>

        <section class="mt-20 grid lg:grid-cols-5 gap-5">

            <div class="lg:col-span-3 flex flex-col gap-12">
                <MiningLocalStats />
                <MiningPoolStats />
            </div>

        </section>
    </main>
</template>
