<template>
  <w-app :style="{ height: '100vh' }">
    <Header />
    <div class="px10 pt12" :style="{ height: '100%' }">
      <router-view />
    </div>
  </w-app>
</template>

<script>
import { Header } from '@/components'

export default {
  components: {
    Header,
  },
  setup() {
    return {
      title: 'Movies Time',
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  max-width: 1200px;
  margin: auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
