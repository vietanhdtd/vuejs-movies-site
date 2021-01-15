<template>
  <!-- <w-spinner :value="loading" /> -->
  <w-flex v-if="movie.title" column class="detail-page">
    <teleport to="body">
      <div
        class="backdrop"
        :style="{
          backgroundImage: `url(${baseUrl + movie.backdrop_path})`,
        }"
      />
      <div class="dimmer-bg" />
    </teleport>

    <!-- <div v-if="!loading" class="go-back">
      <w-button class="mx2" :click="goBack">Go back</w-button>
    </div> -->
    <w-tabs
      :items="tabs"
      card
      color="blue-grey-light3"
      active-class="success-light1"
      bg-color="black"
      content-class="detail-page__content"
    >
      <template #item-content="{index}">
        <div class="blue-grey-light3">
          <div v-if="index === 1">
            <w-spinner bounce :value="loading" />
            <w-flex v-if="!loading">
              <w-flex column class="xs4" :style="{ paddingLeft: 0 }">
                <w-image
                  contain
                  :src="baseUrl + movie.poster_path"
                  width="350"
                  height="515"
                  :fallback="errorImage"
                />
              </w-flex>
              <w-flex column class="movie-info">
                <div column>
                  <p class="title1 success-light1 text-bold">{{ movie.title }}</p>
                  <p class="h5 success-light1 pb3">{{ movie.original_title }}</p>
                  <p class="h6 pb4">{{ movie.overview }}</p>
                </div>
                <div>
                  <w-flex class="py5">
                    <w-flex column>
                      <p class="h6 text-white-50">Release Date</p>
                      <p class="h4 success-light1 text-bold">{{ movie.release_date }}</p>
                    </w-flex>
                    <w-flex column>
                      <p class="h6 text-white-50">Vote Average</p>
                      <p class="h4 success-light1 text-bold">{{ movie.vote_average }}</p>
                    </w-flex>
                  </w-flex>
                  <w-flex>
                    <w-flex column class="xs6">
                      <p class="h6 text-white-50">Vote Count</p>
                      <p class="h4 success-light1 text-bold">{{ movie.vote_count }}</p>
                    </w-flex>
                    <w-flex column class="xs6">
                      <p class="h6 text-white-50">Original Language</p>
                      <p class="h4 success-light1 text-bold">{{ movie.original_language }}</p>
                    </w-flex>
                  </w-flex>
                </div>
              </w-flex>
            </w-flex>
          </div>
          <w-flex v-if="index == 2" class="px5" justify-center>
            <w-flex v-if="selectedKey">
              <YouTube :src="selectedKey" :width="480" :height="320" :host="host" />
              <w-list
                v-model="selectedKey"
                no-unselect
                :items="movieVideos"
                color="success-light1"
                class="mt6 mr4 px6 grow"
              />
            </w-flex>
            <p v-else class="text-center success-light1">no available trailer</p>
          </w-flex>
        </div>
      </template>
    </w-tabs>
  </w-flex>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
    const router = useRouter()
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

    const goBack = () => {
      router.back()
    }

    return {
      loading,
      movie,
      movieVideos,
      selectedKey,
      goBack,
      baseUrl: `https://image.tmdb.org/t/p/w500`,
      host: window.location.origin,
      errorImage: require('@/assets/logo.png'),
      tabs: [{ title: 'Info' }, { title: 'Trailers' }],
    }
  },
}
</script>

<style lang="scss">
.detail-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .go-back {
    min-width: 60vw;
    padding: 0 !important;
    transition: color 0.5s;
    &:hover {
      color: rgb(163, 129, 56) !important;
    }
    .back-img {
      width: 30px;
      height: 20px;
    }
    .link {
      cursor: pointer;
      display: inline;
      padding-bottom: 10px;
    }
  }
  .detail-page__content {
    background-color: black;
    min-height: 515px;
    box-shadow: 0 0 25px rgba(7, 7, 7, 0.8);
    border-radius: 10px !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border: none !important;
    // padding: 0 !important;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    min-width: 60vw;
    .movie-info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 20px !important;
    }
    .w-tabs__content {
      padding: 0 !important;
      width: 100%;
    }
  }
}
.backdrop {
  z-index: -2;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-size: cover;
  // transform: scale(1.1);
  // overflow: hidden;
  left: 0;
  // filter: blur(4px);
  // -webkit-filter: blur(4px);
}
.dimmer-bg {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  z-index: -1;
}
</style>
