<script src="../../plugins/ms-component.js"></script>
<template>
  <button @click.prevent="goBack" class="icoApp-back"></button>
</template>

<script>
export default {
  name: 'MsBack',
  props: {
    to: {
      type: Object,
      required: false,
      default: null,
    },
  },

  methods: {
    goBack() {
      if (this.to) {
        this.$router.push(this.to)
      } else {
        window.history.back()
      }
    },
  },
}
</script>
