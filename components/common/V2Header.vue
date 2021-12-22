<template>
  <div
    class="p-4 pb-0 flex items-center justify-between text-white min-h-[100px]"
    :style="{
      paddingTop: `${statusBarHeight + 16}px`,
    }"
  >
    <div class="flex-grow">
      <slot name="left">
        <n-icon v-if="showBackButton" icon="chevron-left" @click="$router.back()"></n-icon>
      </slot>
    </div>
    <div v-if="title" class="flex-shrink max-w-xs items-center">
      <slot name="title">
        <h2 class="text-[22px] leading-7 text-center">{{ title }}</h2>
      </slot>
    </div>
    <div class="flex-grow flex justify-end relative">
      <slot name="right" class="flex justify-end" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'V2Header',
  props: {
    title: {
      type: String,
      default: '',
    },
    showBackButton: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    statusBarHeight() {
      return this.$store.state.device.deviceInfo.statusBarHeight || 0
    },
  },
}
</script>

<style scoped></style>
