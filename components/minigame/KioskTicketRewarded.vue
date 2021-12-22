<template>
  <div class="flex flex-col" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 20px 20px 0 rgba(0, 0, 0, 0.1);">
    <div class="flex-grow rounded-tl-nm rounded-tr-nm bg-white px-6 w-full shadow-lg justify-between shadow-lg">
      <div class="flex flex-row mt-5 justify-between items-center">
        <p class="text-red-D0A18F text-base font-bold">Danh sách trúng giải</p>
        <!--        <p class="text-red-D0A18F text-base">Ở Lớp, Trường</p>-->
      </div>
      <div class="h-screen scrollbar" style="overflow-y: auto; overscroll-behavior-y: none;">
        <div
          v-for="(item, index) in ticketRewarded"
          :key="JSON.stringify(item)"
          class="flex flex-col justify-start items-start"
        >
          <div class="flex flex-row mt-4 justify-start items-center">
            <p class="text-xs text-gray-D0D6E3 w-8">{{ index + 1 }}</p>
            <img src="~/assets/img/minigame/rank-2.png" class="object-contain h-6 w-6 mr-2" />
            <div>
              <p class="text-black-333333 text-base ml-3 font-bold">{{ item.name }}</p>
              <p class="text-black-333333 text-sm ml-3">{{ 'Lớp ' + item.className + ' - ' + item.schoolName }}</p>
            </div>
          </div>
          <div class="w-full bg-gray-D0D6E3 mt-4" style="height: 1px; opacity: 30%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KioskTicketRewarded',
  data() {
    return {
      ticketRewarded: [],
      typeGift: 'POSTER',
    }
  },
  mounted() {
    this.getTicketRewarded(this.typeGift)
  },
  methods: {
    async getTicketRewarded(value) {
      this.ticketRewarded = await this.$api.miniGame.KIOSK_TICKET_REWARDED({ TYPE: value })
    },
  },
}
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
