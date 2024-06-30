/* Import modules. */
import numeral from 'numeral'

import { listUnspent } from '@nexajs/address'

import { randomBytes } from '@nexajs/crypto'

import { Wallet } from '@nexajs/wallet'

import {
    binToHex,
    hexToBin,
    reverseHex,
} from '@nexajs/utils'

import CryptoJS from 'crypto-js'

import {
    getAddressHistory,
    getTransaction,
} from '@nexajs/rostrum'

/* Import submission helper. */
import miningSubmit from './libs/miningSubmit.js'

let errors
let mintingAuth
let txidem
let wallet

/* Initialize mining handlers. */
let isMining
let enclave

/* Initialize constants. */
const NXY_ID_HEX = '5f2456fa44a88c4a831a4b7d1b1f34176a29a3f28845af639eb9b1c88dd40000'




import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

const init = async () => {
    /* Initialize locals. */
    let miningAddress
    let miningUnspent

    /* Initialize wallet. */
    wallet = await Wallet.init(process.env.MNEMONIC)
    console.log('WALLET', wallet)
    console.log('WALLET ADDRESS', wallet.address)

    /* Initialize errors. */
    errors = []

    /* Request wallet history. */
    // FIXME: This should already be saved somewhere??
    const history = await getAddressHistory(wallet.address)
        .catch(err => console.error(err))
    console.log('MY HISTORY', history)

    /* Request enclave (mining) details. */
    enclave = await fetch('https://enclave.nxy.cash/v1/mining')
        .catch(err => console.error(err))

    enclave = await enclave.json()
    console.log('ENCLAVE', enclave)

    /* Set mining address. */
    miningAddress = enclave.address
    console.log('MINING ADDRESS', miningAddress)

    /* Request unspent of mining address. */
    miningUnspent = await listUnspent(miningAddress)
        .catch(err => console.error(err))
    console.log('MINING UNSPENT', miningUnspent)

    /* Find latest minting authority. */
    mintingAuth = miningUnspent.find(_unspent => {
        return _unspent.tokenidHex === NXY_ID_HEX && _unspent.tokens < BigInt(0)
    })
    console.log('MINTING AUTH', mintingAuth)

    return mintingAuth
}

const calcSubmission = (_miner, _outpointHash, _candidate) => {
    const myRaw = `${_miner}${_outpointHash}${_candidate}`
    // console.log('RAW', myRaw)

    let myHex = CryptoJS.enc.Hex.parse(myRaw)
    // let myHex = CryptoJS.enc.Hex.parse(`${_outpointHash}${_candidate}`)
    // console.log('MY HEX-1', myHex)

    let hash = CryptoJS.SHA1(myHex)
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
    let submission = hash.toString(CryptoJS.enc.Hex)
    // console.log('MY RIPEMD-160', submission)

    /* Return (final) submission. */
    return submission
}

const submitCandidate = async () => {
    console.log('STARTING MINER...')

    /* Initialize locals. */
    let candidate
    let errMsg
    let miner
    let mySubmission
    let outpointHash
    let response

    /* Reset errors. */
    errors = []

    /* Reset result. */
    txidem = null

    // TODO Decode script hash from wallet address.
    miner = hexToBin('0000000000000000000000000000000000000000')
    console.log('MINER', binToHex(miner))

    /* Generate new candidate. */
    // candidate = '0000000000000000000000000000000000000000000000000000000000000000'
    candidate = randomBytes(32)
    console.log('CANDIDATE', binToHex(candidate))

    // TODO Record candidates to (local) logs (for auditing).

    if (!mintingAuth?.outpoint) {
        return console.error('Loading mining parameters loading...')
    }

    /* Set flag. */
    isMining = true

    outpointHash = mintingAuth.outpoint
    outpointHash = reverseHex(outpointHash)
    console.log('OUTPOINT HASH', outpointHash)

    mySubmission = calcSubmission(miner, outpointHash, candidate)
    console.log('SUBMISSION', mySubmission)

    /* Submit candidate. */
    response = await miningSubmit(wallet, miner, candidate)
    console.log('SUBMISSION RESPONSE', response)

    /* Set flag. */
    isMining = false

    /* Validate response. */
    if (response.result) {
        txidem = response.result

    }

    /* Validate error. */
    if (response.error) {
        /* Validate error message. */
        if (response.error.message.includes('Script failed an OP_VERIFY operation')) {
            errMsg = 'Candidate failed! Please try again...'

            errors.push(errMsg)
            console.error(errMsg)
            return errMsg
        }

        if (response.error.message.includes('non-BIP68-final')) {
            errMsg = 'Please wait until the next Nexa block to submit your next Reward candidate.'

            errors.push(errMsg)
            console.error(errMsg)
            return errMsg
        }

        /* Display (unknown) error. */
        console.error(response.error.message)
    }
}

export default {
    type: GraphQLString,
    args: {
        hex: {
            type: GraphQLString,
            description: `Provide a hex-encoded (raw) transaction.`,
        },
    },
    resolve: async (_root, args, ctx) => {
        console.log('SUBMISSION ARGS:', args)
        await init()
        return await submitCandidate()
    },
    description: `Manage a Candidate Submission for a miner.`,
}
