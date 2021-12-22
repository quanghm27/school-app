<template>
  <section class="notice">
    <div class="u-middle">
      <i :class="icon"></i>
      <h2 class="notice-title">{{ message }}</h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MSEmpty',
  props: {
    icon: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
