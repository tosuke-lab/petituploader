<template>
  <v-content>
    <v-flex column>
      <span class="display-2"><v-icon large>info</v-icon>設定方法</span><br>
      <span class="headline">下のQRコードをカメラで読み取り、お気に入りに追加してください。</span>
      <v-layout justify-center>
        <q-r-code :text="url"/>
      </v-layout>
    </v-flex>
  </v-content>
</template>

<script>
import QRCode from '~/components/QRCode'
import user from '~/plugins/user'

export default {
  components: {
    QRCode
  },
  middleware: 'authenticated',
  head: {
    title: '設定 - Petit Uploader'
  },
  async asyncData() {
    return {
      user: await user()
    }
  },
  computed: {
    url() {
      return `${window.location.href}u/${this.user.uid}`
    }
  }
}
</script>