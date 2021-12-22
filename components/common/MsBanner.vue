<template>
  <portal to="banner">
    <div :class="['pop', { 'is-active': value }]" :style="{ zIndex }">
      <div class="page page-subpage">
        <div class="main-container">
          <a href="#" v-if="showClose" class="icoApp-popClose" @click.prevent="close"></a>
          <slot />
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  name: 'MSBanner',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    zIndex: {
      type: String,
      required: false,
      default: '',
    },
    cClass: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    },
  },
  methods: {
    close(e) {
      if (!e) {
        return
      }
      this.$emit('input', false)
      this.$emit('update:zIndex', null)
    },
  },
}
</script>

<style scoped>
.pop {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
.pop.is-active {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}

.main-container {
  padding: 0;
}
</style>
