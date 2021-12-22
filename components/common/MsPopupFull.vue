<template>
  <portal to="popup-full">
    <div
      :class="['pop', { 'is-active': value }, { 'rounded-xl': headerRounded }]"
      :style="{ top: topPadding, zIndex: zIndex || '' }"
    >
      <div class="page page-subpage">
        <header class="main-header" :style="{ paddingTop: `${deviceInfo.statusBarHeight}px` }">
          <div class="headerArea">
            <a href="#" class="icoApp-popClose" @click.prevent="close"></a>
            <h1 class="main-title text-[20px] font-bold">{{ title }}</h1>
          </div>
          <slot name="header-bottom" />
        </header>
        <div class="main-container" :class="className">
          <slot />
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MsPopupFull',
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
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
    topPadding: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    headerRounded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['showPopup']),
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
  watch: {
    value(val) {
      this.$store.commit('setShowPopup', val)
    },
    showPopup(val) {
      if (!val && this.value) {
        this.close()
      }
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
  bottom: 0;
  z-index: 9;
}
</style>
