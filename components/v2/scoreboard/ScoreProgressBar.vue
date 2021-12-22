<template>
  <div class="py-4 px-2 rounded-md bg-white mt-4">
    <div class="flex justify-between">
      <div>{{ title }}</div>
      <div class="text-primary">{{ current }}/{{ total }}</div>
    </div>
    <div class="progres-bar mt-3">
      <div class="bg-primary h-full" :style="{ width: `${(current * 100) / total}%` }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreProgressBar',
  props: {
    title: {
      type: String,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.progres-bar {
  height: 14px;
  border-radius: 2px;
  background-color: #e5e5ea;
}
</style>
