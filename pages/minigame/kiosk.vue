<template>
  <div class="flex flex-col min-h-screen overscroll-auto relative">
    <!--    style="background: linear-gradient(122.73deg, #3550DC -61.52%, #27E9F7 169.17%);"-->
    <img src="~/assets/img/minigame/bg.png" class="w-full absolute" style="z-index: -1" />
    <div class="flex flex-col mt-4 mb-4 px-6 mt-10">
      <div class="flex flex-row justify-center items-start">
        <div class="flex flex-row justify-start items-center relative mt-4 mr-4">
          <img src="~/assets/img/minigame/lucky-icon.png" class="object-contain h-24" />
        </div>
      </div>
    </div>
    <kiosk-ticket-rewarded />
  </div>
</template>

<script>
import KioskTicketRewarded from '@/components/minigame/KioskTicketRewarded'

export default {
  name: 'Kiosk',
  components: { KioskTicketRewarded },
  layout: 'blank',
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
