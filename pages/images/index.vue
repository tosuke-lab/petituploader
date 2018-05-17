<template>
  <v-container>
    <span class="display-2"><v-icon large>info</v-icon>未読</span>
    <v-layout row wrap>
      <v-flex xs6 sm4 md3 lg2 v-for="image in unreadImages" :key="image.id">
        <nuxt-link :to="`/images/${image.id}`">
          <image-item class="ma-1" :id="image.id" :filename="image.filename"/>
        </nuxt-link>
      </v-flex>
    </v-layout>
    <v-divider/>
    <span class="display-2"><v-icon large>info</v-icon>既読</span>
    <v-layout row wrap>
      <v-flex xs6 sm4 md3 lg2 v-for="image in readImages" :key="image.id">
        <nuxt-link :to="`/images/${image.id}`">
          <image-item class="ma-1" :id="image.id" :filename="image.filename"/>
        </nuxt-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '~/plugins/firebase'
import user from '~/plugins/firebase'
import { mapState } from 'vuex'

import ImageItem from '~/components/ImageItem'

export default {
  components: {
    ImageItem
  },
  middleware: 'authenticated',
  head: {
    title: '画像 - Petit Uploader'
  },
  fetch({ store }) {
    return store.dispatch('initImages')
  },
  computed: {
    ...mapState(['images']),
    unreadImages() {
      return this.images.filter(image => image.unread)
    },
    readImages() {
      return this.images.filter(image => !image.unread)
    }
  }
}
</script>

