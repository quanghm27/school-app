<template>
  <a @click.prevent="toggle" :class="['switchBox', { 'is-active': value }]"><span class="switch-pin"></span></a>
</template>

<script>
export default {
  name: 'MSToggle',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit('input', !this.value)
    },
  },
}
</script>
