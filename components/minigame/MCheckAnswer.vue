<template>
  <div
    class="flex flex-row rounded-lg border-solid py-2 px-6 justify-start items-center"
    :class="check ? 'bg-green-27AE60 border-0' : 'bg-white border-blue-400 border'"
    style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 20px 20px 0 rgba(0, 0, 0, 0.1);"
    @click="onClick()"
  >
    <p class="text-base text-center w-full" :class="check ? 'text-white' : 'text-blue-400'">
      {{ check ? 'Tiếp tục' : 'Bỏ qua' }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'MCheckAnswer',
  props: {
    check: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
