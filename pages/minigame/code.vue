<template>
  <div class="flex flex-col min-h-screen overscroll-auto relative">
    <!--    style="background: linear-gradient(122.73deg, #3550DC -61.52%, #27E9F7 169.17%);"-->
    <img src="~/assets/img/minigame/bg.png" class="w-full absolute" style="z-index: -1" />
    <div class="flex flex-col mt-4 mb-4 px-6 mt-10">
      <div class="flex flex-row justify-between items-start">
        <img src="~/assets/img/minigame/ic-back.png" class="object-contain h-8 w-8" @click="$router.back()" />
        <div class="flex flex-row justify-start items-center relative mt-4 mr-4">
          <img src="~/assets/img/minigame/lucky-icon.png" class="object-contain h-24" />
        </div>
        <div class="flex flex-row justify-start items-center">
          <img
            src="~/assets/img/minigame/ic-close.png"
            class="object-contain h-6 w-6"
            @click="$router.replace('/minigame/game')"
          />
        </div>
      </div>
      <m-group-rank :select="type" v-model="type" :list-items="listItems" class="mt-3" />
    </div>
    <tab-ticket-owned v-show="type === 'OWNED'" />
    <tab-ticket-rewarded v-show="type === 'REWARDED'" />
  </div>
</template>

<script>
import MGroupRank from '@/components/minigame/MGroupRank'
import TabTicketOwned from '@/components/minigame/TabTicketOwned'
import TabTicketRewarded from '@/components/minigame/TabTicketRewarded'

export default {
  name: 'Rank',
  components: { TabTicketRewarded, TabTicketOwned, MGroupRank },
  layout: 'minigame',
  data() {
    return {
      type: 'OWNED',
      ticketOwned: [],
      listItems: [
        {
          id: 1,
          name: 'Mã của bạn',
          value: 'OWNED',
        },
        {
          id: 2,
          name: 'Đã trúng thưởng',
          value: 'REWARDED',
        },
      ],
    }
  },
}
</script>
