<template>
  <vue-pull-refresh v-if="onRefresh" :on-refresh="onRefresh" :config="config">
    <slot />
  </vue-pull-refresh>
  <div v-else>
    <slot />
  </div>
</template>

<script>
import VuePullRefresh from 'vue-pull-refresh'
export default {
  name: 'MSPullToRefresh',
  components: { VuePullRefresh },
  props: {
    onRefresh: {
      type: Function,
      default: null,
    },
    config: {
      type: Object,
      default: () => ({
        errorLabel: '',
        startLabel: '',
        readyLabel: '',
        loadingLabel: '',
      }),
    },
  },
}
</script>
