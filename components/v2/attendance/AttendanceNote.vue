<template>
  <div class="mx-8 mt-2 flex flex-wrap">
    <div
      v-for="(attr, index) in attributes"
      :key="attr.key"
      class="text-[12px] flex w-[50%]"
      :class="[{ 'mb-4': index < 2 }, { 'pl-6': index % 2 != 0 }]"
    >
      <div :style="attr.highlight.style" class="mr-[6px] w-4 h-4"></div>
      <div class="student-attendance-text-color-3">{{ attr.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendaceNote',
  props: {
    attributes: {
      type: Array,
      default: () => {
        return [
          {
            key: 'absence-without-checked',
            text: 'Vắng mặt không phép',
            highlight: { style: { backgroundColor: '#EE493D' }, contentStyle: { color: '#fff' } },
          },
          {
            key: 'absence-without-reason',
            text: 'Vắng không lý do',
            highlight: { style: { backgroundColor: '#FFA800' }, contentStyle: { color: '#fff' } },
          },
          {
            key: 'absence-have-reason',
            text: 'Vắng có lý do',
            highlight: { style: { backgroundColor: '#0F8BFF' }, contentStyle: { color: '#fff' } },
          },
          {
            key: 'present',
            text: 'Có mặt',
            highlight: { style: { backgroundColor: '#02C6A5' }, contentStyle: { color: '#fff' } },
          },
        ]
      },
    },
  },
}
</script>

<style scoped>
.student-attendance-text-color-3 {
  color: #8e8e93;
}
</style>
