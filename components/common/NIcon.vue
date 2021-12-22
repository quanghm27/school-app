<template>
  <svg-icon :name="icon" class="w-8 h-8" :class="className" v-bind="$attrs" v-on="$listeners" :color="color" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: false,
      default: '',
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
