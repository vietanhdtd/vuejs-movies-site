<template>
  <w-toolbar shadow fixed>
    <div class="title2">
      <router-link to="/">
        {{ title }}
      </router-link>
    </div>
    <div class="spacer"></div>
  </w-toolbar>
</template>

<script>
export default {
  setup() {
    return {
      title: 'Movies Time',
    }
  },
}
</script>
