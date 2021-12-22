<template>
  <div
    class="flex flex-row rounded-2xl justify-between items-center py-5 pr-4 pl-2"
    :class="rank === 1 ? 'bg-yellow-FDECA8' : 'bg-white'"
  >
    <div class="flex flex-row justify-start items-center">
      <p class="text-xs font-bold w-4" :class="rank === 1 ? 'text-yellow-FCBD11' : 'text-gray-ACB4C3'">
        {{ rank }}
      </p>
      <img v-if="rank === 1" src="~/assets/img/minigame/rank-1.png" class="object-contain h-6 w-6 mr-2" />
      <img v-if="rank === 2" src="~/assets/img/minigame/rank-2.png" class="object-contain h-6 w-6 mr-2" />
      <img v-if="rank > 2" src="~/assets/img/minigame/rank-4.png" class="object-contain h-6 w-6 mr-2" />
      <div class="flex flex-col">
        <div class="flex flex-row justify-start items-center">
          <p class="text-base font-700" :class="rank === 1 ? 'text-yellow-FCBD11' : 'text-gray-ACB4C3'">{{ name }}</p>
        </div>
        <p class="text-xs font-700" :class="rank === 1 ? 'text-yellow-FCBD11' : 'text-gray-ACB4C3'">{{ info }}</p>
        <p v-if="rewarded" class="text-xs text-green-27AE60 font-bold mt-1">
          {{ ` Đã trúng thưởng` }}
        </p>
      </div>
    </div>
    <p class="text-base text-black-5C5C5C font-bold">
      {{ question }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'MItemRank',
  props: {
    rank: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    question: {
      type: Number,
      default: 0,
    },
    info: {
      type: String,
      default: '',
    },
    rewarded: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped></style>
