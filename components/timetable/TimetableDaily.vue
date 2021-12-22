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
    <!--TODO: make it dry-->
    <h4 class="timeTb-period" v-if="morningLectures.length > 0">Sáng</h4>
    <div class="timeTbList" v-for="(lecture, index) in morningLectures" :key="index">
      <div class="timeTbList-item">
        <ul class="u-tb">
          <li class="timeTbList-time">
            <p class="timeTb-time">{{ `Tiết ${lessonFormat[lessonStartTimes.indexOf(lecture.TIME_START)]}` }}</p>
          </li>
          <li v-if="isTeacher">
            <template v-if="lecture.TIMETABLE_TYPE === TIMETABLE_TYPE.LECTURE">
              <p class="timeTb-subj">{{ lecture.CLASS_NAME }}</p>
              <p class="timeTb-teacher">{{ lecture.SUB_ID_NAME }}</p>
            </template>
            <template v-else>
              <p class="timeTb-subj">{{ getTimeTableTypes(lecture.TIMETABLE_TYPE) }}</p>
            </template>
          </li>
          <li v-else>
            <template v-if="lecture.TIMETABLE_TYPE === TIMETABLE_TYPE.LECTURE">
              <p class="timeTb-subj">{{ lecture.SUB_ID_NAME }}</p>
              <p class="timeTb-teacher" v-if="lecture.TEACHER_NAME">{{ lecture.TEACHER_NAME }}</p>
            </template>
            <template v-else>
              <p class="timeTb-subj">{{ getTimeTableTypes(lecture.TIMETABLE_TYPE) }}</p>
            </template>
          </li>
          <li class="timeTbList-ico">
            <i :class="`icoSubj-${lecture.ICON}`"></i>
          </li>
        </ul>
      </div>
    </div>
    <!--TODO: make it dry-->
    <h4 class="timeTb-period" v-if="afternoonLectures.length > 0">Chiều</h4>
    <div class="timeTbList" v-for="(lecture, index) in afternoonLectures" :key="`${index}-ch`">
      <div class="timeTbList-item">
        <ul class="u-tb">
          <li class="timeTbList-time">
            <p class="timeTb-time">{{ `Tiết ${lessonFormat[lessonStartTimes.indexOf(lecture.TIME_START)]}` }}</p>
          </li>
          <li v-if="isTeacher">
            <template v-if="lecture.TIMETABLE_TYPE === TIMETABLE_TYPE.LECTURE">
              <p class="timeTb-subj">{{ lecture.CLASS_NAME }}</p>
              <p class="timeTb-teacher">{{ lecture.SUB_ID_NAME }}</p>
            </template>
            <template v-else>
              <p class="timeTb-subj">{{ getTimeTableTypes(lecture.TIMETABLE_TYPE) }}</p>
            </template>
          </li>
          <li v-else>
            <template v-if="lecture.TIMETABLE_TYPE === TIMETABLE_TYPE.LECTURE">
              <p class="timeTb-subj">{{ lecture.SUB_ID_NAME }}</p>
              <p class="timeTb-teacher" v-if="lecture.TEACHER_NAME">{{ lecture.TEACHER_NAME }}</p>
            </template>
            <template v-else>
              <p class="timeTb-subj">{{ getTimeTableTypes(lecture.TIMETABLE_TYPE) }}</p>
            </template>
          </li>
          <li class="timeTbList-ico">
            <i :class="`icoSubj-${lecture.ICON}`"></i>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { ROLE, TIMETABLE_TYPE } from '~/constants'

export default {
  name: 'TimetableDaily',
  props: {
    role: {
      default: ROLE.TEACHER,
      type: String,
    },
    currentDay: {
      default: 1,
      required: true,
      type: Number,
    },
    timetable: {
      default: () => {},
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      TIMETABLE_TYPE,
    }
  },
  computed: {
    ...mapState(['lessonFormat', 'lessonStartTimes', 'lessonAfternoonStartTimes']),
    isTeacher() {
      return this.role === ROLE.TEACHER
    },
    lectureList() {
      if (!this.timetable.ITEMS) {
        return []
      }

      const items = this.timetable.ITEMS.filter(item => {
        return item.WEEK_DAY === this.currentDay
      })

      return items
    },
    morningLectures() {
      return this.lectureList
        .filter(l => l.TIME_START < this.lessonAfternoonStartTimes)
        .filter(el => this.lessonStartTimes.includes(el.TIME_START))
    },
    afternoonLectures() {
      return this.lectureList
        .filter(l => l.TIME_START >= this.lessonAfternoonStartTimes)
        .filter(el => this.lessonStartTimes.includes(el.TIME_START))
    },
  },
  methods: {
    getTimeTableTypes(id) {
      return this.$store.getters.getOptionByKey('TIMETABLE_TYPE', id)
    },
  },
}
</script>

<style scoped></style>
