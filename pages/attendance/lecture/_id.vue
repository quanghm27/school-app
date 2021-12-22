<template>
  <ms-template :page-title="$t('menu_record_lecture_attendance')" :on-refresh="onRefresh">
    <template slot="headerLeft">
      <div @click="goBack" class="icoApp-back"></div>
    </template>
    <template slot="content">
      <ms-spinner v-if="$fetchState.pending" />
      <template v-else>
        <section class="attend">
          <div class="appBtn-noti is-active" @click="onSave" v-if="!isClassEmpty">
            <div class="btn-save" :class="{ 'is-disable': !editable }">
              {{ $t(editable ? 'btn_save' : 'btn_closed') }}
            </div>
          </div>
          <div class="attendTop">
            <h2 class="attend-title">
              {{ className }}
              {{ lessonStartTimes.indexOf(start) | formatLessonIndex }}
            </h2>
            <p class="attend-class">{{ lecture }}, {{ date | formatDates('ddd, DD/MM/YYYY') }}</p>
            <div class="attend-info" v-if="!isClassEmpty">
              <ul class="u-tb">
                <!--                <li>-->
                <!--                  <span class="attend-txt">{{ $t('text_enter_absence_reason') }}</span>-->
                <!--                </li>-->
                <li class="attend-btn">
                  <button
                    class="btn-attendAll"
                    :class="{ 'is-disable': !editable }"
                    :disabled="!editable"
                    @click="onAttendAll"
                  >
                    {{ $t('btn_attendance_all') }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="attendList" v-if="!isClassEmpty">
            <div class="attendList-item" v-for="(attend, index) in classInfo" :key="attend.STUDENT_ID">
              <ul class="u-tb">
                <li class="attendList-no">
                  {{ attend.ATTEND_NO }}
                </li>
                <li>
                  <div class="attendInner">
                    <ul class="u-tb">
                      <li class="attendList-img">
                        <div
                          class="u-pic"
                          :style="
                            `background-image: url(${attend.IMG_URL || require('~/assets/img/default_student.jpg')})`
                          "
                        >
                          <i :class="`icoApp-${attend.SEX === 1 ? 'mc' : 'fc'}`"></i>
                        </div>
                      </li>
                      <li>
                        <h4 class="person-name">{{ attend.STUDENT_NAME }}</h4>
                        <p class="person-sysID">{{ attend.STUDENT_ID }}</p>
                      </li>
                      <li class="attendList-btn">
                        <button
                          :class="{
                            'btn-attend': editable && attend.ATTEND_STATUS === $const.ATTEND_STATUS.YES,
                            'btn-absence': editable && attend.ATTEND_STATUS === $const.ATTEND_STATUS.NO,
                            'btn-attendAll': !editable,
                            'is-disable': !editable,
                          }"
                          :disabled="!editable"
                          @click="onToggleAttend(index)"
                        >
                          {{
                            attend.ATTEND_STATUS === $const.ATTEND_STATUS.YES ? $t('btn_attendance') : $t('btn_absence')
                          }}
                        </button>
                      </li>
                    </ul>
                    <form class="u-form" v-if="attend.ATTEND_STATUS !== $const.ATTEND_STATUS.YES">
                      <div class="u-form-item">
                        <div class="u-input">
                          <input v-model="attend.REASON_ABSENT" type="text" :disabled="!editable" />
                        </div>
                        <p class="u-form-note">{{ $t('Vui lòng nhập lý do vắng mặt') }}</p>
                      </div>
                    </form>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <ms-empty icon="icoNoti-noAttend" :message="$t('text_no_student_in_class')" v-if="isClassEmpty" />
      </template>
    </template>
  </ms-template>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Record',
  data() {
    return {
      editable: true,
      classInfo: [],
    }
  },
  computed: {
    ...mapState(['lessonStartTimes']),
    isClassEmpty() {
      return this.classInfo.length === 0
    },
    isValidated() {
      const invalidAttend = this.classInfo.filter(cl => {
        return !cl.ATTEND_STATUS
      })
      return this.$lodash.isEmpty(invalidAttend)
    },
  },
  created() {
    const { date, classId, className, start, end, lecture, baseYear } = this.$route.query
    this.lessionId = this.$route.params.id
    this.date = this.$moment(date, 'YYYYMMDD')
    this.classId = classId
    this.className = className
    this.start = start
    this.end = end
    this.lecture = lecture
    this.baseYear = baseYear
  },
  async fetch() {
    await this.fetchAttendLecture()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async onRefresh() {
      await this.fetchAttendLecture()
    },
    async fetchAttendLecture() {
      const params = {
        ATTEND_DATE: this.date.format('YYYYMMDD'),
        CLASS_ID: this.classId,
        LESSON_ID: this.lessionId,
        BASE_YEAR: this.baseYear,
      }
      const { DATA } = await this.$api.attendance.GET_ATTEND_LECTURE(params)
      this.editable = !DATA.IS_CLOSE_TASK
      this.classInfo = (DATA.ATTEND_LECTURES || []).map(d => ({
        ...d,
        ATTEND_STATUS: d.ATTEND_STATUS || this.$const.ATTEND_STATUS.NO,
      }))
    },
    onToggleAttend(index) {
      let newClassInfo = this.classInfo.map((cl, i) => {
        let newValue = { ...cl }
        if (index === i) {
          newValue.ATTEND_STATUS =
            newValue.ATTEND_STATUS === this.$const.ATTEND_STATUS.YES
              ? this.$const.ATTEND_STATUS.NO
              : this.$const.ATTEND_STATUS.YES
          if (newValue.ATTEND_STATUS === this.$const.ATTEND_STATUS.YES) {
            newValue.REASON_ABSENT = ''
          }
        }
        return newValue
      })
      this.classInfo = newClassInfo
    },
    onAttendAll() {
      this.classInfo = this.classInfo.map(cl => ({
        ...cl,
        ATTEND_STATUS: this.$const.ATTEND_STATUS.YES,
        REASON_ABSENT: '',
      }))
    },
    onSave() {
      if (!this.editable) {
        return
      }
      if (!this.isValidated) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      this.$notify.show(
        {
          title: this.$t('pop_confirm_save_attendance_title'),
          message: this.$t('pop_confirm_save_attendance_msg'),
          cbConfirm: async () => {
            const { RESULT } = await this.$api.attendance.EDIT_ATTEND_LECTURE_RECORD({
              ATTEND_DATE: this.date.format('YYYYMMDD'),
              ATTEND_LIST: this.classInfo,
              LESSON_ID: this.lessionId,
            })
            if (RESULT === 'SUCCESS') {
              this.$router.back()
            }
          },
        },
        'confirm',
      )
    },
  },
}
</script>

<style scoped></style>
