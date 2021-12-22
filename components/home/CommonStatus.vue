<template>
  <section class="status is-active">
    <div class="homeTop">
      <h2 class="home-title">{{ $t('text_my_state') }}</h2>
      <nuxt-link :to="{ path: '/timetable' }" class="home-link">{{ $t('btn_view_timetable') }}</nuxt-link>
    </div>
    <ms-spinner v-if="isLoading" />
    <div class="statusSwipe" v-else>
      <!-- No data -->
      <div class="u-box" v-if="!timeTableDay.length">
        <div class="nodataArea">
          <i class="icoApp-alert"></i>
          <p v-html="$utils.common.nl2br($t('text_check_timetable_unavailable'))" />
        </div>
      </div>

      <!-- Subject list -->
      <div class="u-swipe" id="statusSwipe" v-else>
        <div class="u-swipeArea" ref="timeArea">
          <div
            v-for="(item, index) in timeTableDay"
            :key="index"
            ref="timeItems"
            :class="['u-swipe-item', { 'is-active': checkActive(item) }]"
          >
            <div class="u-box">
              <a href="#" class="u-box-link">
                <p class="status-room">
                  {{ item.CLASS_NAME }}
                </p>
                <p class="status-class">{{ item.SUB_ID_NAME }}</p>
                <p class="status-time">
                  {{ `Tiết ${lessonFormat[lessonStartTimes.indexOf(item.TIME_START)]}` }}
                </p>
                <i :class="['ico-M', `icoSubj-${item.ICON}`]"></i>
              </a>
            </div>
          </div>
          <div class="u-swipe-item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CommonStatus',
  data() {
    return {
      timeTableDay: [],
      now: this.$moment().hour() * 60 + this.$moment().minute(),
      isLoading: false,
    }
  },
  computed: {
    ...mapState(['lessonFormat', 'lessonStartTimes']),
  },
  methods: {
    checkActive(item) {
      return this.now >= item.TIME_START && this.now <= item.TIME_END
    },
    getCurrentIndexTimeTable() {
      const length = this.timeTableDay.length
      if (!length) {
        return null
      }
      for (let i = 0; i < length - 1; i++) {
        if (this.now > this.timeTableDay[i].TIME_END) {
          continue
        }
        return i
      }
      return length - 1
    },
    updateScrollLeft() {
      const currentIndex = this.getCurrentIndexTimeTable()
      if (currentIndex && this.$refs.timeArea && this.$refs.timeItems) {
        this.$refs.timeArea.scrollLeft = this.$refs.timeItems[currentIndex].offsetLeft - 20
      }
    },
  },
  async created() {
    this.isLoading = true
    const DAY_OF_WEEK = this.$moment().isoWeekday()
    const { DATA } = await this.$api.timetable.GET_TIME_TABLE_DAYOFWEEK({
      DAY_OF_WEEK,
    })
    this.timeTableDay = DATA || []
    this.isLoading = false

    await this.$nextTick()
    this.updateScrollLeft()
  },
}
</script>
