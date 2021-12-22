<template>
  <div class="mb-4">
    <div class="text-center flex justify-center items-center">
      <n-icon icon="chevron-right" class="w-[8px] h-[8px] transform rotate-180"></n-icon>
      <div class="mx-2 attendance-datepicker-text-color-1 font-bold text-[16px] leading-6">{{ headerTitle }}</div>
      <n-icon icon="chevron-right" class="w-[8px] h-[8px]"></n-icon>
    </div>
    <div class="flex w-100">
      <div v-for="(date, index) in dates" class="mr-2 flex-1 text-center" :key="index">
        <div class="mb-2">
          <span>{{ index == 7 ? 'CN' : `T${index + 1}` }}</span>
        </div>
        <div :style="date == currentDate.getDate() ? `background: red` : ''">{{ date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendancePicker',
  data() {
    return {
      currentDate: null,
      firstDateOfWeek: null,
      lastDateOfWeek: null,
      dates: [],
    }
  },
  created() {
    this.currentDate = new Date()
    this.setDateOfCurrentWeek()
  },
  methods: {
    setDateOfCurrentWeek() {
      let curr = new Date()
      // eslint-disable-next-line camelcase
      const first_day_of_week = curr.getDate() - curr.getDay() + 1
      this.firstDateOfWeek = new Date(curr.setDate(first_day_of_week)).getDate()
      // eslint-disable-next-line camelcase
      this.lastDateOfWeek = new Date(curr.setDate(first_day_of_week + 6)).getDate()

      for (let i = 0; i < 7; i++) {
        this.dates[i] = this.getDate(i)
      }
    },
    getDate(index) {
      return this.totalDaysInMonth()
      // eslint-disable-next-line camelcase
      // const date_by_index = this.firstDateOfWeek + index
      // // eslint-disable-next-line camelcase
      // return this.totalDaysInMonth < date_by_index
      //   ? this.lastDateOfWeek + (date_by_index - this.totalDaysInMonth)
      //   : date_by_index
    },
  },
  computed: {
    totalDaysInMonth() {
      if (this.currentDate) {
        return new Date(this.currentDate.getYear(), this.currentDate.getMonth() + 1, 0).getDate()
      }
      return 0
    },
    headerTitle() {
      return `Thứ ${this.currentDate.getDay() +
        1} ngày ${this.currentDate.getDate()} tháng ${this.currentDate.getMonth()} năm ${this.currentDate.getFullYear()}`
    },
  },
}
</script>

<style scoped>
.attendance-datepicker-text-color-1 {
  color: #3a3a3c;
}
</style>
