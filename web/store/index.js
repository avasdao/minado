export const state = () => ({
    version: 20221014
})

export const getters = {
    getVersion (state) {
        return state.version
    }
}

export const mutations = {
    increment (state) {
        state.counter++
    }
}

export const actions = {
    fetchCounter ({ state }) {
        // make request
        const res = { data: 10 }
        state.counter = res.data
        return res.data
    }
}
