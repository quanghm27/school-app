<template>
  <div class="tooltip" :class="{ 'is-active': active }">
    <p class="tooltip-txt">
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  name: 'MSEmpty',
  props: {
    active: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
}
</script>

<style scoped></style>
