<template>
  <v-card v-ripple @click="dialog=true">
    <v-card-media v-if="loaded" :src="src" height="20vh"/>
    <v-card-title primary-title class="article-title fade-out">
      <v-tooltip bottom>
        <span slot="activator">{{ filename }}</span>
        {{ filename }}
      </v-tooltip>
    </v-card-title>
  </v-card>
</template>

<script>
import vuex from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  props: {
    id: String,
    filename: String
  },
  data() {
    return {
      loaded: false,
      src: ''
    }
  },
  created() {
    this.updateSrc(this.id)
  },
  watch: {
    async id(newId) {
      this.updateSrc(newId)
    }
  },
  methods: {
    async updateSrc(id) {
      if (id in this.$store.state.imageURLs) {
        this.src = this.$store.state.imageURLs[id]
      } else {
        const ref = firebase.storage().ref(id)
        this.src = await ref.getDownloadURL()
        this.$store.commit('setURL', { id, url: this.src })
      }
      this.loaded = true
    }
  }
}
</script>

<style scoped>
.article-title {
  display: block;
  overflow: hidden;
  white-space: nowrap;
}

.fade-out {
  display: block;
  position: relative;
}

.fade-out::after {
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  width: 30px;
  content: '';
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
}
</style>


