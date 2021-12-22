<template>
  <section class="timeTb">
    <div class="timeTbTop">
      <i18n tag="h3" class="timeTb-period" path="text_myclass_info">
        <span>{{ timetable.TERM }}</span>
        <span>{{ timetable.BASE_YEAR | formatSchoolYear }}</span>
      </i18n>
      <h4 class="timeTb-class" v-if="!isTeacher">
        {{ `${timetable.SCHOOL_NAME || ''} ${timetable.CLASS_NAME || ''}` }}
      </h4>
    </div>

    <div class="timeTbArea">
      <div class="timeTbBg">
        <div class="timeTbBg-top"></div>
        <div class="timeTbBg-bg">
          <i
            v-for="(hour, index) in lessonStartTimes"
            :key="hour"
            :class="{ 'end-morning': lessonMorningCount - 1 === index }"
          ></i>
        </div>
        <div class="timeTbBg-lesson">
          <div
            class="morning"
            :style="{
              height: `${lessonMorningCount * ROW}em`,
              lineHeight: `${lessonMorningCount * ROW}em`,
            }"
          >
            {{ $t('SA') }}
          </div>
          <div
            class="afternoon"
            :style="{
              height: `${lessonAfternoonCount * ROW}em`,
              lineHeight: `${lessonAfternoonCount * ROW}em`,
            }"
          >
            {{ $t('CH') }}
          </div>
        </div>
        <div class="timeTbBg-time">
          <ul>
            <li v-for="(_, index) in lessonStartTimes" :key="index">
              <span class="timeTbWeek-hour">{{ lessonFormat[index] }}</span>
            </li>
          </ul>
        </div>
        <div class="timeTbSwipe">
          <div class="u-swipe">
            <div class="u-swipeArea">
              <div class="timeTbMod u-swipe-item" v-for="(wd, index) in weekdays" :key="index">
                <div class="timeTbMod-title">{{ index | weekday }}</div>
                <div v-for="w in wd" :key="w.ID" class="subj" :style="getStyleSubj(w)">
                  <p class="subj-top">{{ getSubTop(w) }}</p>
                  <p class="subj-info">{{ getSubInfo(w) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { ROLE, TIMETABLE_TYPE } from '~/constants'

const ROW = 5

export default {
  name: 'TimetableWeekly',
  props: {
    role: {
      default: ROLE.TEACHER,
      type: String,
    },
    timetable: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      ROW,
      TIMETABLE_TYPE,
    }
  },
  computed: {
    ...mapState(['lessonStartTimes', 'lessonAfternoonStartTimes', 'lessonFormat']),
    isTeacher() {
      return this.role === ROLE.TEACHER
    },
    weekdays() {
      if (!this.timetable.ITEMS) {
        return []
      }

      const result = []

      for (let i = 1; i <= 7; i++) {
        result.push(this.timetable.ITEMS.filter(item => item.WEEK_DAY === i))
      }

      return result
    },
    lessonMorningCount() {
      return this.lessonStartTimes.filter(e => e < this.lessonAfternoonStartTimes).length
    },
    lessonAfternoonCount() {
      return this.lessonStartTimes.filter(e => e >= this.lessonAfternoonStartTimes).length
    },
  },
  methods: {
    getSubTop(item) {
      if (item.TIMETABLE_TYPE !== TIMETABLE_TYPE.LECTURE) {
        return this.$store.getters.getOptionByKey('TIMETABLE_TYPE', item.TIMETABLE_TYPE)
      }

      if (this.isTeacher) {
        return item.CLASS_NAME
      }

      return this.$options.filters.formatLectureName(item.SUB_ID_NAME)
    },

    getSubInfo(item) {
      if (item.TIMETABLE_TYPE !== TIMETABLE_TYPE.LECTURE) return ''

      if (this.isTeacher) {
        return this.$options.filters.formatLectureName(item.SUB_ID_NAME)
      }

      if (!item.TEACHER_NAME) return ''

      return this.$options.filters.formatTeacherName(item.TEACHER_NAME)
    },

    getStyleSubj(item) {
      let lesson = this.lessonStartTimes.indexOf(item.TIME_START)

      return {
        backgroundColor: `${item.BG_COLOR || '#51D1C4'}`,
        top: `${lesson * ROW + 0.5}em`,
        display: lesson === -1 && 'none',
      }
    },
  },
}
</script>

<style scoped>
.timeTbArea {
  margin-bottom: 20px;
}

.subj {
  margin-top: 0;
  height: 4em;
}

.subj-top,
.subj-info {
  text-align: center;
}

.timeTbSwipe {
  left: 5em;
}

.timeTbBg {
  padding-left: 0;
}

.timeTbBg-time {
  left: 2.5em;
  width: 2.5em;
}

.timeTbBg-lesson {
  position: absolute;
  left: 0;
  width: 2.5em;
  z-index: 2;
  text-align: center;
  border-right: 0.2em solid #dfdfdf;
}

.end-morning {
  border-bottom: 0.2em solid #a9a1a1;
}
</style>
