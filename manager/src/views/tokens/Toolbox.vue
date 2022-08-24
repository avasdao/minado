<template>
    <div class="animated fadeIn">
        <b-card>
            <div slot="header">
                <strong>Toolbox</strong>
            </div>

            <b-tabs>

            <!-- SOCLII -->
                <b-tab active>
                    <template slot="title">
                        <i class="icon-bubbles"></i>
                    </template>

                    {{soclii}}
                </b-tab>

            <!-- CALCULATOR -->
                <b-tab>
                    <template slot="title">
                        <i class="icon-calculator"></i>
                    </template>

                    <b-card>
                        <div slot="header">
                            <strong>Profit Calculator</strong>
                        </div>

                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label for="name">Name</label>
                                    <b-form-input type="text" id="name" placeholder="Enter your name"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label for="ccnumber">Credit Card Number</label>
                                    <b-form-input type="text" id="ccnumber" placeholder="0000 0000 0000 0000"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="4">
                                <b-form-group >
                                    <label for="month1">Month</label>
                                    <b-form-select id="month1"
                                        :plain="true"
                                        :options="[1,2,3,4,5,6,7,8,9,10,11,12]">
                                    </b-form-select>
                                </b-form-group>
                            </b-col>

                            <b-col sm="4">
                                <b-form-group>
                                    <label for="year1">Year</label>
                                    <b-form-select id="year1"
                                        :plain="true"
                                        :options="[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]">
                                    </b-form-select>
                                </b-form-group>
                            </b-col>

                            <b-col sm="4">
                                <b-form-group>
                                    <label for="cvv">CVV/CVC</label>
                                    <b-form-input type="text" id="cvv" placeholder="123"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-tab>

            <!-- SOLO (WEB) MINING -->
                <b-tab>
                    <template slot="title">
                        <i class="icon-speedometer"></i>
                    </template>

                    <b-form-group>
                        <label for="name">Minter's Address</label>
                        <b-form-input type="text" id="name" v-model="minter" placeholder="Enter minter's Ethereum address" ></b-form-input>
                    </b-form-group>

                    <button @click="startMining">Start Token Mining</button>

                    <hr />

                    <h3>Difference In Mining</h3>

                    <h5>Solo (Web) Mining</h5>
                    <ul>
                        <li>
                            Slow
                        </li>
                        <li>
                            Avg Solve Time: 5 minutes
                        </li>
                        <li>
                            Recommeded For: Development &amp; Testing
                        </li>
                    </ul>

                    <h5>Pool (CPU) Mining</h5>
                    <ul>
                        <li>
                            Faster
                        </li>
                        <li>
                            Avg Solve Time: 8.88 seconds
                        </li>
                        <li>
                            Recommeded For: Beginner Miners
                        </li>
                    </ul>

                    <h5>Pool (GPU) Mining</h5>
                    <ul>
                        <li>
                            Fastest
                        </li>
                        <li>
                            Avg Solve Time: &lt; 1 second
                        </li>
                        <li>
                            Recommeded For: Intermediate to Advanced Miners
                        </li>
                    </ul>
                </b-tab>

            <!-- CHARTS & STATS -->
                <b-tab>
                    <template slot="title">
                        <i class="icon-chart"></i>
                    </template>

                    <ol>
                        <li>
                            Current Difficulty: <strong>{{difficulty}}</strong>
                        </li>
                        <li>
                            Rewards Until Re-adjustment - 117 (~1.8 days)
                        </li>
                        <li>
                            Current Average Reward Time - 22.19 minutes
                        </li>
                        <li>
                            Tokens Minted - 4,806,900 - 0xBTC
                        </li>
                        <li>
                            Current Mining Reward - 50 0xBTC
                        </li>
                        <li>
                            Total Supply - 20,999,983.69 0xBTC
                        </li>
                        <li>
                            Token Holders - 5,572 holders
                        </li>
                        <li>
                            Mined - 4,710,000 0xBTC<br />
                            $986,860.04 in 94,200 mints
                        </li>
                        <li>
                            Transfers - $5,190,946.56 in 200,014 transfers
                        </li>
                    </ol>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
/* Import modules. */
import crypto from 'crypto'
import { ethers } from 'ethers'
import moment from 'moment'
import numeral from 'numeral'
import superagent from 'superagent'

/* Initialize constants. */
const ENDPOINT = 'https://matrix.0net.io'
const MAX_HASHING_ATTEMPTS = 5000000 // FOR DEVELOPMENT PURPOSES ONLY

const challenge = '56813600969275876395040021027944058217523511004702118911823573964919978668773'
const challengeBN = ethers.utils.bigNumberify(challenge)

export default {
    components: {
        //
    },
    data: () => ({
        /* Minter (ETH) Address */
        minter: '',

        soclii: '',

        /* Matrix Guest Access */
        guestUserId: '',
        guestAccessToken: '',

        difficulty: 0,
        found: false,
        numTries: 0,
        startTime: 0,
        completeTime: 0
    }),
    methods: {
        init () {
            /* Load stats. */
            this.loadStats()
        },
        async loadStats () {
            /* Initialize contract ABI. */
            // const abi = require('../../../contracts/_0xBitcoinToken.json')
            // const abi = require('../../../contracts/Minado.json')
            const abi = null

            /* Initialize blockchain provider. */
            const provider = ethers.getDefaultProvider()

            /* Initialize (token) contract address. */
            // const contractAddress = '0xB6eD7644C69416d67B522e20bC294A9a9B405B31' // 0xBitcoin Token
            const contractAddress = '0x6f9dcA2Bdc1D9878E6A1D54446DA47758e54f89b' // Minado
            const tokenAddress = '0x6ef5bca539A4A01157af842B4823F54F9f7E9968' // ZEROGOLD

            /* Initialize contract. */
            const contract = new ethers.Contract(contractAddress, abi, provider)

            /* Retrieve difficulty. */
            // let difficulty = await contract.getMiningDifficulty() // 0xToken
            let difficulty = await contract.getDifficulty(tokenAddress) // Minado

            /* Set (formatted) difficulty. */
            this.difficulty = ethers.utils.commify(difficulty.toString())

            console.log('Mining Difficulty', this.difficulty)
        },
        startMining () {
            console.log('MINTER ADDRESS', this.minter)
            /* Validate minter address. */
            if (this.minter === '') {
                return console.error('Oops! You MUST specify a Minter Address to continue.')
            } else {
                console.info('Start mining..')
            }

            /* Set flag. */
            this.found = false

            /* Initialize try counter. */
            this.numTries = 0

            /* Initialize start time. */
            this.startTime = moment().unix()

            /* Start hashing loop. */
            while (this.numTries < MAX_HASHING_ATTEMPTS && !this.found) {
                /* Increment counter. */
                this.numTries++

                if (this.numTries % 25000 === 0) {
                    /* Calculate hashing duration. */
                    let duration = moment().unix() - this.startTime

                    console.log(`${numeral(this.numTries).format('0[.]0a')} hashes made in [ ${duration} ] seconds.`)
                }

                /* Try the next solution. */
                this.tryNextSolution()
            }

            if (this.numTries >= MAX_HASHING_ATTEMPTS) {
                /* Stop mining. */
                this.stopMining()
            }
        },
        stopMining () {
            /* Set flag. */
            this.found = true

            this.completeTime = moment().unix()

            /* Calculate hashing duration. */
            const duration = this.completeTime - this.startTime

            console.log(`All done hashing [ ${numeral(this.numTries).format('0,0')} ] solutions in [ ${duration} ] seconds.`)

            const hashesPerSecond = numeral(this.numTries / duration).format('0[.]0a')

            console.log(`Average hash time was [ ${hashesPerSecond} ] hashes/sec`)
        },
        tryNextSolution () {
            // let rnd = ethers.utils.keccak256(ethers.utils.id(this.numTries.toString()))
            let rnd = ethers.utils.keccak256(crypto.randomBytes(256))

            // console.log('RANDOM BYTES', rnd)

            const digest = ethers.utils.solidityKeccak256([
                'bytes32',
                'address',
                'bytes32'
            ], [
                challengeBN,
                this.minter,
                rnd
            ])

            // console.log('NEW DIGEST', digest)

            /* Calculate (big number) digest. */
            const digestBN = ethers.utils.bigNumberify(digest)

            /* Initialize target. */
            // const target = '0x400000000000000000000000000000000000000000000000000000000000' // 2^238 (1min)
            // const target = '0x100000000000000000000000000000000000000000000000000000000000' // 2^236 (5min)
            // const target = '0x080000000000000000000000000000000000000000000000000000000000' // 2^235 (10min)
            const target = '0x040000000000000000000000000000000000000000000000000000000000' // 2^234 (20min)

            /* Calculate (big number) target. */
            const targetBN = ethers.utils.bigNumberify(target)

            /* Validate solution. */
            if (digestBN.lte(targetBN)) {
                console.log('\n\n*** WHOOOOO HOOOOOO, WE GOT A SOLUTION!!!\n\n')

                console.log(rnd, digestBN.toHexString())

                /* Stop mining. */
                this.stopMining()
            }
        },

        /**
         * Initialize Matrix
         */
        initMatrix ()  {
            superagent
                .post('https://matrix.0net.io/_matrix/client/r0/register?kind=guest')
                .send({}) // sends a "empty" JSON post body
                .set('accept', 'json')
                .end((err, res) => {
                    if (err) return console.error(err)

                    if (res) {
                        // return console.log('RESPONSE', res)

                        if (res.body) {
                            let body = res.body

                            console.log('BODY', body)

                            this.soclii = body

                            /* Set "guest" user id. */
                            this.guestUserId = body.user_id

                            /* Set "guest" access token. */
                            this.guestAccessToken = body.access_token

                            console.log('ACCESS TOKEN', this.guestAccessToken)

                            // this.listenToMatrix()
                        }
                    }
                })
        },

        /**
         * Listen to Matrix
         */
        listenToMatrix () {
            /* Initialize SDK. */
            const sdk = require("matrix-js-sdk")

            /* Initialize client. */
            // const client = sdk.createClient(ENDPOINT)

            const client = sdk.createClient({
                   baseUrl: ENDPOINT,
                   accessToken: this.guestAccessToken,
                   userId: this.guestUserId
               })

            let roomId = '!yhQELvefyJEctWSEGT:matrix.0net.io' // ZeroGold

            // client.publicRooms((err, data) => {
            //     // console.log("Public Rooms: %s", JSON.stringify(data));
            //
            //     this.soclii = JSON.stringify(data)
            // })

            client.on('Room.timeline', function (event, room, toStartOfTimeline) {
                if (toStartOfTimeline) {
                    return; // don't print paginated results
                }

                if (event.getType() !== 'm.room.message') {
                    return; // only print messages
                }

                console.log(
                    // the room name will update with m.room.name events automatically
                    '(%s) %s :: %s', room.name, event.getSender(), event.getContent().body
                )
            })

            client.startClient()
        }
    },
    mounted: async function () {
        /* Initialize. */
        this.init()

        this.initMatrix()
        // this.listenToMatrix()
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
