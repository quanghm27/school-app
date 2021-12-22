<template>
  <section class="child is-active">
    <div class="homeTop">
      <h2 class="home-title">{{ $t('text_children_state') }}</h2>
      <nuxt-link :to="{ name: 'setting-manage-children' }" class="home-link">
        {{ $t('btn_children_management') }}
      </nuxt-link>
    </div>
    <div class="childList">
      <ms-spinner v-if="$fetchState.pending" />
      <div class="u-box" v-else>
        <div class="childList-item" v-for="item in childList" :key="item.CHILD_ID">
          <ul class="u-tb">
            <li class="child-img">
              <div class="u-pic" :style="`background-image: url(${item.IMG_URL || '/img/default_student.jpg'})`" />
            </li>
            <li>
              <h3 class="person-name">{{ item.CHILD_NAME }}</h3>
              <p class="person-school">{{ item.SCHOOL_NAME }}</p>
              <p class="person-school">
                {{ SCHEDULE_TEXT[item.SCHEDULE] }}
              </p>
            </li>
            <li class="child-status">
              <i :class="['icoApp-status', { 'is-active': item.STATUS === STUDENT_STATUS.AT_SCHOOL }]"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { SCHEDULE, STUDENT_STATUS } from '~/constants'

export default {
  name: 'ParentStatus',
  data() {
    return {
      SCHEDULE_TEXT: {
        [SCHEDULE.HOLIDAY]: this.$t('text_holiday'),
        [SCHEDULE.EVENT]: this.$t('text_event'),
        [SCHEDULE.WEEKEND]: this.$t('text_holiday_weekend'),
        [SCHEDULE.SCHOOL_DAY]: this.$t('text_school_status'),
      },
      STUDENT_STATUS,
      childList: [],
    }
  },
  async fetch() {
    const { DATA } = await this.$api.parent.GET_CHILD_LIST()
    this.childList = DATA
  },
}
</script>
