/* Import modules. */
import { Wallet } from '@nexajs/wallet'

// import createGroup from './src/createGroup.js'
// import meltGroup from './src/meltGroup.js'
// import mintGroup from './src/mintGroup.js'
// import mintSubgroup from './src/mintSubgroup.js'
// import signMessage from './src/signMessage.js'

console.log('Starting Minado Daemon...')

const sleep = ms => new Promise(r => setTimeout(r, ms))

const IS_LIVE_BROADCAST = false
const ACTIVE_ACCOUNT_IDX = 0
// 0 - nexa:nqtsq5g5s2ekh5wwcwzvs6470tt6v2ar0dvh7qjj9jsnl3sk (master)
// 1 - nexa: (minting)
// 2 - nexa: (melting)
// 3 - nexa: (persona)

;(async () => {
    /* Initialize locals. */
    let wallet

    /* Initialize wallet. */
    wallet = await Wallet.init({
        path: `m/44'/29223'/${ACTIVE_ACCOUNT_IDX}'/0/0`,
        mnemonic: process.env.MNEMONIC,
    }, false)

    console.log('\nWALLET ADDRESS', wallet.address, '\n')

    /* Wait for race condition. */
    await sleep(1_000)

    if (ACTIVE_ACCOUNT_IDX === 0) {
        // createGroup()
    }

    if (ACTIVE_ACCOUNT_IDX === 1) {
        mintGroup(
            wallet,
            'nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug', // Shomari (Robin Hood)
            500_000_000,
            IS_LIVE_BROADCAST,
        )

        // mintSubgroup(
        //     wallet,
        //     'nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug', // Shomari (Robin Hood)
        //     100_000_000,
        //     IS_LIVE_BROADCAST,
        // )
    }

    if (ACTIVE_ACCOUNT_IDX === 2) {
        setTimeout(() => {
            meltGroup(wallet, IS_LIVE_BROADCAST)
        }, 3_000)
    }

    if (ACTIVE_ACCOUNT_IDX === 3) {
        // signMessage()
    }
})()
