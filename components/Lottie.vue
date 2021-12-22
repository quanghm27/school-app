<template>
  <div :style="style" ref="lavContainer"></div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    height: {
      type: String,
      default: undefined,
    },
    width: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      style: {
        width: this.width ? this.width : '100%',
        height: this.height ? this.height : '100%',
        overflow: 'hidden',
        margin: '0 auto',
      },
    }
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      name: 'lottie',
      container: this.$refs.lavContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      // animationData: this.options.animationData,
      // rendererSettings: this.options.rendererSettings,
      ...this.options,
    })
    // this.anim.setSpeed(0.1)
    // this.anim.goToAndStop(0, true)
    this.$emit('animCreated', this.anim)
  },
}
</script>
