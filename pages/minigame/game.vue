<template>
  <div class="flex flex-col h-screen bg-cover bg-center bg-no-repeat relative">
    <!--       style="background: linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%);">-->
    <img src="~/assets/img/minigame/bg_game.png" class="w-full h-full absolute" style="z-index: -1" />
    <div class="flex flex-col mt-8 px-6 pb-2">
      <div class="flex flex-row justify-between items-center">
        <img src="~/assets/img/minigame/ic-back.png" class="object-contain h-8 w-8" @click="$router.replace('/')" />
        <div class="flex flex-row justify-start items-center">
          <nuxt-link to="/minigame/code">
            <img src="~/assets/img/minigame/ic-code.png" class="object-contain h-8 w-8 mr-4" />
          </nuxt-link>
          <nuxt-link to="/minigame/rank">
            <img src="~/assets/img/minigame/ic-rank.png" class="object-contain h-8 w-8 mr-4 mb-1" />
          </nuxt-link>
          <nuxt-link to="/minigame/info">
            <img src="~/assets/img/minigame/ic-info.png" class="object-contain h-8 w-8" />
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="scrollbar relative" style="overflow-y: auto; overscroll-behavior-y: none; height: 96%">
      <!--      <div class="absolute top-6 flex flex-col justify-center items-center w-full" style="z-index: -1">-->
      <!--        <img src="~/assets/img/minigame/badge.png" class="object-contain" />-->
      <!--      </div>-->
      <div class="flex flex-row justify-center items-center mt-4 mb-12">
        <img src="~/assets/img/minigame/dautruong.png" class="object-contain w-3/4" />
      </div>
      <div class="px-6 w-full flex-grow">
        <p class="text-xl mb-12 font-bold min-h-56" style="color: #21728C">{{ content.question }}</p>
        <m-answer-mini-game
          class="my-6 w-full"
          :answer="content.caseB"
          :value="1"
          :check="check"
          :correct="content.caseTrue"
          :select="answer"
          :is-correct="answer == content.caseTrue && answer === 1"
          :on-click="handleClick"
        />
        <m-answer-mini-game
          class="my-6 w-full"
          :answer="content.caseC"
          :value="2"
          :check="check"
          :correct="content.caseTrue"
          :select="answer"
          :is-correct="answer == content.caseTrue && answer === 2"
          :on-click="handleClick"
        />
        <m-answer-mini-game
          class="my-6 w-full"
          :answer="content.caseD"
          :value="3"
          :check="check"
          :correct="content.caseTrue"
          :select="answer"
          :is-correct="answer == content.caseTrue && answer === 3"
          :on-click="handleClick"
        />
      </div>
      <div class="flex flex-row justify-center items-center w-full">
        <m-check-answer :check="check" class="w-1/2 mb-4" :on-click="pressNext" />
      </div>
    </div>
  </div>
</template>

<script>
import MAnswerMiniGame from '@/components/minigame/MAnswerMiniGame'
import MCheckAnswer from '@/components/minigame/MCheckAnswer'
import bgGame from '~/assets/img/minigame/bg_game.png'
import background from '~/assets/img/minigame/bg.png'
export default {
  name: 'Game',
  components: { MCheckAnswer, MAnswerMiniGame },
  layout: 'minigame',
  data() {
    return {
      content: {
        caseB: 'Đáp án A',
        caseC: 'Đáp án B',
        caseD: 'Đáp án C',
        question: 'Đang tải câu hỏi tiếp theo.....',
      },
      check: true,
      answer: 0,
      bgGame,
      background,
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    async getQuestion() {
      const data = await this.$api.miniGame.GET_QUESTION()
      this.content = data
      this.check = false
      if (data && data.id % 100 === 10 && data.id <= 1000) {
        this.$utils.app.dispatch({ type: 'REQUEST_IN_APP_REVIEW', payload: {} })
      }
    },
    async handleClick(value) {
      if (this.check) return
      this.check = true
      this.answer = value
      if (this.content.caseTrue === value) {
        const result = await this.$api.miniGame.GET_TICKET()
        console.log('result', result)
        this.$toast.success('Bạn đã nhận được mã số dự thưởng: ' + result.code)
      }
    },
    async pressNext() {
      this.content = {
        caseB: 'Đáp án A',
        caseC: 'Đáp án B',
        caseD: 'Đáp án C',
        question: 'Đang tải câu hỏi tiếp theo.....',
      }
      this.answer = 0
      await this.getQuestion()
      this.check = false
    },
  },
}
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}

.min-h-56 {
  min-height: 84px;
}
</style>
