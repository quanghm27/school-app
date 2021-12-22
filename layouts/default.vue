<template>
  <nuxt style="" />
</template>

<script>
import { themeMixin } from '~/mixins'

export default {
  name: 'Default',
  head() {
    return {
      bodyAttrs: {
        class: [this.themeClass],
      },
    }
  },
  data() {
    return {
      collapsed: false,
    }
  },
  mixins: [themeMixin],
  middleware: ['authenticated'],
  mounted() {
    this.setThemeClass()
  },
}
</script>
