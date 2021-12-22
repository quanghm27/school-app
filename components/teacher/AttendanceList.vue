<template>
  <section class="attend">
    <div class="timeTbTop">
      <h3 class="timeTb-period">
        {{ attends.TERM === 1 ? $t('text_semester_1st') : $t('text_semester_2nd') }}
        {{ attends.BASE_YEAR | formatSchoolYear }}
      </h3>
      <div class="timeTb-day">
        <span>{{ date.raw | formatDates('ddd, DD/MM/YYYY') }}</span>
        <div class="btn-today" v-if="date.raw.isSame(new Date(), 'day')">
          {{ $t('text_weekday_today') }}
        </div>
      </div>
    </div>
    <div class="timeTbList">
      <label class="timeTbList-item" v-for="attend in attends.ITEMS" :key="attend.ID" :for="attend.ID">
        <ul class="u-tb" @click="onClick(attend)">
          <li class="timeTbList-time">
            <p class="timeTb-time">{{ lessonStartTimes.indexOf(attend.TIME_START) | formatLessonIndex }}</p>
          </li>
          <li>
            <p class="timeTb-subj">{{ `${attend.CLASS_NAME}` }}</p>
            <p class="timeTb-teacher">{{ attend.SUB_ID_NAME }}</p>
          </li>
          <li class="timeTbList-icoEdit">
            <i :class="`icoSubj-${attend.ICON}`"></i>
            <div class="u-check-attend" v-if="checkTimeInPast(date.raw, attend.TIME_START)">
              <input type="checkbox" class="u-check-input" :checked="attend.IS_ATTEND" />
              <i class="icoApp-tbCheck"></i>
            </div>
          </li>
        </ul>
      </label>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'AttendanceList',
  props: {
    attendanceInfo: {
      required: true,
      type: Object,
    },
    date: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapState(['lessonStartTimes']),
    attends() {
      return {
        ...this.attendanceInfo.DATA,
        ITEMS: (this.attendanceInfo.DATA.ITEMS || [])
          .filter(l => !this.date.grades.includes(l.GRADE_NO))
          .sort((l1, l2) => l1.TIME_START - l2.TIME_START),
      }
    },
  },
  methods: {
    checkTimeInPast(date, startTime) {
      return date
        .clone()
        .startOf('day')
        .add({ minutes: startTime })
        .isBefore(moment())
    },
    onClick(attend) {
      if (!this.checkTimeInPast(this.date.raw, attend.TIME_START)) {
        return
      }
      this.$router.push({
        name: 'attendance-lecture-id',
        params: { id: attend.ID },
        query: {
          date: this.date.raw.format('YYYYMMDD'),
          classId: attend.CLASS_ID,
          className: attend.CLASS_NAME,
          start: attend.TIME_START,
          end: attend.TIME_END,
          lecture: attend.SUB_ID_NAME,
          baseYear: this.attends.BASE_YEAR,
        },
      })
    },
  },
}
</script>

<style scoped></style>
