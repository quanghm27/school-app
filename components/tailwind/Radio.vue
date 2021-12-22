<template>
  <input
    :value="value"
    @change="handleChange"
    type="radio"
    class="form-checkbox rounded border-solid border-gray-300 text-primary shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  methods: {
    handleChange() {
      this.$emit('input', this.value)
    },
  },
}
</script>

<style scoped></style>
