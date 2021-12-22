<template>
  <section class="mb-6 p-0">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-[22px] font-bold">{{ $t('text_my_state') }}</h3>
      <n-link
        :to="{ name: 'setting-manage-children' }"
        v-if="$store.get('userRole') === $const.ROLE.PARENT"
        class="text-[14px] flex items-center justify-end mr-5 cursor-pointer"
      >
        <p>{{ $t('text_about_function_parent_children') }}</p>
        <n-icon icon="chevron-right" class="w-2 h-2 ml-2"></n-icon>
      </n-link>
      <n-link :to="{ name: 'timetable' }" v-else class="flex items-center justify-end mr-5 cursor-pointer">
        <p>{{ $t('btn_view_timetable') }}</p>
        <n-icon icon="chevron-right" class="w-2 h-2 ml-2"></n-icon>
      </n-link>
    </div>

    <div class="flex overflow-x-auto scrollbar">
      <skeleton-home-status v-if="isLoadingStatus" />
      <template v-else>
        <template v-if="$lodash.isEmpty($store.get('userRole') === $const.ROLE.PARENT ? childList : timetables)">
          <div class="h-[154px] w-full mr-4 bg-white rounded-md flex flex-col items-center justify-center">
            <n-icon icon="empty-card" class="w-16 !h-20"></n-icon>
            <p class="text-xs text-gray-3">Chưa có tiết học trong hôm nay</p>
          </div>
        </template>
        <template v-else>
          <template v-if="$store.get('userRole') === $const.ROLE.PARENT">
            <div class="flex-nowrap flex" v-for="child in childList" :key="child.CHILD_ID">
              <div class="bg-white w-[168px] mr-2 rounded-md shadow-card-home p-2.5 flex flex-col">
                <div class="flex-1 w-full flex flex-col justify-between">
                  <div class="flex justify-between">
                    <div class="flex-1 text-[16px] font-bold line-clamp-2 leading-6">{{ child.CHILD_NAME }}</div>
                    <div v-if="classStatus(child.TIMETABLE) === 0" class="w-13 text-[9px]">
                      <div class="bg-gray-6 py-0.5 px-1.5 rounded text-gray-3">
                        Đã tan học
                      </div>
                    </div>
                    <div v-if="classStatus(child.TIMETABLE) === 1" class="w-13 text-[9px]">
                      <div class="bg-green-50 py-0.5 px-1.5 rounded text-green-5FB760">
                        Đang học
                      </div>
                    </div>
                  </div>
                  <div class="text-[12px] font-medium line-clamp-2 mt-2.5">
                    Lớp {{ child.CLASS_NAME }} - {{ child.SCHOOL_NAME }}
                  </div>
                </div>
                <div class="mt-3" v-if="getCurrentLesson(child.TIMETABLE)">
                  <div class="flex items-center mb-1">
                    <n-icon icon="wall-clock" class="w-3.5 h-3.5 mr-2"></n-icon>
                    <p class="text-gray-v2-secondary">
                      {{
                        `Tiết ${
                          child.lessonFormat[
                            child.lessonStartTimes.indexOf(getCurrentLesson(child.TIMETABLE).START_TIME)
                          ]
                        }`
                      }}
                      -
                      {{
                        getCurrentLesson(child.TIMETABLE).START_TIME >= child.lessonAfternoonStartTimes
                          ? 'Chiều'
                          : 'Sáng'
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div
            v-else
            class="flex-nowrap flex"
            v-for="(timetable, index) in timetables"
            :key="`${timetable.LECTURE_ID}-${index}`"
          >
            <div class="bg-white w-[168px] mr-2 rounded-md shadow-card-home p-2.5 flex flex-col">
              <div class="flex justify-between w-full flex-1">
                <div class="flex-1">
                  <div class="text-[18px] font-bold line-clamp-2 leading-6">{{ timetable.SUB_ID_NAME }}</div>
                  <div class="font-medium">Lớp {{ timetable.CLASS_NAME }}</div>
                </div>
                <div v-if="classStatus(timetable) === 0" class="w-13 ml-1 text-[9px]">
                  <div class="bg-gray-6 py-0.5 px-1.5 rounded text-gray-3">
                    Đã kết thúc
                  </div>
                </div>
                <div v-else-if="classStatus(timetable) === 1" class="w-13 ml-1 text-[9px]">
                  <div class="bg-green-50 py-0.5 px-1.5 rounded text-green-5FB760">
                    {{ $store.get('userRole') === $const.ROLE.TEACHER ? 'Đang dạy' : 'Đang học' }}
                  </div>
                </div>
                <div v-else class="w-13 ml-1 text-[9px]">
                  <div class="bg-yellow-50 py-0.5 px-1.5 rounded text-orange-FFA800">
                    Sắp đến
                  </div>
                </div>
              </div>
              <div class="mt-8">
                <div class="flex items-center mb-1">
                  <n-icon icon="wall-clock" class="w-3.5 h-3.5 mr-2"></n-icon>
                  <p class="text-gray-v2-secondary">
                    {{ `Tiết ${lessonFormat[lessonStartTimes.indexOf(timetable.TIME_START)]}` }}
                    - {{ timetable.TIME_START >= lessonAfternoonStartTimes ? 'Chiều' : 'Sáng' }}
                  </p>
                </div>
                <div class="flex items-center" v-if="$store.get('userRole') === $const.ROLE.TEACHER">
                  <n-icon icon="users" class="w-3.5 h-3.5 mr-2"></n-icon>
                  <p class="text-gray-v2-secondary underline">
                    {{ timetable.COUNT_ATTEND }}/{{ timetable.COUNT_STUDENT }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import SkeletonHomeStatus from '../../skeleton/SkeletonHomeStatus'

export default {
  name: 'HomeStatus',
  components: { SkeletonHomeStatus },
  data() {
    return {
      timetables: [],
      childList: [],
      isLoadingStatus: true,
    }
  },
  computed: {
    ...mapState(['lessonFormat', 'lessonStartTimes', 'lessonAfternoonStartTimes']),
  },

  async created() {
    if (this.$store.get('userRole') === this.$const.ROLE.PARENT) {
      this.isLoadingStatus = true
      await this.getListChild()
      this.isLoadingStatus = false
      return
    }
    await this.getConfigTimetable()
    this.isLoadingStatus = true
    await this.getTimetables()
    this.isLoadingStatus = false
  },
  methods: {
    async getListChild() {
      const { DATA } = await this.$api.parent.GET_CHILD_LIST()
      let config = []
      for (let child of DATA) {
        const res = await this.getConfigTimetable({ CHILD_ID: child.CHILD_ID })
        config.push(res)
      }
      this.childList = DATA.map((item, index) => {
        return {
          ...item,
          lessonFormat: this.$utils.common.getLessonFormat(config[index]),
          lessonStartTimes: this.$utils.common.getLessonStartTimes(config[index]),
          lessonAfternoonStartTimes: this.$utils.common.getAfternoonStartTimes(config[index]),
        }
      })
    },
    async getTimetables() {
      const DAY_OF_WEEK = this.$moment().isoWeekday()
      const { DATA } = await this.$api.timetable.GET_TIME_TABLE_DAYOFWEEK({ DAY_OF_WEEK })
      this.timetables = DATA
    },
    async getConfigTimetable(params = {}) {
      const { DATA, RESULT } = await this.$api.timetable.GET_TIME_TABLE_CONFIG(params)
      if (RESULT === 'SUCCESS') {
        this.$store.commit('setLessonStartTimes', this.$utils.common.getLessonStartTimes(DATA))
        this.$store.commit('setLessonAfternoonStartTimes', this.$utils.common.getAfternoonStartTimes(DATA))
        this.$store.commit('setLessonFormat', this.$utils.common.getLessonFormat(DATA))
      }
      return DATA
    },
    convertMinuteTo(time) {
      const hours = Math.trunc(time / 60)
      const minutes = time % 60
      return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`
    },
    classStatus(timetable) {
      if (!timetable) return
      const isArray = require('lodash/isArray')
      let TIME_START, TIME_END

      if (isArray(timetable)) {
        //Phụ huynh
        TIME_START = timetable[timetable.length - 1]?.START_TIME
        TIME_END = timetable[timetable.length - 1]?.END_TIME
      } else {
        //Giáo viên, Học sinh
        TIME_START = timetable.TIME_START
        TIME_END = timetable.TIME_END
      }

      const convertStart = this.$moment(this.convertMinuteTo(TIME_START), 'HH:mm').format()
      const convertEnd = this.$moment(this.convertMinuteTo(TIME_END), 'HH:mm').format()
      const isBefore = this.$moment(new Date()).isBefore(convertStart)
      const isAfter = this.$moment(new Date()).isAfter(convertEnd)

      if (isAfter) {
        return 0 //Đã kết thúc
      }
      if (isBefore) {
        return 2 //'Sắp đến'
      }
      return 1 //'Đang dạy'
    },
    getCurrentLesson(lessons) {
      if (!lessons) return
      const transformLesson = lessons.map(lesson => {
        const START_TIME = this.$moment(this.convertMinuteTo(lesson.START_TIME), 'HH:mm').format()
        const END_TIME = this.$moment(this.convertMinuteTo(lesson.END_TIME), 'HH:mm').format()
        return {
          ...lesson,
          startDate: START_TIME,
          endDate: END_TIME,
        }
      })
      return transformLesson.find(item => {
        return this.$moment(new Date()).isBetween(item.startDate, item.endDate)
      })
    },
  },
}
</script>

<style scoped></style>
