<template>
  <input
    :checked="value"
    @change="handleChange"
    type="checkbox"
    class="form-checkbox rounded border-solid border-gray-300 text-primary shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
    },
  },
  methods: {
    handleChange() {
      this.$emit('input', !this.value)
    },
  },
}
</script>

<style scoped></style>
