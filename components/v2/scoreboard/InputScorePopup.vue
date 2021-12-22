<template>
  <ms-popup :show="value" v-on="$listeners" type="custom" @close="$emit('input', false)">
    <div class="pt-5" v-if="student">
      <div class="text-center">
        Học sinh {{ student.STUDENT_NAME }} đang có {{ currentScoreCount }} điểm thường xuyên. Xin vui lòng hoàn thiện
        thêm điểm vào ô dưới đây.
      </div>
      <div class="input-group py-2 px-3 mt-2 flex justify-center">
        <input v-model="firstScore" :class="{ 'error-score': !firstScoreValidated }" />
        <input v-model="secondScore" :class="{ 'error-score': !secondScoreValidated }" />
        <input v-model="thirdScore" :class="{ 'error-score': !thirdScoreValidated }" />
        <input v-model="fourthScore" :class="{ 'error-score': !fourthScoreValidated }" />
      </div>
    </div>
    <template #main-action>
      <div class="px-4 flex">
        <button class="flex-1 bg-white rounded-md p-4 text-[16px] font-bold" @click="$emit('retry')">
          Chọn lại
        </button>
        <button class="flex-1 bg-teacher rounded-md text-white p-4 text-[16px] font-bold" @click="save">
          Lưu điểm
        </button>
      </div>
    </template>
  </ms-popup>
</template>

<script>
export default {
  name: 'InputScorePopup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    student: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      firstScore: null,
      secondScore: null,
      thirdScore: null,
      fourthScore: null,
    }
  },
  computed: {
    currentScoreCount() {
      return [this.firstScore, this.secondScore, this.thirdScore, this.fourthScore].filter(score => !!score).length
    },
    firstScoreValidated() {
      return this.isValidScore(this.firstScore)
    },
    secondScoreValidated() {
      return this.isValidScore(this.secondScore)
    },
    thirdScoreValidated() {
      return this.isValidScore(this.thirdScore)
    },
    fourthScoreValidated() {
      return this.isValidScore(this.fourthScore)
    },
    scoresValidated() {
      return (
        this.firstScoreValidated && this.secondScoreValidated && this.thirdScoreValidated && this.fourthScoreValidated
      )
    },
  },
  watch: {
    student(s) {
      if (s) {
        this.firstScore = s.FIRST_REG_SCORE
        this.secondScore = s.SECOND_REG_SCORE
        this.thirdScore = s.THIRD_REG_SCORE
        this.fourthScore = s.FOURTH_REG_SCORE
      }
    },
  },
  methods: {
    isValidScore(score) {
      if (score) {
        if (isNaN(+score)) {
          return score === this.$const.PASS_FAIL_TYPE.PASS || score === this.$const.PASS_FAIL_TYPE.FAIL
        }
        return score < 10 && score > 0 && score.length <= 3
      }
      return true
    },
    save() {
      if (!this.scoresValidated) {
        return
      }
      this.$emit('save', [this.firstScore, this.secondScore, this.thirdScore, this.fourthScore])
    },
  },
}
</script>

<style scoped>
.input-group input {
  height: 50px;
  width: 50px;
  background-color: #f8f8f8;
  margin: 0 4px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: 1px solid #d1d1d6;
  border-radius: 2px;
}
.input-group input.error-score {
  border: 1px solid #ee493d;
}
</style>
