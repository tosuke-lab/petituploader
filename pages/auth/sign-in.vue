<template>
  <v-container justify-center>
    <v-jumbotron color="grey lighten-2">
      <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-2">ログイン</h3>
          <v-divider class="my-3"/>
          <v-btn large color="primary" class="mx-0" @click="googleSignIn">Googleアカウントでログイン</v-btn>
        </v-flex>
      </v-layout>
      </v-container>
    </v-jumbotron>
  </v-container>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  head: {
    title: 'ログイン - Petit Uploader'
  },
  middleware: 'notauthenticated',
  methods: {
    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
      this.$router.push('/')
    }
  }
}
</script>

