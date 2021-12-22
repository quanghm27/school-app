<template>
  <v2-template class-content="pr-4 flex flex-col items-start" :showBottomNav="false">
    <template slot="header">
      <attendance-header title="Đơn xin nghỉ học" />
    </template>
    <template slot="content">
      <DayOffStatus :checked="checked" :set-checked="setChecked" />

      <button
        v-if="!checked"
        class="mb-4 day-off-text-color-1 leading-6 text-[16px]"
        @click="selectAbsenceApplicationAll"
      >
        <span v-if="selectedAbsenceApplication.length === 0">Chọn tất cả</span>
        <span v-else>Hủy chọn {{ selectedAbsenceApplication.length }} mục</span>
      </button>
      <div v-if="checked" class="day-off__title day-off__title-1">Đã duyệt</div>
      <DayOffList
        :list="list"
        :selectedAbsenceApplication="selectedAbsenceApplication"
        route-name="v2-attendance-day-off-id"
        student-name
        day-off
        :teacher-name="checked"
        :max-height="checked ? '208px' : ''"
        :checked="checked"
        :selectAbsenceApplication="selectAbsenceApplication"
      />

      <div v-if="checked" class="day-off__title day-off__title-2">Đã hủy</div>
      <DayOffList
        v-if="checked"
        route-name="v2-attendance-day-off-id"
        :list="listCancelled"
        :checked="checked"
        student-name
        day-check
        day-off
        max-height="208px"
      />
      <AttendanceAction :selectedAbsenceApplication="selectedAbsenceApplication" />
    </template>
  </v2-template>
</template>

<script>
import V2Template from '@/components/common/V2Template'
import AttendanceHeader from '@/components/common/V2Header'
import DayOffList from '@/components/v2/attendance/DayOffList'
import DayOffStatus from '@/components/v2/attendance/DayOffStatus'
import AttendanceAction from '@/components/v2/attendance/AttendanceAction'

export default {
  name: 'Index',
  components: { V2Template, AttendanceHeader, DayOffList, DayOffStatus, AttendanceAction },
  data() {
    return {
      checked: false,
      list: [
        {
          id: 0,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
        },
        {
          id: 1,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
          params: { id: this.$route.params.id },
        },
        {
          id: 2,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
        },
        {
          id: 3,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
        },
      ],
      listCancelled: [
        {
          id: 4,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
        },
        {
          id: 5,
          studentName: 'Đỗ Rê Mon',
          className: '10A4',
          dateOff: '24/08/2021',
          teacherName: 'Mon Rê Đỗ',
          birthDay: '24/08/1990',
        },
      ],
      selectedAbsenceApplication: [],
    }
  },
  async fetch() {
    const { DATA } = await this.$api.attendance.GET_LIST_DAY_OFF_APPLICATION({ STATE: 1 })
    console.log(DATA)
  },
  methods: {
    setChecked(checked) {
      this.checked = checked
      console.log('api called')
    },
    selectAbsenceApplication(absenceApplication) {
      const index = this.selectedAbsenceApplication.indexOf(absenceApplication)
      index > -1
        ? this.selectedAbsenceApplication.splice(index, 1)
        : this.selectedAbsenceApplication.push(absenceApplication)
    },
    selectAbsenceApplicationAll() {
      this.selectedAbsenceApplication.length === this.list.length
        ? (this.selectedAbsenceApplication = [])
        : (this.selectedAbsenceApplication = [...this.list])
    },
  },
  computed: {},
}
</script>

<style>
.day-off-text-color-1 {
  color: #e0402a;
}

.day-off__title {
  font-size: 12px;
  line-height: 14px;
  width: 105px;
  height: 37px;
  border-radius: 4px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
}

.day-off__title-1 {
  margin-top: 0;
  background: rgba(15, 139, 255, 0.1);
  color: #0f8bff;
}

.day-off__title-2 {
  background: rgba(237, 84, 73, 0.1);
  color: #ee493d;
}
</style>
