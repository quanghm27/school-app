<template>
  <div class="container mx-auto">
    <nuxt />
  </div>
</template>
<script>
import { themeMixin } from '@/mixins'

export default {
  name: 'Blank',
  mixins: [themeMixin],
  mounted() {
    this.setThemeClass()
  },
}
</script>
