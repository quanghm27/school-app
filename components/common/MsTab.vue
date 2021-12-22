<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MsTab',
  props: {
    name: {
      required: true,
      type: [String, Object],
    },
    isNew: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
}
</script>
