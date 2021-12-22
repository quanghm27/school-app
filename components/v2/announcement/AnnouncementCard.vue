<template>
  <div class="bg-white rounded-md mb-4 relative shadow-card">
    <div class="p-4 border border-gray-6 border-solid border-l-0 border-t-0 border-r-0">
      <div class="flex items-center justify-between">
        <div @click="goDetail(item)" class="font-bold text-[16px] line-clamp-1 mb-1 flex-1">
          {{ item.TITLE | capitalized }}
        </div>
        <div v-if="router === 'sent'" class="bg-green-27AE60 px-2 rounded-full text-white text-[12px] leading-5 ml-2">
          Đã gửi
        </div>
        <template v-else>
          <div v-if="!item.IS_READ" class="bg-red-teacher px-2 rounded-full text-white text-[12px] leading-5 ml-2">
            Mới
          </div>
        </template>
      </div>

      <div class="text-gray-4 text-xs mb-2">{{ item.DATE | formatDates('DD/MM/YYYY HH:mm') }}</div>
      <div class="text-gray-3 text-xs line-clamp-2 relative mb-2" v-html="item.CONTENT" />
      <div class="flex items-center mb-2 flex-wrap" v-if="item.FILE">
        <div
          v-for="file in item.FILE"
          :key="file.URL"
          class="py-2 px-4 bg-gray-6 rounded-full flex items-center my-1 max-w-[100%]"
        >
          <n-icon icon="attachment" class-name="w-6 h-4 mr-2"></n-icon>
          <span class="line-clamp-1">{{ shortFile(file.NAME) }}</span>
        </div>
      </div>
      <div v-if="item.PAYMENT" class="rounded-md bg-gray-F9F9F9 p-3.5">
        <div class="mb-4 text-gray-2 text-xs">{{ item.PAYMENT.TITLE | capitalized }}</div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <p class="text-gray-5 uppercase">VND</p>
            <p class="ml-1 text-green-25AF0E font-bold">{{ item.PAYMENT.AMOUNT | formatMoneyVND(false) }}</p>
          </div>
          <button
            :disabled="item.PAYMENT.IS_PAID"
            class="bg-green-25AF0E px-3 py-1 leading-5 text-xs rounded-full text-white"
            :class="[{ '!bg-gray-5': item.PAYMENT.IS_PAID }]"
          >
            {{ item.PAYMENT.IS_PAID ? 'Đã thanh toán' : 'Thanh toán' }}
          </button>
        </div>
      </div>
    </div>
    <div class="p-4 flex items-center justify-between relative" v-if="router === 'common' && isDelete">
      <div v-if="isDelete" @click="$emit('selected-item')" class="absolute right-4 my-auto z-10">
        <n-icon :icon="`${isSelected ? 'check_rec' : 'check_rec_outline'}`" class="w-4 h-4"></n-icon>
      </div>
    </div>
    <div class="p-4 flex items-center justify-between relative" v-else>
      <div class="flex items-center" v-if="router !== 'common'">
        <div class="flex items-center mr-4" @click="toggleLike(item)">
          <n-icon :icon="item.IS_LIKE ? 'heart' : 'heart-outline'" class="w-4 h-4 mr-1"></n-icon>
          <span class="text-sm">{{ item.LIKE_COUNT || 0 }}</span>
        </div>
        <template v-if="router !== ''">
          <div class="flex items-center mr-4" v-if="router !== 'payment'">
            <n-icon icon="message" class="w-4 h-4 mr-1"></n-icon>
            <span class="text-sm">{{ item.COMMENT_COUNT || 0 }}</span>
          </div>
          <div class="flex items-center mr-4" v-if="router !== 'teacher'" @click="goReceiver(item.ID)">
            <n-icon icon="eye" class="w-4 h-4 mr-1"></n-icon>
            <span class="text-sm">{{ item.VIEW_COUNT || 0 }}</span>
          </div>
        </template>
      </div>

      <div v-if="isDelete" @click="$emit('selected-item')" class="absolute right-4 my-auto z-10">
        <n-icon :icon="`${isSelected ? 'check_rec' : 'check_rec_outline'}`" class="w-4 h-4"></n-icon>
      </div>
    </div>
    <div v-show="isSelected" class="absolute bg-black h-full w-full top-0 rounded left-0 bg-opacity-40 z-0"></div>
  </div>
</template>

<script>
export default {
  name: 'V2AnnouncementCard',
  inject: {
    router: {
      default: '',
    },
    refetch: {
      default: false,
    },
  },
  props: {
    currentTab: {
      type: String,
      default: '',
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    selectedItem: {
      type: Function,
      default: () => {},
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    toggleLike(currentLike) {
      const params = {
        ID: currentLike.ID,
        REFER_ID: currentLike.REFER_ID || null,
        TYPE: currentLike?.PAYMENT ? this.$const.ANNOUNCE_TYPES.PAYMENT : this.$const.ANNOUNCE_TYPES.ANNOUNCE,
        GROUP_TYPE: currentLike.GROUP_TYPE || 2,
      }
      if (!currentLike.IS_LIKE) {
        currentLike.LIKE_COUNT = currentLike.LIKE_COUNT + 1
        currentLike.IS_LIKE = true
      } else {
        currentLike.LIKE_COUNT = currentLike.LIKE_COUNT - 1
        currentLike.IS_LIKE = false
      }
      this.$api.announce.MARK_LIKE(params)
    },
    async markReadAlarm(ID) {
      await this.$api.alarm.MARK_READ_ALARM({ ID })
      this.refetch()
    },
    markView(params) {
      return this.$api.announce.MARK_VIEW(params)
    },
    goDetail(info) {
      const params = {
        ID: info.ID,
        REFER_ID: info.REFER_ID,
        TYPE: info.PAYMENT ? this.$const.ANNOUNCE_TYPES.PAYMENT : this.$const.ANNOUNCE_TYPES.ANNOUNCE,
        GROUP_TYPE: info.GROUP_TYPE,
      }
      let name = ''
      switch (this.router) {
        case 'teacher':
          if (info.PAYMENT) {
            name = ''
          } else {
            name = 'v2-announcement-teacher-id'
          }
          if (!info.IS_READ) this.markView(params)
          break
        case 'sent':
          name = 'v2-announcement-sent-id'
          break
        case 'common':
          if (!info.IS_READ) this.markReadAlarm(info.ID)
          return
        case 'payment':
          if (!info.IS_READ) this.markView(params)
          return
        default:
          if (!info.IS_READ) this.markView(params)
          name = 'v2-announcement-id'
      }
      this.$router.push({ name, params: { id: info.ID } })
    },
    goReceiver(id) {
      if (this.router === 'sent') {
        this.$router.push({ name: 'v2-announcement-teacher-receiver', query: { id } })
      }
    },
    shortFile(fileName) {
      return this.$utils.file.shortImageName(fileName)
    },
  },
}
</script>

<style scoped></style>
