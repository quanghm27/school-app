<template>
  <ms-template :page-title="$t('menu_my_news')">
    <ms-back slot="headerLeft" />
    <section class="alarm" v-infinite-scroll="loadMore">
      <AlarmList :data="alarmList" :loading="$fetchState.pending" :infinite-loading="true" v-if="alarmList.length" />
    </section>
    <ms-announce-blank v-if="!$fetchState.pending && !alarmList.length" />
  </ms-template>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import AlarmList from '@/components/alarm/AlarmList'

export default {
  components: { AlarmList },
  directives: { infiniteScroll },
  data() {
    return {
      alarmList: [],
      pager: 0,
      totalCount: 0,
    }
  },
  watch: {
    pager: '$fetch',
  },
  async fetch() {
    const { DATA } = await this.$api.alarm.GET_ALARM_LIST({
      SEARCH_UNIT: 10,
      SEARCH_PAGE: this.pager,
    })
    if (DATA.ITEMS && DATA.ITEMS.length) {
      this.alarmList.push(...DATA.ITEMS)
      this.totalCount = DATA.TOTAL_COUNT
    }
  },
  methods: {
    loadMore() {
      const alarmLength = this.alarmList.length
      if (!alarmLength) {
        return
      }
      if (alarmLength >= this.totalCount) {
        return
      }
      this.pager += 1
    },
  },
}
</script>
