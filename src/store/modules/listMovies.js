import * as api from '@/api'
// initial state
const state = () => ({
  page: 0,
  listMovies: [],
  total_pages: '',
  loading: false,
})

// getters
const getters = {
  getListMovies(state) {
    return state.listMovies
  },
  getLoadingStatus: state => state.loading,
}

// actions
const actions = {
  getListDiscoverMovies({ commit, state }) {
    commit('setLoadingStatus', true)
    api.getListDiscoverMovies(state.page + 1).then(result => {
      commit('saveListMovies', result)
      commit('setLoadingStatus', false)
    })
  },
}

// mutations
const mutations = {
  saveListMovies(state, payload) {
    state.page = payload.page
    state.total_pages = payload.total_pages
    state.listMovies = [...state.listMovies, ...payload.results]
  },
  setLoadingStatus(state, payload) {
    state.loading = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
