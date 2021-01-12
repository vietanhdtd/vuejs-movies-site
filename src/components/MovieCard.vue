<template>
  <div class="hello">
    <div>
      {{ movie.title }}
    </div>
    <img :src="url + movie.backdrop_path" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    movie: Object,
  },
  setup() {
    return {
      url: `https://image.tmdb.org/t/p/w500`,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
