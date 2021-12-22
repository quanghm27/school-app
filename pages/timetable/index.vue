<template>
  <ms-template default-header-left="drawer" :page-class="`${pageClass}`" :page-title="$t('menu_timetable')">
    <template slot="headerLeft">
      <ms-back />
    </template>
    <template slot="headerRight">
      <a @click.prevent="isWeekly = !isWeekly" class="icoApp-week"></a>
    </template>

    <template #headerBottom>
      <!-- Children -->
      <div class="showPerson" v-if="userRole === ROLE.PARENT">
        <ChildrenList :childs="childs" :current-child-id.sync="currentChildId" />
      </div>

      <!-- Day swipe -->
      <div class="showDaySwipe" v-if="!isWeekly">
        <DaySwipe :current-day.sync="currentDay" />
      </div>
    </template>

    <template #content>
      <!-- Timetable Empty -->
      <ms-timetable-blank v-if="isTimetableEmpty" />
      <template v-if="!isTimetableEmpty || !$fetchState.pending">
        <!-- Timetable Daily -->
        <TimetableDaily :role="userRole" :timetable="timetable" :current-day="currentDay" v-if="!isWeekly" />

        <!-- Timetable Weekly -->
        <TimetableWeekly :role="userRole" :timetable="timetable" v-else />
      </template>
    </template>
  </ms-template>
</template>

<script>
import { mapState } from 'vuex'
import { ROLE } from '~/constants'
import ChildrenList from '~/components/parent/ChildrenList'
import TimetableDaily from '~/components/timetable/TimetableDaily'
import TimetableWeekly from '~/components/timetable/TimetableWeekly'
import DaySwipe from '~/components/timetable/DaySwipe'

export default {
  components: {
    ChildrenList,
    TimetableDaily,
    TimetableWeekly,
    DaySwipe,
  },
  data() {
    return {
      ROLE,
      currentDay: this.$moment().isoWeekday(),
      childs: [],
      currentChildId: 0,
      isLoadChild: false,
      isLoadTimetable: false,
      isWeekly: false,
      timetable: {},
    }
  },
  computed: {
    ...mapState(['userRole', 'userInfo']),
    isParent() {
      return this.userRole === ROLE.PARENT
    },
    isTimetableEmpty() {
      return !this.timetable || !this.timetable.ITEMS || !this.timetable.ITEMS.length
    },
    pageClass() {
      const pageClass = []

      if (this.isParent) {
        pageClass.push('is-showPerson')
      }

      if (!this.isWeekly) {
        pageClass.push('is-showDaySwipe')
      }

      return pageClass.join(' ')
    },
  },
  methods: {
    async getTimeTableConfig() {
      let params = {}
      if (this.currentChildId) params.CHILD_ID = this.currentChildId

      const { DATA, RESULT } = await this.$api.timetable.GET_TIME_TABLE_CONFIG(params)

      if (RESULT === 'SUCCESS') {
        this.$store.commit('setLessonStartTimes', this.$utils.common.getLessonStartTimes(DATA))
        this.$store.commit('setLessonAfternoonStartTimes', this.$utils.common.getAfternoonStartTimes(DATA))
        this.$store.commit('setLessonFormat', this.$utils.common.getLessonFormat(DATA))
      }
    },
    async fetchChilds() {
      this.isLoadChild = true
      const { DATA } = await this.$api.parent.GET_CHILD_LIST()
      this.childs = DATA
      this.currentChildId = this.childs[0].CHILD_ID
      this.isLoadChild = false
    },
    async fetchTimetable() {
      this.isLoadTimetable = true
      const params = {
        CHILD_ID: this.isParent ? this.currentChildId : this.userInfo.USER_ID,
      }
      const { DATA } = await this.$api.timetable.GET_TIME_TABLE(params)

      this.timetable = DATA || {}
      this.isLoadTimetable = false
    },
  },

  async fetch() {
    if (this.isParent) {
      await this.fetchChilds()
    }

    this.getTimeTableConfig()
    this.fetchTimetable()
  },

  watch: {
    currentChildId() {
      this.getTimeTableConfig()
      this.fetchTimetable()
    },
  },
}
</script>
