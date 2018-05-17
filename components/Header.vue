<template>
  <header>
    <v-toolbar app fixed color="primary">
      <v-toolbar-title>
        <nuxt-link to="/images">
          <span class="text--primary">Petit Uploader</span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <nuxt-link to="/">
        <v-icon x-large dark>settings</v-icon>
      </nuxt-link>
      <v-menu v-if="user !== null" offset-y>
        <v-avatar slot="activator" size="43" class="mx-1">
          <img :src="user.photoURL"/>
        </v-avatar>
        <v-list>
          <v-btn @click="signout">ログアウト</v-btn>
          <v-btn @click="deleteUser">退会する</v-btn>
        </v-list>
      </v-menu>
    </v-toolbar>
  </header>
</template>

<script>
import firebase from '~/plugins/firebase'
import user from '~/plugins/user'

export default {
  data() {
    return {
      user: null
    }
  },
  mounted() {
    user().then(usr => {
      this.user = usr
    })
  },
  methods: {
    async signout() {
      await firebase.auth().signOut()
      this.user = null
      this.$router.push('/auth/sign-in')
    },
    async deleteUser() {
      await this.user.delete()
      await this.signout()
    }
  }
}
</script>

