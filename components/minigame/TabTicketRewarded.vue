<template>
  <div class="flex flex-col" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 20px 20px 0 rgba(0, 0, 0, 0.1);">
    <m-group-type-gift
      :select="typeGift"
      :list-items="listItems"
      v-model="typeGift"
      :on-click="getTicketRewarded"
      class="mt-2 mb-2"
    ></m-group-type-gift>
    <div class="flex-grow rounded-tl-nm rounded-tr-nm bg-white px-6 w-full shadow-lg justify-between shadow-lg">
      <div class="flex flex-row mt-5 justify-between items-center">
        <p class="text-red-D0A18F text-base font-bold">Người trúng giải</p>
        <!--        <p class="text-red-D0A18F text-base">Ở Lớp, Trường</p>-->
      </div>
      <div
        class="h-screen scrollbar"
        style="overflow-y: auto; overscroll-behavior-y: none;"
        :style="height < 600 ? 'height: 40vh' : height < 800 ? 'height: 50vh' : 'height: 58vh'"
      >
        <div
          v-for="(item, index) in ticketRewarded"
          :key="JSON.stringify(item)"
          class="flex flex-col justify-start items-start"
        >
          <div class="flex flex-row mt-4 justify-start items-center">
            <p class="text-xs text-gray-D0D6E3 w-8">{{ index + 1 }}</p>
            <img src="~/assets/img/minigame/rank-2.png" class="object-contain h-6 w-6 mr-2" />
            <div>
              <p class="text-gray-ACB4C3 text-base ml-3 font-bold">{{ item.name }}</p>
              <p class="text-gray-ACB4C3 text-sm ml-3">{{ 'Lớp ' + item.className + ' - ' + item.schoolName }}</p>
            </div>
          </div>
          <div class="w-full bg-gray-D0D6E3 mt-4" style="height: 1px; opacity: 30%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MGroupTypeGift from '@/components/minigame/MGroupTypeGift'
export default {
  name: 'TabTicketRewarded',
  components: { MGroupTypeGift },
  data() {
    return {
      ticketRewarded: [],
      typeGift: 'POSTER',
      height: window.innerHeight,
      listItems: [
        {
          id: 1,
          name: 'Poster',
          value: 'POSTER',
          image: 'poster.png',
        },
        {
          id: 2,
          name: 'Móc khoá',
          value: 'KEY',
          image: 'key.png',
        },
        {
          id: 3,
          name: 'Đồ ngủ',
          value: 'PYJAMA',
          image: 'pyjama.png',
        },
      ],
    }
  },
  mounted() {
    this.getTicketRewarded(this.typeGift)
  },
  methods: {
    async getTicketRewarded(value) {
      this.ticketRewarded = await this.$api.miniGame.TICKET_REWARDED({ TYPE: value })
    },
  },
}
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
