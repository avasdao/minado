const { v4: uuidv4 } = require('uuid')

const requests = {}

function sleep (_ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, _ms)
    })
}

const parseBlock = (_rawBlock) => {
    if (!this.isHex(_rawBlock)) {
        return
    }

    const block = _rawBlock

    const version = block.slice(0, 2)
    console.info('Block version:', version, parseInt(version, 16))

    const inputCount = block.slice(2, 4)
    console.info('Block input count:', inputCount, parseInt(inputCount, 16))

    // const val1 = block.slice(4, 4 + (parseInt(inputCount, 16) * 2))
    // console.info('Block value #1:', val1)
}

export const state = () => ({
    socket: null,
    address: null,
    balance: 0,
    requests: {}
})

export const getters = {
    getAddress (state) {
        return state.address
    },

    getBalance (state) {
        return state.balance
    },

    getRequests (state) {
        return state.requests
    }
}

export const mutations = {
    /**
     * Connect
     *
     * @param {Object} state
     */
    connect (state) {
        const target = 'electrum.nexa.org:20003'
        // const target = 'rostrum.devops.cash:20003'

        /* Initialize socket connection to Electrum/Rostrum server. */
        console.info('Connecting to Rostrum...') // eslint-disable-line no-console
        state.socket = new WebSocket(`ws://${target}`)
    },

    add (state, text) {
        state.list.push({
            text,
            done: false
        })
    },

    remove (state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1)
    },

    toggle (state, todo) {
        todo.done = !todo.done
    },

    saveAddress (state, _address) {
        state.address = _address
    },

    saveBalance (state, _balance) {
        state.balance = _balance
    },

    saveRequest (state, _data) {
        console.log('SAVING REQUEST', _data)
        state.requests[_data.id] = _data.result
    }
}

export const actions = {
    async init ({ state, commit }) {
        await commit('connect')

        /* Handle open connection. */
        state.socket.onopen = () => {
            console.info('Rostrum socket is now connected!') // eslint-disable-line no-console

            // const txBytes = '3feb2e20a908ccd7d31f84224276b02f2c3951ed3448da58722a107ec4ab393c'
            // const txid = txBytes.match(/[a-fA-F0-9]{2}/g).reverse().join('')

            // request = `{"method":"blockchain.transaction.get","params":["66ce81cec5a010e151c68d63bd135133cd54cc5f4904817c738a4a19986ccb0c",true],"id":"${uuidv4()}"}`
            // request = `{"method":"blockchain.transaction.get","params":["${txid}",true],"id":"${uuidv4()}"}`
            // state.socket.send(request + '\n')

            // NOTE: Subscribe to receive block headers when a new block is found.
            // const request = `{"method":"","params":[""],"id":"${uuidv4()}"}`
            // console.log('REQUEST-002', request)
            // state.socket.send(request + '\n')

            // const params = []
            // handleRequest('blockchain.headers.subscribe', params)

            const id = uuidv4()
            console.log('DESPERATE ID', id)

            /* Build request. */
            const request = {
                id,
                method: 'blockchain.scripthash.get_balance',
                params: ['0e33d265daaf366401c44995e37b7757d46fb0fef8430524766e56a608c5a54e']
            }
            state.socket.send(JSON.stringify(request) + '\n')
        }

        /* Handle message. */
        state.socket.onmessage = (msg) => {
            console.log('ROSTRUM SOCKET ONMESSAGE', msg)

            let data
            let request
            let result
            let params

            if (msg && msg.data) {
                try {
                    data = JSON.parse(msg.data)
                    console.log('DATA MESSAGE', data)

                    if (data && data.result) {
                        result = data.result
                        console.log('MESSAGE RESULT', data.id, result)

                        if (requests[data.id]) {
                            // console.log('FOUND', requests[data.id])

                            request = requests[data.id]

                            if (request && request.method === 'blockchain.scripthash.get_balance') {
                                // balance = result.confirmed
                                commit('saveRequest', {
                                    id: data.id,
                                    result
                                })
                            }
                        }

                        // TODO: Validate result isHex
                        // parseTx(result)
                    }

                    if (data && data.params) {
                        params = data.params
                        console.log('PARAMS', params)
                    }

                    if (params && params[0].height) {
                        console.log('NEW BLOCK', params[0])

                        // TODO: Validate result isHex
                        parseBlock(params[0].hex)

                        const height = parseInt(params[0].height)
                        console.log('HEIGHT', height)

                        if (height > 0) {
                            // let request

                            // request = `{"method":"blockchain.block.header","params":[${height}],"id":"${uuidv4()}"}`
                            // state.socket.send(request + '\n')
                        }
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        }

        /* Handle connection close. */
        state.socket.onclose = function () {
            console.log('ROSTRUM SOCKET ONCLOSE')
        }

        /* Handle connection error. */
        state.socket.onerror = function (e) {
            console.log('ROSTRUM SOCKET ONERROR', e)
        }
    },

    /**
     * Make Request
     *
     * Make an on-chain request using the Electrum/Ropsten node.
     *
     * @param {Object} constructors
     * @param {*Object _request
     * @returns
     */
    async makeRequest ({ state, commit }, _request) {
        // state.socket.send(JSON.stringify(_request) + '\n')

        /* Generate unique id. */
        const id = uuidv4()

        /* Build request. */
        const request = {
            id,
            method: _request.method,
            params: _request.params
        }
        // console.log('ROSTRUM (makeRequest):', request)

        /* Save request. */
        commit('saveRequest', request)

        /* Make request. */
        // console.log('SOCKET READY STATE', state.socket.readyState)
        // FIXME Add protection against infinite loop.
        while (state.socket.readyState !== 1) {
            console.log('sleeping..')
            await sleep(1000)
        }
        // console.log('SOCKET READY STATE', state.socket.readyState)
        state.socket.send(JSON.stringify(request) + '\n')

        /* Return request id. */
        return id
    },

    setAddress ({ state, commit }, _address) {
        commit('saveAddress', _address)
    }
}
