import * as api from '@/api'
import isEmpty from 'lodash/isEmpty'

// initial state
const state = () => ({
  movieDetail: {},
  loading: false,
})

// getters
const getters = {
  getVideosList: ({ movieDetail }) => {
    if (isEmpty(movieDetail.videos)) return []
    else return movieDetail.videos.results
  },
}

// actions
const actions = {
  async getMovieDetails({ commit }, movie_id) {
    commit('setLoading', true)
    const result = await api.getMovieDetails(movie_id)
    commit('setMovieDetails', result)
    commit('setLoading', false)
  },
}

// mutations
const mutations = {
  setMovieDetails(state, payload) {
    state.movieDetail = payload
  },
  setLoading(state, payload) {
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
