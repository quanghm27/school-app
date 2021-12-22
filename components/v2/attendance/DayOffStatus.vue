<template>
  <div class="flex justify-between mb-4 w-full">
    <button
      v-for="btn in statusButtons"
      :key="btn.text"
      @click="setChecked(btn.disable)"
      v-text="btn.text"
      :class="[{ 'day-off-status__disable-btn': checked != btn.disable }]"
      class="day-off-status__btn day-off-status__btn-1"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'DayOffStatus',
  props: {
    setChecked: {
      type: Function,
      default: () => {},
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      statusButtons: [
        { text: 'Chưa duyệt', disable: false },
        { text: 'Đã duyệt', disable: true },
      ],
    }
  },
}
</script>

<style scoped>
.day-off-status__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  width: 168px;
}

.day-off-status__btn-1 {
  position: relative;
  height: 48px;
  background-color: rgba(215, 33, 33, 0.05);
  border: 1px solid #ee493d;
  border-radius: 8px !important;
  color: #ee493d;
}
.day-off-status__disable-btn {
  background: #e5e5ea !important;
  color: rgba(174, 174, 178, 1);
}
</style>
