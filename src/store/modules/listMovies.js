import * as api from '@/api'
// initial state
const state = () => ({
  listMovies: [],
})

// getters
const getters = {
  getListMovies(state) {
    return state.listMovies
  },
}

// actions
const actions = {
  getListDiscoverMovies({ commit }) {
    api.getListDiscoverMovies().then(result => {
      commit('saveListMovies', result)
    })
  },
}

// mutations
const mutations = {
  saveListMovies(state, payload) {
    state.listMovies = [...state.listMovies, ...payload.results]
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
