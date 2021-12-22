<template>
  <section class="mb-6 p-0">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-[22px] font-bold">Thông báo</h3>
      <div class="flex items-center justify-end mr-5">
        <n-link :to="{ name: 'v2-announcement' }">Xem tất cả</n-link>
        <n-icon icon="chevron-right" class="w-2 h-2 ml-2"></n-icon>
      </div>
    </div>
    <div class="flex overflow-x-auto scrollbar">
      <div class="flex-nowrap flex flex-1">
        <skeleton-home-notification v-if="$fetchState.pending" />
        <template v-else>
          <template v-if="$lodash.isEmpty(alarms)">
            <div class="h-[94px] w-full mr-4 bg-white rounded-md flex flex-col items-center justify-center">
              <n-icon icon="empty-card" class="w-10 !h-14"></n-icon>
              <p class="text-xs text-gray-3">Chưa có thông báo nào</p>
            </div>
          </template>
          <div
            v-else
            v-for="alarm in alarms"
            :key="alarm.ID"
            class="bg-white w-[290px] mr-2 rounded shadow-card-home p-2.5"
          >
            <div class="flex h-full" @click.prevent="handlerClickAlarmItem(alarm)">
              <div class="w-18 h-18 mr-2">
                <img :src="alarm.IMG_URL || require('~/assets/img/img-noti.png')" alt="" class="w-full" />
              </div>
              <div class="flex-1 overflow-x-hidden flex flex-col justify-between">
                <div>
                  <p class="font-medium mb-1 line-clamp-1">
                    {{ alarm.TITLE }}
                  </p>
                  <span
                    class="text-[10px] text-[#5A5A5A] line-clamp-2 leading-[150%] max-h-[30px] overflow-hidden"
                    v-html="alarm.CONTENT"
                  ></span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <n-icon icon="wall-clock" class="w-3.5 h-3.5 mr-1"></n-icon>
                    <p class="text-[10px] text-gray-AEAEB2">
                      {{ $moment(alarm.DATE).fromNow() }}
                      -
                      {{ alarm.DATE | formatDates('DD/MM/YYYY') }}
                    </p>
                  </div>
                  <div v-if="!alarm.IS_READ" class="bg-red-teacher px-2 rounded-full text-white text-[12px] leading-5">
                    Mới
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import SkeletonHomeNotification from '../../skeleton/SkeletonHomeNotification'
export default {
  name: 'HomeNotification',
  components: { SkeletonHomeNotification },
  data() {
    return {
      alarms: [],
    }
  },
  async fetch() {
    const { DATA } = await this.$api.announce.SEARCH_ANNOUNCE()
    this.alarms = DATA?.ITEMS.filter(item => item.ADMIN).filter((_, index) => index < 3)
  },
  methods: {
    async handlerClickAlarmItem(item) {
      this.$utils.app.dispatch({ type: 'CLEAR_NOTIFICATION', payload: item.ID })
      if (this.$route.name !== 'alarm') {
        this.$router.push({ name: 'v2-announcement-teacher-id', params: { id: item.ID } })
      }
      if (!item.IS_READ) {
        const params = {
          ID: item.ID,
          REFER_ID: item.REFER_ID,
          TYPE: item.PAYMENT ? this.$const.ANNOUNCE_TYPES.PAYMENT : this.$const.ANNOUNCE_TYPES.ANNOUNCE,
          GROUP_TYPE: item.GROUP_TYPE,
        }
        const { RESULT } = await this.$api.announce.MARK_VIEW(params)

        if (RESULT === 'SUCCESS') {
          item.IS_READ = true
        }
      }
    },
  },
}
</script>

<style scoped></style>
