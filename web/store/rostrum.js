// const moment = require('moment')
const { v4: uuidv4 } = require('uuid')

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
}

export const state = () => ({
    socket: null,
    address: null,
    balance: 0,
    requests: {},
    lastRequest: null,
    promises: {}
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
    },

    getLastRequest (state) {
        return state.lastRequest
    },

    getPromises (state) {
        return state.promises
    }
}

export const mutations = {
    /**
     * Connect
     *
     * @param {Object} state
     */
    connect (state) {
        // const target = 'electrum.nexa.org:20004'
        const target = 'rostrum.devops.cash:20004'

        /* Initialize socket connection to Electrum/Rostrum server. */
        console.info('Connecting to Rostrum...') // eslint-disable-line no-console
        state.socket = new WebSocket(`wss://${target}`)
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

        const data = { ..._data } // clone object

        const id = data.id

        delete data.id

        state.requests[id] = data
        // state.lastRequest = moment().valueOf()
    },

    savePromises (state, _promises) {
        state.promises = _promises
    }
}

export const actions = {
    async init ({ state, commit }) {
        if (!process.browser) {
            return
        }

        /* Request WebSocket connection to Rostrum. */
        await commit('connect')

        /* Handle open connection. */
        state.socket.onopen = () => {
            console.info('Rostrum socket is now connected!') // eslint-disable-line no-console
        }

        /* Handle message. */
        state.socket.onmessage = (msg) => {
            // console.log('ROSTRUM SOCKET ONMESSAGE', msg)

            let data
            let result
            let params

            if (msg && msg.data) {
                try {
                    data = JSON.parse(msg.data)
                    // console.log('DATA MESSAGE', data)

                    if (data && data.result) {
                        result = data.result
                        // console.log('MESSAGE RESULT', data.id, result)

                        /* Validate promise. */
                        if (state.promises[data.id]) {
                            // console.log('FOUND', state.requests[data.id])

                            /* Retrieve the promise. */
                            const promise = state.promises[data.id]

                            /* Call the resolver. */
                            promise.resolve(result)

                            /* Delete the promise. */
                            delete state.promises[data.id]
                        }
                    }

                    if (params && params[0].height) {
                        console.log('NEW BLOCK', params[0])

                        // TODO: Validate result isHex
                        parseBlock(params[0].hex)

                        const height = parseInt(params[0].height)
                        console.log('HEIGHT', height)
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
    async makeRequest ({ state, commit, getters }, _request) {
        const _addPromise = (_id, _promise) => {
            const promises = getters.getPromises

            promises[_id] = _promise

            commit('savePromises', promises)
        }

        const myPromise = {
            resolve: null,
            reject: null
        }

        const myRequest = new Promise((resolve, reject) => {
            myPromise.resolve = resolve
            myPromise.reject = reject
        })

        /* Generate unique id. */
        const id = uuidv4()

        /* Add promise. */
        _addPromise(id, myPromise)

        /* Build request. */
        const request = {
            id,
            method: _request.method,
            params: _request.params
        }
        // console.log('ROSTRUM (makeRequest):', request)

        /* Save request. */
        // commit('saveRequest', request)

        /* Make request. */
        // console.log('SOCKET READY STATE', state.socket.readyState)
        // FIXME Add protection against infinite loop.
        while (state.socket.readyState !== 1) {
            console.log('WebSocket is NOT ready, sleeping..')
            await sleep(1000)
        }
        // console.log('SOCKET READY STATE', state.socket.readyState)
        state.socket.send(JSON.stringify(request) + '\n')

        /* Return request id. */
        return myRequest
    },

    setAddress ({ state, commit }, _address) {
        commit('saveAddress', _address)
    },

    setBalance ({ state, commit }, _balance) {
        commit('saveBalance', _balance)
    }
}
