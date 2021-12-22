<template>
  <ms-template :page-title="$t('Điểm danh theo ngày')" :on-refresh="onRefresh">
    <template slot="headerLeft">
      <div @click="goBack" class="icoApp-back"></div>
    </template>
    <template slot="content">
      <ms-spinner v-if="$fetchState.pending" />
      <template v-else>
        <section class="attend">
          <div class="appBtn-noti is-active" @click="onSave">
            <div class="btn-save">
              {{ $t('btn_save') }}
            </div>
          </div>

          <!--          Attend Info-->
          <div class="attendTop flex">
            <div class="flex-1">
              <h2 class="attend-title">
                {{ attendInfo.CLASS_NAME }}
              </h2>
              <p class="attend-class">{{ $route.query.date | formatDates('ddd, DD/MM/YYYY') }}</p>
            </div>
            <div class="flex-1 text-right">
              <p class="attend-student-count">{{ $t('Sĩ số:') }} {{ attendInfo.STUDENT_COUNT }}</p>
              <p class="attend-absent-count">{{ $t('Vắng:') }} {{ attendInfo.ABSENT_COUNT }}</p>
            </div>
          </div>

          <!--          absent list-->
          <div class="attendList">
            <div class="my-4 px-4 flex justify-between">
              <span class="text-lg">{{ $t('Danh sách vắng mặt') }}</span>
              <button class="btn-attend" v-if="presentList.length" @click="showPopup = true">{{ $t('Thêm') }}</button>
            </div>
            <div class="attendList-item" v-for="student in absentList" :key="student.ATTEND_ID">
              <ul class="u-tb pl-4">
                <li>
                  <div class="attendInner">
                    <ul class="u-tb">
                      <li class="attendList-img">
                        <div
                          class="u-pic"
                          :style="{
                            backgroundImage: `url(${student.IMG_URL || require('~/assets/img/default_student.jpg')})`,
                          }"
                        >
                          <i :class="`icoApp-${student.SEX === 1 ? 'mc' : 'fc'}`"></i>
                        </div>
                      </li>
                      <li>
                        <h4 class="person-name">{{ student.STUDENT_NAME }}</h4>
                        <p class="person-sysID">{{ student.BIRTHDAY | formatBirthday }}</p>
                      </li>
                      <li class="attendList-btn">
                        <button class="btn-absence" @click="removeAbsent(student.STUDENT_ID)">
                          {{ $t('Xoá') }}
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </template>
    </template>
    <popup-search-student v-model="showPopup" :students="presentList" @save="addAbsent" />
  </ms-template>
</template>

<script>
import { normalize } from 'normalize-diacritics'
import PopupSearchStudent from '@/components/attendance/PopupSearchStudent'

export default {
  name: 'AttendanceDailyDetail',
  components: {
    PopupSearchStudent,
  },
  data() {
    return {
      showPopup: false,
      attendInfo: null,
      studentList: [],
      initStatus: {},
    }
  },
  computed: {
    presentList() {
      if (!this.attendInfo || !this.studentList) {
        return []
      }

      return this.studentList.filter(e => e.ATTEND_STATUS === this.$const.ATTEND_DAILY_STATUS.PRESENT)
    },
    absentList() {
      if (!this.attendInfo || !this.studentList) {
        return []
      }

      return this.studentList.filter(e => e.ATTEND_STATUS === this.$const.ATTEND_DAILY_STATUS.ABSENT)
    },
    studentUpdated() {
      if (!this.studentList) {
        return []
      }

      return this.studentList.filter(e => e.IS_UPDATED)
    },
  },
  async fetch() {
    await this.fetchAttend()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async onRefresh() {
      await this.fetchAttend()
    },
    async fetchAttend() {
      const {
        params: { id },
        query: { date },
      } = this.$route

      const params = {
        ATTEND_DATE: date,
        CLASS_ID: id,
      }
      const { DATA } = await this.$api.attendance.GET_CLASS_DAILY_ATTENDANCE_DETAIL(params)

      if (!DATA || !DATA.ITEMS) {
        return
      }

      this.attendInfo = DATA

      this.initStatus = DATA.ITEMS.reduce((acc, curr) => {
        acc[curr.STUDENT_ID] = curr.ATTEND_STATUS
        return acc
      }, {})

      this.studentList = await Promise.all(
        DATA.ITEMS.map(async e => {
          return {
            ...e,
            SEARCH_NAME: await normalize(e.STUDENT_NAME.toLowerCase()),
          }
        }),
      )
    },

    removeAbsent(id) {
      const student = this.studentList.find(e => e.STUDENT_ID === id)

      student.ATTEND_STATUS = this.$const.ATTEND_DAILY_STATUS.PRESENT

      student.IS_UPDATED = this.initStatus[id] !== student.ATTEND_STATUS
    },

    addAbsent(ids) {
      this.studentList.forEach(student => {
        if (ids.includes(student.STUDENT_ID)) {
          student.ATTEND_STATUS = this.$const.ATTEND_DAILY_STATUS.ABSENT
          student.SELECTED = false
          student.IS_UPDATED = this.initStatus[student.STUDENT_ID] !== student.ATTEND_STATUS
        }
      })
    },

    onSave() {
      this.$notify.show(
        {
          title: this.$t('Thông báo'),
          message: this.$t('Bạn có muốn gửi thông báo tới phụ huynh học sinh?'),
          cbConfirm: () => {
            this.$api.attendance.PUSH_CLASS_DAILY_ATTENDANCE({
              ATTEND_DATE: this.$route.query.date,
              CLASS_NAME: this.attendInfo.CLASS_NAME,
              ITEMS: this.studentUpdated,
            })
          },
          cbClose: async () => {
            const { RESULT } = await this.$api.attendance.EDIT_CLASS_DAILY_ATTENDANCE({
              ATTEND_DATE: this.$route.query.date,
              ITEMS: this.studentUpdated,
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
