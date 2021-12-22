<template>
  <div v-if="!$fetchState.pending" class="flex flex-col min-h-screen overscroll-auto relative">
    <!--    style="background: linear-gradient(122.73deg, #3550DC -61.52%, #27E9F7 169.17%)"-->
    <img src="~/assets/img/minigame/bg.png" class="w-full absolute" style="z-index: -1" />
    <div class="flex flex-col mt-4 mb-4 px-6 mt-10">
      <div class="flex flex-row justify-between items-start">
        <img src="~/assets/img/minigame/ic-back.png" class="object-contain h-8 w-8" @click="$router.back()" />
        <div class="flex flex-row justify-start items-center relative mt-4">
          <img v-show="type === 'CLASS'" src="~/assets/img/minigame/BXH-lop.png" class="object-contain h-28" />
          <img v-show="type === 'GRADE'" src="~/assets/img/minigame/BXH-khoi.png" class="object-contain h-28" />
          <img v-show="type === 'SCHOOL'" src="~/assets/img/minigame/BXH-truong.png" class="object-contain h-28" />
          <img v-show="type === 'ALL'" src="~/assets/img/minigame/BXH-all.png" class="object-contain h-28" />
        </div>
        <div class="flex flex-row justify-start items-center">
          <img
            src="~/assets/img/minigame/ic-close.png"
            class="object-contain h-6 w-6"
            @click="$router.replace('/minigame/game')"
          />
        </div>
      </div>
      <p class="text-base font-bold" style="color: #944200">Từ ngày {{ weekStart }} đến {{ weekEnd }}</p>
      <m-group-rank :select="type" v-model="type" class="mt-2" :on-click="getLeaderBoard" :list-items="listItems" />
      <div class="flex flex-row mt-5 justify-between items-center">
        <p class="text-base font-bold" style="color: #944200">Số câu bạn trả lời đúng</p>
        <p class="text-base font-bold" style="color: #944200">{{ ticketOwned.length }}</p>
      </div>
    </div>
    <div
      class="flex-grow rounded-tl-nm rounded-tr-nm bg-white px-6 w-full shadow-lg justify-between shadow-lg"
      style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 20px 20px 0 rgba(0, 0, 0, 0.1);"
    >
      <div class="flex flex-row mt-5 justify-between items-center mb-3">
        <p class="text-red-D0A18F text-base">Học sinh</p>
        <p class="text-red-D0A18F text-base">Số câu đúng</p>
      </div>
      <!--      <m-item-rank :rank="1" name="Chu Quang Long" question="6943" />-->
      <div
        class="scrollbar"
        style="overflow-y: auto; overscroll-behavior-y: none;"
        :style="height < 600 ? 'height: 43vh' : height < 800 ? 'height: 53vh' : 'height: 60vh'"
      >
        <m-item-rank
          v-for="(item, index) in leaderBoard"
          :key="JSON.stringify(item) + type"
          :name="item.name"
          :question="item.numTicket"
          :rank="index + 1"
          :info="`Lớp ${item.className} - ${item.schoolName}`"
          :rewarded="item.rewardPyjama > 0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MGroupRank from '@/components/minigame/MGroupRank'
import MItemRank from '@/components/minigame/MItemRank'
export default {
  name: 'Rank',
  components: { MItemRank, MGroupRank },
  layout: 'minigame',
  data() {
    return {
      weekStart: this.$moment()
        .startOf('week')
        .format('DD/MM/YYYY'),
      weekEnd: this.$moment()
        .endOf('week')
        .format('DD/MM/YYYY'),
      type: 'CLASS',
      leaderBoard: [],
      ticketOwned: [],
      height: window.innerHeight,
      listItems: [
        {
          id: 1,
          name: 'Lớp',
          value: 'CLASS',
        },
        {
          id: 2,
          name: 'Khối',
          value: 'GRADE',
        },
        {
          id: 3,
          name: 'Trường',
          value: 'SCHOOL',
        },
        {
          id: 4,
          name: 'Tất cả',
          value: 'ALL',
        },
      ],
    }
  },
  async fetch() {
    return await Promise.all([this.getLeaderBoard(this.type), this.getTicketOwned()])
  },
  methods: {
    async getLeaderBoard(type) {
      this.leaderBoard = await this.$api.miniGame.LEADER_BOARD({ TYPE: type })
      console.log('leaderBoard', this.leaderBoard)
    },
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
