<template>
  <canvas>
  </canvas>
</template>

<script>
import * as qrcode from 'qrcode'

export default {
  props: {
    text: String
  },
  mounted() {
    this.draw()
  },
  watch: {
    text() {
      draw()
    }
  },
  methods: {
    draw() {
      qrcode.toCanvas(this.$el, this.text)
    }
  }
}
</script>

