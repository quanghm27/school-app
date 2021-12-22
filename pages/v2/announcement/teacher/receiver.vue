<template>
  <v2-template class-content="!p-0" :show-bottom-nav="false">
    <v2-header slot="header" title="Người nhận">
      <n-icon slot="left" icon="chevron-left" @click="$router.back()"></n-icon>
    </v2-header>
    <template slot="content">
      <div>
        <div class="p-4 flex items-center border-0 border-b border-gray-5 border-solid">
          <p class="text-[#E0402A]">Tất cả: {{ totalCount }}</p>
          <div class="h-4 w-[1px] mx-2 bg-gray-4"></div>
          <p class="text-gray-4">Chưa đọc: {{ unreadCount }}</p>
        </div>

        <div class="p-4 flex items-center justify-between" v-for="receiver in receivers" :key="receiver.RECEIVER_ID">
          <div class="flex items-center flex-1">
            <img
              :src="
                require(`~/assets/img/avatar-announce-${
                  receiver.RECEIVER_TYPE === $const.USER_TYPE.PARENT
                    ? 'parents'
                    : receiver.RECEIVER_TYPE === $const.USER_TYPE.TEACHER
                    ? 'teacher'
                    : 'student'
                }.png`)
              "
              alt=""
              width="32px"
              height="32px"
              class="mr-2 rounded-full"
            />
            <div>
              <p class="font-bold text-gray-2">{{ receiver.NAME }}</p>
              <span class="text-xs text-gray-4" v-if="receiver.RECEIVER_TYPE === $const.USER_TYPE.PARENT">
                Phụ huynh học sinh
              </span>
              <span class="text-xs text-gray-4" v-else-if="receiver.RECEIVER_TYPE === $const.USER_TYPE.STUDENT">{{
                `Học sinh lớp ${receiver.GROUP_NAME}`
              }}</span>
              <span class="text-xs text-gray-4 line-clamp-2" v-else>{{ receiver.GROUP_NAME }}</span>
            </div>
          </div>
          <div class="flex items-center ml-2" v-if="receiver.IS_READ">
            <p class="text-gray-4">Đã xem</p>
            <n-icon slot="left" icon="check-gray" class="w-4 h-4 ml-1"></n-icon>
          </div>
        </div>
      </div>
    </template>
  </v2-template>
</template>

<script>
import V2Template from '../../../../components/common/V2Template'
export default {
  name: 'Receiver',
  components: { V2Template },
  data() {
    return {
      receivers: null,
      totalCount: null,
      unreadCount: null,
    }
  },
  async fetch() {
    const params = {
      CONDITIONS: {
        ANNOUNCE_ID: this.$route.query.id,
      },
    }
    const { DATA } = await this.$api.announce.GET_RECEIVER_READ(params)

    const uniqBy = require('lodash/uniqBy')
    this.receivers = uniqBy(DATA.ITEMS, 'RECEIVER_ID')
    // this.receivers = uniqReceivers.filter(function(item, index) {
    //   if (!item.REFER_ID) {
    //     return item
    //   }
    //Remove những thằng trùng REFER_ID
    //   return !uniqReceivers.map(({ REFER_ID }) => REFER_ID).includes(item.REFER_ID, index + 1)
    // })

    this.totalCount = DATA.TOTAL_RECEIVER
    this.unreadCount = DATA.UNRECEIVER_COUNT
  },
}
</script>

<style scoped></style>
