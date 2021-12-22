<template>
  <div class="container min-h-screen sm:max-w-screen-sm sm:shadow-2xl m-auto overscroll-auto">
    <nuxt />
  </div>
</template>
<script>
export default {
  name: 'Minigame',
  middleware: ['authenticated', 'miniGameAuth'],
  computed: {
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    },
  },
}
</script>
