<template>
  <div class="movie-card md2 sm3">
    <w-image contain lazy :src="baseUrl + movie.poster_path" :ratio="1030 / 686" :fallback="errorImage" />
    <p>
      {{ movie.title }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    movie: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    console.log('props: ', props)
    return {
      baseUrl: `https://image.tmdb.org/t/p/w500`,
      errorImage: require('@/assets/logo.png'),
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-card {
  border: 1px solid lightgray;
  margin: 10px;
}
</style>
