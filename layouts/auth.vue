<template>
  <nuxt />
</template>

<script>
import { themeMixin } from '@/mixins'

export default {
  name: 'Auth',
  head() {
    return {
      bodyAttrs: {
        class: [this.themeClass],
      },
    }
  },
  middleware: 'notAuthenticated',
  mixins: [themeMixin],
  mounted() {
    this.setThemeClass()
  },
}
</script>
