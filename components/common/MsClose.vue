<template>
  <button @click.prevent="closePage" class="icoApp-popClose"></button>
</template>

<script>
export default {
  name: 'MsClose',
  props: {
    to: {
      type: Object,
      required: false,
      default: null,
    },
  },
  methods: {
    closePage() {
      if (this.to) {
        this.$router.push(this.to)
      } else {
        window.history.back()
      }
    },
  },
}
</script>
