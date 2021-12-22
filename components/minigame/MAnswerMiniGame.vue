<template>
  <div>
    <div
      v-if="!check"
      class="flex flex-row rounded-xl py-3 px-6 justify-start items-center cursor-pointer bg-white border shadow-2xl"
      style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 20px 20px 0 rgba(0, 0, 0, 0.1);"
      @click="handleClick"
    >
      <img src="~/assets/img/minigame/circle-normal.png" class="object-contain h-6 w-6" />
      <p class="text-base mx-4" :class="check ? (isCorrect ? 'text-white' : 'text-black') : 'text-black'">
        {{ answer }}
      </p>
    </div>
    <div
      v-else
      class="flex flex-row rounded-xl py-3 px-6 justify-start items-center cursor-pointer"
      style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 20px 20px 0 rgba(0, 0, 0, 0.1);"
      :class="
        isCorrect
          ? 'bg-green-6FCF97 border-0'
          : select === value
          ? 'bg-red-F7E5E5 border-0'
          : value === correct
          ? 'bg-white border-green-27AE60 border-4'
          : 'bg-white border'
      "
    >
      <img v-if="isCorrect" src="~/assets/img/minigame/circle-white.png" class="object-contain h-6 w-6" />
      <img
        v-if="!isCorrect && select !== value && value === correct"
        src="~/assets/img/minigame/check.png"
        class="object-contain h-6 w-6"
      />
      <img
        v-if="!isCorrect && select !== value && value !== correct"
        src="~/assets/img/minigame/circle-normal.png"
        class="object-contain h-6 w-6"
      />
      <img
        v-if="!isCorrect && select === value"
        src="~/assets/img/minigame/circle-wrong.png"
        class="object-contain h-6 w-6"
      />
      <p class="text-base mx-4" :class="check ? (isCorrect ? 'text-white' : 'text-black') : 'text-black'">
        {{ answer }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MAnswerMiniGame',
  props: {
    answer: {
      type: String,
      default: '',
    },
    check: {
      type: Boolean,
      default: false,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    isSelect: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
    select: {
      type: Number,
      default: 0,
    },
    correct: {
      type: Number,
      default: 0,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    handleClick() {
      this.onClick(this.value)
    },
  },
}
</script>

<style scoped></style>
