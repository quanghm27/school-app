<template>
  <v2-template class-content="pr-4" :show-bottom-nav="false">
    <template slot="header">
      <v2-header title="Danh sách học sinh"></v2-header>
    </template>
    <template slot="content">
      <DayOffList
        :route-name="'v2-attendance-history-class-id-student-id'"
        student-name
        birth-day
        student-name-class="mb-1"
        :list="list"
      />
    </template>
  </v2-template>
</template>

<script>
import V2Header from '@/components/common/V2Header'
import V2Template from '@/components/common/V2Template'
import DayOffList from '@/components/v2/attendance/DayOffList'

export default {
  name: 'Id',
  components: { V2Header, V2Template, DayOffList },
  data() {
    return {
      list: [
        {
          id: 0,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
          params: { id: this.$route.params.id, student_id: 0 },
        },
        {
          id: 1,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
          params: { id: this.$route.params.id, student_id: 1 },
        },
        {
          id: 2,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
          params: { id: this.$route.params.id, student_id: 2 },
        },
        {
          id: 3,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
          params: { id: this.$route.params.id, student_id: 3 },
        },
      ],
    }
  },
}
</script>

<style scoped></style>
