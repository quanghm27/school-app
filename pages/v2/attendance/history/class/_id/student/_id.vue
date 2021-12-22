<template>
  <v2-template class-content="pr-4" :show-bottom-nav="false">
    <template slot="header">
      <v2-header title="Lịch sử điểm danh"></v2-header>
    </template>
    <template slot="content">
      <div class="flex justify-between student-attendance-text-color-1 mb-6">
        <div class="student-attendance-text-color-1 leading-6 text-[16px]">Học sinh: <b>Đỡ Rê Mi</b></div>
        <div class="student-attendance-text-color-2 leading-6 text-[16px]">Lớp: <b>10A4</b></div>
      </div>
      <v-calendar
        trim-weeks
        :attributes="attributes"
        ref="calendar"
        class="student-attendance-calendar"
        :show-week-number="true"
      >
      </v-calendar>
      <AttendanceNote />
    </template>
  </v2-template>
</template>

<script>
import Vue from 'vue'
import VCalendar from 'v-calendar'
import V2Template from '@/components/common/V2Template'
import V2Header from '@/components/common/V2Header'
import AttendanceNote from '@/components/v2/attendance/AttendanceNote'

Vue.use(VCalendar, {
  locales: {
    // eslint-disable-next-line
    vi: {
      masks: {
        L: 'DD/MM/YYYY',
      },
    },
  },
})
Vue.use(VCalendar)

export default {
  name: 'Id',
  components: { V2Template, V2Header, AttendanceNote },
  data() {
    return {
      attributes: [
        {
          key: 'absence-without-checked',
          text: 'Vắng mặt không phép',
          highlight: { style: { backgroundColor: '#EE493D' }, contentStyle: { color: '#fff' } },
          dates: {
            start: new Date(2021, 9 - 1, 1),
            end: new Date(2021, 9 - 1, 3),
          },
        },
        {
          key: 'absence-without-reason',
          text: 'Vắng không lý do',
          highlight: { style: { backgroundColor: '#FFA800' }, contentStyle: { color: '#fff' } },
          dates: {
            start: new Date(2021, 9 - 1, 4),
            end: new Date(2021, 9 - 1, 6),
          },
        },
        {
          key: 'absence-have-reason',
          text: 'Vắng có lý do',
          highlight: { style: { backgroundColor: '#0F8BFF' }, contentStyle: { color: '#fff' } },
          dates: {
            start: new Date(2021, 9 - 1, 8),
            end: new Date(2021, 9 - 1, 9),
          },
        },
        {
          key: 'present',
          text: 'Có mặt',
          highlight: { style: { backgroundColor: '#02C6A5' }, contentStyle: { color: '#fff' } },
          dates: {
            start: new Date(2021, 9 - 1, 15),
            end: new Date(2021, 9 - 1, 16),
          },
        },
      ],
    }
  },
}
</script>

<style scoped>
.student-attendance-calendar {
  width: 100%;
  min-height: 266px;
  border: none;
  background-color: transparent;
}

>>> .vc-day.is-not-in-month *:not(.is-disabled) {
  opacity: 1;
  color: #d1d1d6;
}

.student-attendance-text-color-1 {
  color: #1c1c1e;
}

.student-attendance-text-color-2 {
  color: #636366;
}
</style>
