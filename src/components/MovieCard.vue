<template>
  <div class="movie-card md2 sm3" @click="onSelectMovie(movie.id)">
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
    movieID: { type: Number, default: null },
  },
  emits: ['update:movieID'],
  setup(_, { emit }) {
    const onSelectMovie = id => {
      emit('update:movieID', id)
    }

    return {
      baseUrl: `https://image.tmdb.org/t/p/w500`,
      errorImage: require('@/assets/logo.png'),
      onSelectMovie,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-card {
  border: 1px solid lightgray;
  margin: 10px;
  width: 15rem;
  min-height: 285px;
  transition: box-shadow 0.4s;
  transition: transform 0.4s;
  cursor: pointer;
  /* border: 1px solid rgba(77, 77, 77, 0.5) !important; */
  /* background-color: black !important; */
}
.movie-card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  transform: translateY(-0.35em);
}
</style>
