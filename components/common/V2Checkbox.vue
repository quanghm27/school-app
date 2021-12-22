<template>
  <input
    type="checkbox"
    :class="['mr-2 bg-gray-5', { '!bg-primary': checked }, className]"
    v-model="checked"
    @change="$emit('input', checked)"
  />
</template>

<script>
export default {
  name: 'V2Checkbox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String || Array,
      default: '',
    },
  },
  data() {
    return {
      checked: this.value,
    }
  },
  watch: {
    value(val) {
      this.checked = val
    },
  },
}
</script>

<style scoped>
input[type='checkbox'] {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-shadow: none;
}
</style>
