<template>
  <v2-announcement-layout
    :announce-list="announceList"
    :is-delete.sync="isDelete"
    :selected-list.sync="selectedList"
    @remove="actionRemove"
    :is-loading="$fetchState.pending"
  >
  </v2-announcement-layout>
</template>

<script>
import { announceMixin } from '../../../../mixins/announce'

export default {
  name: 'Index',
  mixins: [announceMixin],
  provide() {
    return {
      refetch: () => this.getAlarms(),
    }
  },
  async fetch() {
    await this.getAlarms()
  },
  methods: {
    async getAlarms() {
      const now = require('lodash/now')
      try {
        const [alarms, announces] = await Promise.all([
          this.$api.alarm.GET_ALARM_LIST({
            SEARCH_UNIT: 9999,
            SEARCH_PAGE: this.pager,
          }),
          this.$api.announce.SEARCH_ANNOUNCE(),
        ])

        if (alarms.RESULT === 'SUCCESS' && announces.RESULT === 'SUCCESS') {
          const transformAlarm = alarms.DATA.ITEMS.map(item => {
            return {
              ...item,
              TITLE: item.NAME,
              CONTENT: item.DETAIL,
              DATE: item.RECEIVER_DATE,
            }
          })
          const announcements = announces.DATA.ITEMS.filter(item => item.WRITE_TYPE === this.$const.USER_TYPE.OPERATOR)
          this.announceList = this.$lodash.sortBy(transformAlarm.concat(announcements), item => {
            return now() - this.$moment(item.DATE).valueOf()
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped></style>
