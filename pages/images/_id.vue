<template>
  <v-container>
    <img :src="src"/>
  </v-container>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
  head: {
    title: `Petit Uploader`
  },
  async asyncData({ store, route }) {
    const id = route.params.id
    await store.dispatch('readImage', { id })
    return {
      src: store.state.imageURLs[id]
    }
  },
  data() {
    return {
      loading: true,
      id: this.$route.params.id
    }
  },
}
</script>

<style scoped>
img {
  width: 100%;
  max-width: 100%;
  height: auto;
}
</style>


