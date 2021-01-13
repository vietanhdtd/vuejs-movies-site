<template>
  <div class="home pt12">
    <w-flex class="py6 mla" :class="[{ xs12: searchMode }, { xs4: !searchMode }]">
      <w-input
        v-model="searchString"
        outline
        placeholder="Search"
        inner-icon-left="wi-search"
        @focus="searchMode = true"
      />
      <w-transition-slide left>
        <w-button v-if="searchMode" class="mx2" @click="onBlurInput">Go back</w-button>
      </w-transition-slide>
    </w-flex>
    <w-flex column align-start>
      <div v-if="searchMode">
        <w-spinner bounce :value="isSearching" />
        <p v-if="!isEmptySearchResult" class="title2">Latest search result</p>
        <p v-else-if="!isSearching" class="title2">nothing here</p>
      </div>
      <p v-else class="title1">{{ discover }}</p>
      <w-flex wrap class="px2">
        <movie-card v-for="movie in listMovies" :key="movie.id" v-model="movieID" :movie="movie" />
      </w-flex>
    </w-flex>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { MovieCard } from '@/components'
import debounce from 'lodash/debounce'
import router from '@/router'

export default {
  name: 'Home',
  components: {
    MovieCard,
  },

  setup() {
    const store = useStore()
    const searchString = ref('')
    const searchMode = ref(false)
    const movieID = ref('')
    const searchDebounce = 1000

    const searchResult = computed(() => store.getters['search/searchResult'])
    const isEmptySearchResult = computed(() => store.getters['search/isEmptySearchResult'])
    const listMovies = computed(() =>
      searchMode.value ? searchResult.value : store.getters['movies/getListMovies'],
    )

    onMounted(() => {
      store.dispatch('movies/getListDiscoverMovies')
    })

    const onBlurInput = () => {
      searchMode.value = false
      searchString.value = ''
    }

    watch(
      searchString,
      debounce(newValue => {
        if (newValue) {
          store.commit('search/setSearchStatus', true)
          store.commit('search/saveSearchResult', [])
          store.dispatch('search/searchMovies', newValue)
        }
      }, searchDebounce),
    )

    return {
      listMovies,
      isSearching: computed(() => store.getters['search/isSearching']),
      isEmptySearchResult,
      discover: 'Discover',
      searchResult,
      searchString,
      searchMode,
      onBlurInput,
      movieID,
    }
  },
}
</script>

<style scoped>
.home {
  height: 100vh;
}
</style>
