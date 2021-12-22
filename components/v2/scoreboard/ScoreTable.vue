<template>
  <div>
    <table class="v2-table">
      <thead>
        <tr>
          <th v-for="(h, i) in headers" :key="i" :colspan="h.colspan" class="font-medium" :style="{ width: h.width }">
            {{ h.name }}
          </th>
        </tr>
      </thead>
      <tr v-for="s in value" :key="s.id">
        <td class="name-cell">
          {{ s.name }}
        </td>
        <template v-if="evaluateType === $const.EVALUATE_TYPE.SCORE">
          <td v-for="(score, i) in s.scores" :key="i" @click="onClickScore(s.id, i)" style="padding: 0">
            <input
              :disabled="disabled"
              type="number"
              :ref="`${s.id}_${i}`"
              :value="score"
              @blur="onInputChange(s.id, i, $event.target.value)"
            />
          </td>
        </template>
        <template v-else>
          <td
            style="padding: 0"
            v-for="(score, i) in s.scores"
            :key="i"
            @click="selectedScore = disabled ? null : { studentId: s.id, scoreIndex: i }"
          >
            {{ disabled || score === $const.PASS_FAIL_TYPE.PASS || score === $const.PASS_FAIL_TYPE.FAIL ? score : '' }}
          </td>
        </template>
      </tr>
    </table>

    <BottomSheetSelect
      :title="$t('Chọn điểm')"
      v-model="showBottomSheetSelect"
      :options="passFailOptions"
      :selected="selectedPassFail"
      @select="onSelectPassFail"
    />
  </div>
</template>

<script>
import BottomSheetSelect from '~/components/v2/scoreboard/BottomSheetSelect'
import { EVALUATE_TYPE } from '@/constants'

export default {
  name: 'ScoreTable',
  components: { BottomSheetSelect },
  props: {
    value: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      default: null,
    },
    evaluateType: {
      type: Number,
      default: EVALUATE_TYPE.PASS_FAIL,
    },
  },
  data() {
    return {
      selectedScore: null,
    }
  },
  computed: {
    showBottomSheetSelect: {
      get() {
        return !!this.selectedScore
      },
      set() {
        this.selectedScore = null
      },
    },
    passFailOptions() {
      return [
        { value: this.$const.PASS_FAIL_TYPE.PASS, label: 'Đạt' },
        { value: this.$const.PASS_FAIL_TYPE.FAIL, label: 'Chưa đạt' },
      ]
    },
    selectedPassFail() {
      if (!this.selectedScore) {
        return null
      }
      const { studentId, scoreIndex } = this.selectedScore
      return this.value.find(s => s.id === studentId)?.scores[scoreIndex]
    },
  },
  methods: {
    onClickScore(studentId, scoreIndex) {
      const input = this.$refs[`${studentId}_${scoreIndex}`][0]
      if (!input) {
        return
      }
      input.focus()
      const val = input.value
      input.value = ''
      input.value = val
    },
    onInputChange(studentId, scoreIndex, value) {
      if (!value || (+value <= 10 && value.length <= 3)) {
        this.updateScore(studentId, scoreIndex, isNaN(parseFloat(value)) ? null : +value)
      }
      if (value) {
        this.$forceUpdate()
      }
    },
    onSelectPassFail(value) {
      const { studentId, scoreIndex } = this.selectedScore
      this.updateScore(studentId, scoreIndex, value)
      this.showBottomSheetSelect = false
    },
    updateScore(studentId, scoreIndex, value) {
      this.$emit(
        'input',
        this.value.map(s => {
          if (s.id === studentId) {
            return {
              ...s,
              scores: [...s.scores.slice(0, scoreIndex), value, ...s.scores.slice(scoreIndex + 1)],
            }
          }
          return s
        }),
      )
    },
  },
}
</script>

<style scoped>
.name-cell {
  text-align: left;
}
</style>
