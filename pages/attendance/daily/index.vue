<template>
  <ms-template
    default-header-left="back"
    page-class="is-showDaySwipe"
    :page-title="$t('Điểm Danh theo ngày')"
    :on-refresh="onRefresh"
  >
    <template slot="headerBottom">
      <date-swipe v-if="dates.length > 0" :value="selectedDateIndex" @input="onSelectDate" :dates="dates" />
    </template>
    <template slot="content">
      <ms-spinner v-if="$fetchState.pending" />
      <ms-empty icon="icoNoti-noTimeTb" :message="$t('text_check_timetable_unavailable')" v-else-if="isEmpty" />
      <div v-else class="border rounded-lg shadow-lg mt-6">
        <div
          v-for="item in attendanceInfo"
          :key="item.CLASS_ID"
          class="even:bg-gray-50 px-6 py-3 flex items-center justify-between"
          @click="redirect(item)"
        >
          <div>{{ item.CLASS_NAME }}</div>
          <div>
            <div>{{ $t('Sĩ Số') }}: {{ item.STUDENT_COUNT }}</div>
            <div>{{ $t('Vắng') }}: {{ item.ABSENT_COUNT }}</div>
          </div>
        </div>
      </div>
    </template>
  </ms-template>
</template>

<script>
import DateSwipe from '@/components/DateSwipe'

export default {
  name: 'AttendanceDaily',
  components: { DateSwipe },
  data() {
    return {
      attendanceInfo: [],
      dayOffInfo: {},
    }
  },
  computed: {
    dates() {
      if (this.$lodash.isEmpty(this.dayOffInfo)) {
        return []
      }
      const { START_DATE, IS_HOL_SAT, IS_HOL_SUN, ITEMS } = this.dayOffInfo.DATA
      const dates = []
      const startDate = this.$moment(START_DATE)
      const endDate = this.$moment()
      let tmpDate = startDate
      while (tmpDate.isSameOrBefore(endDate, 'day')) {
        const event = (ITEMS || []).find(item => this.$moment(item.DATE).isSame(tmpDate, 'd'))
        const isDayOff = event && event.IS_OFF_DAY
        dates.push({
          raw: tmpDate.clone(),
          label: tmpDate.format('DD/MMM'),
          marked: tmpDate.isSame(this.$moment(), 'day'),
          disabled: isDayOff || (tmpDate.day() === 0 && IS_HOL_SUN) || (tmpDate.day() === 6 && IS_HOL_SAT),
          grades: event ? event.GRADES : [],
        })
        tmpDate.add(1, 'days')
      }
      return dates
    },
    defaultDateIndex() {
      let index = this.dates.findIndex(d => d.marked)
      if (index < 0) {
        return 0
      }
      while (index >= 0 && this.dates[index].disabled) {
        index--
      }
      return index
    },
    isEmpty() {
      return this.$lodash.isEmpty(this.attendanceInfo)
    },
    selectedDateIndex() {
      return parseInt(this.$route.query.dateIndex || this.defaultDateIndex)
    },
    selectedDate() {
      return this.dates[this.selectedDateIndex]
    },
  },
  watch: {
    selectedDateIndex() {
      this.$fetch()
    },
  },
  async fetch() {
    if (this.$lodash.isEmpty(this.dayOffInfo)) {
      this.dayOffInfo = await this.$api.attendance.CHECK_DAY_OFF()
    }

    await this.fetchAttendanceInfo()
  },
  methods: {
    async fetchAttendanceInfo() {
      this.attendanceInfo = []
      const { DATA } = await this.$api.attendance.GET_LIST_CLASS_DAILY_ATTENDANCE({
        CLASS_IDS: [],
        END_DATE: this.selectedDate.raw.format('YYYYMMDD'),
        START_DATE: this.selectedDate.raw.format('YYYYMMDD'),
      })

      if (DATA[0] && DATA[0].ITEMS) {
        this.attendanceInfo = DATA[0].ITEMS.reverse().sort((a, b) => b.ABSENT_COUNT - a.ABSENT_COUNT)
      }
    },
    async onRefresh() {
      await this.fetchAttendanceInfo()
    },
    onSelectDate(dateIndex) {
      this.$router.replace({ name: 'attendance-daily', query: { dateIndex } })
    },
    redirect(item) {
      this.$router.push({
        name: 'attendance-daily-id',
        params: {
          id: item.CLASS_ID,
        },
        query: {
          date: this.selectedDate.raw.format('YYYYMMDD'),
        },
      })
    },
  },
}
</script>
