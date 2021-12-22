<template>
  <div class="page">
    <div class="main-container">
      <nuxt />
    </div>
  </div>
</template>
<script>
import { themeMixin } from '@/mixins'

export default {
  name: 'Empty',
  mixins: [themeMixin],
  mounted() {
    this.setThemeClass()
  },
}
</script>
