<template>
  <section class="notice">
    <component :is="errorPage" :error="error" />
  </section>
</template>
<script>
import NotFoundPage from '~/pages/error/404.vue'
import ServerErrorPage from '~/pages/error/sorry.vue'
import ForbiddenPage from '~/pages/error/403.vue'
import { themeMixin } from '@/mixins'

export default {
  name: 'ErrorPage',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      const statusCode = this.error.statusCode
      if (statusCode === 404 || statusCode === 400) {
        return NotFoundPage
      }
      if (statusCode === 403) {
        return ForbiddenPage
      }

      return ServerErrorPage
    },
  },
  mixins: [themeMixin],
  mounted() {
    this.setThemeClass()
  },
}
</script>
