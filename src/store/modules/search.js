import * as api from '@/api'
import isEmpty from 'lodash/isEmpty'

// initial state
const state = () => ({
  result: [],
  isSearching: false,
})

// getters
const getters = {
  searchResult(state) {
    return state.result
  },
  isSearching: state => state.isSearching,
  isEmptySearchResult: state => isEmpty(state.result),
}

// actions
const actions = {
  async searchMovies({ commit }, searchString) {
    const result = await api.searchMovies(searchString)
    commit('saveSearchResult', result)
    commit('setSearchStatus', false)
  },
}

// mutations
const mutations = {
  setSearchStatus(state, payload) {
    state.isSearching = payload
  },
  saveSearchResult(state, payload) {
    state.result = payload.results
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
