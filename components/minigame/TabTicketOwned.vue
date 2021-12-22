<template>
  <div
    class="flex-grow rounded-tl-nm rounded-tr-nm bg-white px-6 w-full shadow-lg justify-between shadow-lg"
    style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 20px 20px 0 rgba(0, 0, 0, 0.1);"
  >
    <p class="font-bold text-red-5C2D00 text-lg w-full text-center mt-4">Tổng hợp mã dự thưởng</p>
    <div class="flex flex-row mt-5 justify-between items-center mb-3">
      <p class="text-red-D0A18F text-base">Mã dự thưởng của bạn</p>
      <p class="text-red-D0A18F text-base">{{ ticketOwned.length }}</p>
    </div>
    <div
      class="scrollbar"
      style="overflow-y: auto; overscroll-behavior-y: none;"
      :style="height < 600 ? 'height: 48vh' : height < 800 ? 'height: 55vh' : 'height: 62vh'"
    >
      <div
        v-for="(item, index) in ticketOwned"
        :key="JSON.stringify(item)"
        class="flex flex-col justify-start items-start"
      >
        <div class="flex flex-row mt-4">
          <p class="text-xs text-gray-D0D6E3 w-8">{{ index + 1 }}</p>
          <div class="flex-grow">
            <p class="text-gray-ACB4C3 font-bold ml-3">{{ item.code }}</p>
            <p class="text-gray-ACB4C3 text-sm ml-3">{{ item.createAt | formatDates('ddd, DD/MM/YYYY') }}</p>
          </div>
          <p v-if="item.giftPoster || item.giftKey || item.giftPyjama" class="text-green-27AE60 font-bold">
            {{ `- Mã trúng thưởng` }}
          </p>
        </div>
        <div class="w-full bg-gray-D0D6E3 mt-4" style="height: 1px; opacity: 30%"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabTicketOwned',
  data() {
    return {
      ticketOwned: [],
      height: window.innerHeight,
    }
  },
  mounted() {
    this.getTicketOwned()
  },
  methods: {
    async getTicketOwned() {
      this.ticketOwned = await this.$api.miniGame.TICKET_OWNED()
    },
  },
}
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
