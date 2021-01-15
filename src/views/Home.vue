<template>
  <div class="home">
    <w-flex class="py6 mra" :class="[{ xs12: searchMode }, { xs4: !searchMode }]">
      <w-transition-slide right>
        <w-button v-if="searchMode" class="mx2" @click="onBlurInput">Go back</w-button>
      </w-transition-slide>
      <w-input
        v-model="searchString"
        outline
        :items="listSearchStrings"
        placeholder="Search"
        inner-icon-left="wi-search"
        @focus="searchMode = true"
      />
    </w-flex>
    <w-flex column>
      <div v-if="searchMode">
        <w-flex justify-center column>
          <w-spinner bounce :value="isSearching" />
          <p v-if="!isEmptySearchResult" class="title2">Latest search result</p>
          <w-list v-else-if="!isSearching" :items="listSearchStrings" no-unselect class="px6 grow" />
        </w-flex>
      </div>

      <p v-else class="title1">{{ discover }}</p>
      <w-flex wrap class="px2">
        <movie-card v-for="movie in listMovies" :key="movie.id" v-model:movieID="movieID" :movie="movie" />
      </w-flex>
      <div v-if="!searchMode" ref="bottomRef" :style="{ height: '200px' }">
        <w-flex justify-center column class="py5" align-center>
          <w-spinner bounce :value="loading" />
          <p v-if="!loading" className="text-center">
            Scroll down to load more movies ...
          </p>
        </w-flex>
      </div>
    </w-flex>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { MovieCard } from '@/components'
import debounce from 'lodash/debounce'
import { useRouter } from 'vue-router'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'Home',
  components: {
    MovieCard,
  },

  setup() {
    const store = useStore()
    const router = useRouter()

    const searchString = ref('')
    const searchMode = ref(false)
    const movieID = ref(null)

    const bottomRef = ref(null)
    const prevY = ref(0)
    const timeout = ref(null)

    const searchDebounce = 1000

    const searchResult = computed(() => store.getters['search/searchResult'])
    const isEmptySearchResult = computed(() => store.getters['search/isEmptySearchResult'])
    const listMovies = computed(() =>
      searchMode.value ? searchResult.value : store.getters['movies/getListMovies'],
    )

    const observer = new IntersectionObserver(
      entries => {
        const firstEntry = entries[0]
        const y = firstEntry.boundingClientRect.y
        if (prevY.value > y) {
          timeout.value = setTimeout(loadMore, 1000)
        }
        prevY.value = y
      },
      { threshold: 0.9 },
    )

    const loadMore = () => {
      store.dispatch('movies/getListDiscoverMovies')
    }

    onMounted(() => {
      if (isEmpty(listMovies.value)) store.dispatch('movies/getListDiscoverMovies')
    })

    const onBlurInput = () => {
      searchMode.value = false
      searchString.value = ''
    }

    watch(movieID, id => {
      store.commit('details/setMovieDetails', {})
      router.push(`/details/${id}`)
    })

    watch(
      searchString,
      debounce(newValue => {
        if (newValue) {
          store.dispatch('search/searchMovies', newValue)
        }
      }, searchDebounce),
    )

    watch(bottomRef, (newValue, oldValue) => {
      if (newValue) {
        observer.observe(newValue)
      } else {
        observer.unobserve(oldValue)
      }
    })

    onBeforeUnmount(() => {
      if (!searchMode.value) {
        observer.unobserve(bottomRef.value)
        clearTimeout(timeout.value)
      }
    })

    return {
      listMovies,
      isSearching: computed(() => store.getters['search/isSearching']),
      listSearchStrings: computed(() => store.getters['search/getListSearchStrings']),
      loading: computed(() => store.getters['movies/getLoadingStatus']),
      isEmptySearchResult,
      discover: 'Discover',
      searchResult,
      searchString,
      searchMode,
      onBlurInput,
      movieID,
      bottomRef,
    }
  },
}
</script>

<style scoped>
.home {
  height: 100vh;
}
</style>
