<template>
  <ms-template
    default-header-left="back"
    page-class="is-showDaySwipe"
    :page-title="$t('Điểm Danh theo tiết')"
    :on-refresh="onRefresh"
  >
    <template slot="headerBottom">
      <date-swipe v-if="dates.length > 0" :value="selectedDateIndex" @input="onSelectDate" :dates="dates" />
    </template>
    <template slot="content">
      <ms-spinner v-if="$fetchState.pending" />
      <ms-empty icon="icoNoti-noTimeTb" :message="$t('text_check_timetable_unavailable')" v-else-if="isEmpty" />
      <attendance-list v-else :attendance-info="attendanceInfo" :date="selectedDate" />
    </template>
    <portal to="tooltip-attendance">
      <ms-tooltip :active="showTooltip">
        {{ $t('text_press_attendance') }}
      </ms-tooltip>
    </portal>
  </ms-template>
</template>

<script>
import AttendanceList from '@/components/teacher/AttendanceList'
import DateSwipe from '@/components/DateSwipe'

export default {
  name: 'AttendanceLesson',
  components: { DateSwipe, AttendanceList },
  data() {
    return {
      showTooltip: false,
      attendanceInfo: {},
      dayOffInfo: {},
    }
  },
  computed: {
    dates() {
      if (this.$lodash.isEmpty(this.dayOffInfo)) {
        return []
      }
      const { START_DATE, END_DATE, IS_HOL_SAT, IS_HOL_SUN, ITEMS } = this.dayOffInfo.DATA
      const dates = []
      const startDate = this.$moment(START_DATE)
      const endDate = this.$moment(END_DATE)
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
    selectedDateIndex(index) {
      this.$fetch()
    },
    selectedDate(date) {
      const endDate = this.$moment(this.dayOffInfo.DATA.END_DATE)
      if (this.$moment().isAfter(endDate, 'day')) {
        this.showTooltip = false
      } else if (date) {
        this.showTooltip = !date.raw.isSame(this.$moment(), 'd')
      }
    },
  },
  async fetch() {
    if (this.$lodash.isEmpty(this.dayOffInfo)) {
      this.dayOffInfo = await this.$api.attendance.CHECK_DAY_OFF()
    }
    await this.fetchLectureList()
  },
  methods: {
    async fetchLectureList() {
      this.attendanceInfo = await this.$api.attendance.GET_ATTEND_LECTURE_LIST({
        ATTEND_DATE: this.selectedDate.raw.format('YYYYMMDD'),
      })
    },
    async onRefresh() {
      await this.fetchLectureList()
    },
    onSelectDate(dateIndex) {
      this.$router.replace({ name: 'attendance-lecture', query: { dateIndex } })
    },
  },
}
</script>
