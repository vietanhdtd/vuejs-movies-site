<template>
  <w-spinner :value="loading" />
  <w-flex v-if="movie.title" column class="pt12">
    <p class="title1">{{ movie.title }}</p>
    <w-flex v-if="selectedKey">
      <YouTube :src="selectedKey" :width="480" :height="320" :host="host" />
      <w-list
        v-model="selectedKey"
        no-unselect
        :items="movieVideos"
        color="deep-purple"
        class="mt6 mr4 px6 grow"
      />
    </w-flex>
    <p v-else>no available trailer</p>
  </w-flex>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import YouTube from 'vue3-youtube'
import isEmpty from 'lodash/isEmpty'

export default {
  components: {
    YouTube,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const selectedKey = ref('')

    const loading = computed(() => store.state.details.loading)
    const movie = computed(() => store.state.details.movieDetail)
    const movieVideos = computed(() => {
      const listVideos = store.getters['details/getVideosList']
      return listVideos.map(({ name, key }) => {
        return { label: name, value: key }
      })
    })
    watch(movieVideos, newList => {
      if (!isEmpty(newList)) {
        selectedKey.value = newList[0].value
      }
    })

    onMounted(() => {
      store.dispatch('details/getMovieDetails', route.params.id)
    })

    return {
      loading,
      movie,
      movieVideos,
      selectedKey,
      host: window.location.origin,
    }
  },
}
</script>
