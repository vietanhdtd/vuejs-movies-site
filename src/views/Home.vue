<template>
  <div class="home">
    <movie-card v-for="movie in listMovies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
// @ is an alias to /src
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { MovieCard } from '@/components'

export default {
  name: 'Home',
  components: {
    MovieCard,
  },

  setup() {
    const store = useStore()
    const listMovies = computed(() => store.state.movies.listMovies)
    console.log('listMovies: ', listMovies)

    onMounted(() => {
      store.dispatch('movies/getListDiscoverMovies')
    })

    return {
      listMovies,
    }
  },
}
</script>
