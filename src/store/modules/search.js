import * as api from '@/api'
import isEmpty from 'lodash/isEmpty'

// initial state
const state = () => ({
  result: [],
  searchStrings: [],
  isSearching: false,
})

// getters
const getters = {
  searchResult(state) {
    return state.result
  },
  isSearching: state => state.isSearching,
  getListSearchStrings: state => state.searchStrings,
  isEmptySearchResult: state => isEmpty(state.result),
}

// actions
const actions = {
  async searchMovies({ commit }, searchString) {
    commit('setSearchStatus', true)
    commit('setSearchResult', [])
    const result = await api.searchMovies(searchString)
    commit('setSearchResult', result)
    commit('saveSearchString', { label: searchString, value: searchString })
    commit('setSearchStatus', false)
  },
}

// mutations
const mutations = {
  setSearchStatus(state, payload) {
    state.isSearching = payload
  },
  setSearchResult(state, payload) {
    state.result = payload.results
  },
  saveSearchString(state, payload) {
    if (state.searchStrings.length > 4) state.searchStrings.pop()
    state.searchStrings.push(payload)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
