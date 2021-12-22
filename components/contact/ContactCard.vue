<template>
  <div class="u-box">
    <a class="u-box-link" v-on="$listeners">
      <p class="contactBook-tag" v-if="tag">
        {{ tag }}
      </p>
      <i :class="icon"></i>
      <h2>{{ title }}</h2>
      <p class="contactBook-txt">{{ subtitle }}</p>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: [String, Number],
      required: true,
    },
    tag: {
      type: [String, Boolean],
      default: null,
    },
  },
}
</script>
