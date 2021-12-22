<template>
  <v2-template class-content="pr-4 flex flex-col" :show-bottom-nav="false">
    <template slot="header">
      <v2-header :title="`Chi tiết lớp ${stuClass.name}`"></v2-header>
    </template>
    <template slot="content">
      <div class="flex justify-between mb-2">
        <div class="text-[16px] leading-6 font-bold daily-class-text-color-1">Lớp {{ stuClass.name }}</div>
        <div class="text-[14px] leading-5 font-bold daily-class-text-color-3">Sỹ số: {{ stuClass.studentNumber }}</div>
      </div>

      <div class="flex justify-between mb-5">
        <div class="text-[16px] leading-6 font-bold daily-class-text-color-2">
          {{ dayName }},&nbsp;<span v-if="isValidDate(dateSelected)">{{ dateSelected.toLocaleDateString() }}</span>
        </div>
        <div class="text-[14px] leading-5 font-bold daily-class-text-color-3">Vắng: {{ stuClass.absenceCount }}</div>
      </div>

      <div class="text-center mb-6">Chart</div>
      <attendance-note class="mb-6"></attendance-note>
      <daily-student-list />

      <button class="mt-auto mb-[32px] mx-auto w-[303px] h-[60px] bg-[#EE493D] text-[20px] text-[#FFFFFF] rounded-md">
        Lưu lại
      </button>
    </template>
  </v2-template>
</template>

<script>
import DailyStudentList from '@/components/v2/attendance/DailyStudentList'
import AttendanceNote from '@/components/v2/attendance/AttendanceNote'
import V2Template from '@/components/common/V2Template'
import V2Header from '@/components/common/V2Header'

export default {
  name: 'Id',
  components: { AttendanceNote, V2Template, V2Header, DailyStudentList },
  data() {
    return {
      //class key cannot using
      stuClass: {
        name: `${this.$route.params.id}A`,
        id: this.$route.params.id,
        absenceCount: 5,
        studentNumber: 10,
      },
      dateSelected: {},
      dayNames: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    }
  },
  mounted() {
    const query = this.$route.query
    // eslint-disable-next-line camelcase
    const q_date = query ? new Date(query.date) : new Date()
    // eslint-disable-next-line camelcase
    this.dateSelected = this.isValidDate(q_date) ? q_date : new Date()
  },
  methods: {
    isValidDate(date) {
      return date instanceof Date && !isNaN(date)
    },
  },
  computed: {
    dayName() {
      return this.isValidDate(this.dateSelected) ? this.dayNames[this.dateSelected.getDay()] : ''
    },
  },
}
</script>

<style scoped>
.daily-class-text-color-1 {
  color: #ee493d;
}

.daily-class-text-color-2 {
  color: #828282;
}

.daily-class-text-color-3 {
  color: #636366;
}
</style>
