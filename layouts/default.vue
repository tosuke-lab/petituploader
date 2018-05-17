<template>
  <v-app>
    <Header/>
    <main>
      <v-content>
        <nuxt/>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    Header
  }
}
</script>

