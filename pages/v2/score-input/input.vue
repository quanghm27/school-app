<template>
  <v2-template :show-bottom-nav="false">
    <v2-header slot="header" title="Lựa chọn nhập điểm">
      <n-icon slot="left" icon="chevron-left" @click="$router.push({ name: 'v2-score-input', query: $route.query })" />
      <!-- TODO: fix header alignment and remove this shit -->
      <div slot="right" style="width: 32px" />
    </v2-header>
    <template slot="content">
      <div class="pr-4 pb-[86px]" v-if="!$fetchState.pending">
        <div class="relative">
          <input
            class="py-4 pl-3 pr-8 shadow rounded-md w-full leading-5"
            :placeholder="$t('Tìm kiếm học sinh')"
            v-model="keyword"
          />
          <n-icon v-if="keyword" icon="close" class="w-8 h-8 close-icon" @click="clearKeywrod" />
          <n-icon v-else icon="search" class="w-4 h-4 search-icon" />
        </div>
        <div class="mt-4">
          <div class="filter-label">
            {{ $t('Loại điểm') }}
          </div>
          <button class="filter-select" @click="selectType = 'scoreType'">
            {{ scoreTypeLabel }}
            <n-icon icon="chevron-down" class="icon-down"></n-icon>
          </button>
        </div>
        <div class="mt-4" v-if="scoreType !== $const.SCORE_TYPE.COMMENT">
          <div class="filter-label">
            {{ $t('Phương pháp đánh giá') }}
          </div>
          <button class="filter-select" @click="selectType = 'evaluateType'">
            {{ evaluateTypeLabel }}
            <n-icon icon="chevron-down" class="icon-down"></n-icon>
          </button>
        </div>
        <div v-if="studentScores.length === 0" class="mt-2">Không có kết quả tìm kiếm</div>
        <div v-else-if="scoreType === $const.SCORE_TYPE.COMMENT">
          <Comment
            class="mt-4"
            v-for="s in studentScores"
            :key="s.id"
            :name="s.name"
            :value="s.comment"
            @input="updateComment(s.id, $event)"
          />
        </div>
        <ScoreTable v-else v-model="studentScores" :headers="headers" :evaluate-type="evaluateType" class="mt-4" />
        <div class="footer">
          <button
            v-if="+$route.query.grade > 5"
            class="bg-primary rounded-md text-white w-full p-4 text-[20px] font-bold mr-4"
            @click="regularTest"
          >
            Kiểm tra
          </button>
          <button
            class="bg-primary rounded-md text-white w-full p-4 text-[20px] font-bold"
            @click="showConfirmScoreNotificationPopup = true"
          >
            Lưu điểm
          </button>
        </div>
      </div>
      <BottomSheetSelect
        :title="$t('Loại điểm')"
        v-model="showBottomSheetSelect"
        :options="options"
        :selected="selected"
        @select="onSelect"
      />
      <ConfirmScoreNotificationPopup
        v-model="showConfirmScoreNotificationPopup"
        @accept="saveScore(true)"
        @reject="saveScore(false)"
      />
    </template>
  </v2-template>
</template>

<script>
import BottomSheetSelect from '@/components/v2/scoreboard/BottomSheetSelect'
import ScoreTable from '@/components/v2/scoreboard/ScoreTable'
import ConfirmScoreNotificationPopup from '@/components/v2/scoreboard/ConfirmScoreNotificationPopup'
import Comment from '@/components/v2/scoreboard/Comment'

export default {
  name: 'InputScore',
  components: { Comment, ConfirmScoreNotificationPopup, ScoreTable, BottomSheetSelect },
  data() {
    const scoreTypeOptions = this.getScoreTypeOptions()
    return {
      showConfirmScoreNotificationPopup: false,
      selectType: null,
      scoreType: scoreTypeOptions[0]?.value,
      evaluateType: this.$const.EVALUATE_TYPE.SCORE,
      scoreboard: null,
      keyword: '',
      regularTestingStudent: null,
    }
  },
  computed: {
    showBottomSheetSelect: {
      get() {
        return !!this.selectType
      },
      set() {
        this.selectType = null
      },
    },
    scoreTypeOptions() {
      return this.getScoreTypeOptions()
    },
    evaluateTypeOptions() {
      return this.$option.get('EVALUATE_TYPE').map(o => ({ value: o.id, label: o.value }))
    },
    scoreTypeLabel() {
      return this.scoreTypeOptions.find(o => o.value === this.scoreType)?.label || this.$t('Chọn loại điểm')
    },
    evaluateTypeLabel() {
      return (
        this.evaluateTypeOptions.find(o => o.value === this.evaluateType)?.label || this.$t('Chọn phương pháp đánh giá')
      )
    },
    options() {
      switch (this.selectType) {
        case 'scoreType':
          return this.scoreTypeOptions
        case 'evaluateType':
          return this.evaluateTypeOptions
        default:
          return []
      }
    },
    selected() {
      switch (this.selectType) {
        case 'scoreType':
          return this.scoreType
        case 'evaluateType':
          return this.evaluateType
        default:
          return null
      }
    },
    headers() {
      if (this.scoreType === this.$const.SCORE_TYPE.REGULAR) {
        return [
          {
            name: 'Học sinh',
            colspan: 1,
            width: '150px',
          },
          {
            name: 'Điểm thường xuyên',
            colspan: 4,
          },
        ]
      }
      return [
        {
          name: 'Học sinh',
          colspan: 1,
          width: '60%',
        },
        {
          name: this.$const.SCORE_TYPE.MID_TERM ? 'Điểm giữa kỳ' : 'Điểm cuối kỳ',
          colspan: 1,
        },
      ]
    },
    studentScores: {
      get() {
        return this.scoreboard
          .filter(s => {
            if (this.regularTestingStudent) {
              return s.STUDENT_ID === this.regularTestingStudent.STUDENT_ID
            }
            return this.$utils.common
              .removePunctuation(s.STUDENT_NAME.toLowerCase())
              .includes(this.$utils.common.removePunctuation(this.keyword.toLowerCase()))
          })
          .map(s => ({
            id: s.STUDENT_ID,
            name: s.STUDENT_NAME,
            scores: this.getStudentScores(s),
            comment: s.TERM_COMMENT,
          }))
      },
      set(studentScores) {
        this.scoreboard = this.scoreboard.map(s => {
          const scores = studentScores.find(ss => ss.id === s.STUDENT_ID)?.scores
          if (!scores) {
            return s
          }
          return this.setStudentScores(s, scores)
        })
      },
    },
  },
  async fetch() {
    await this.fetchScoreboard()
    if (this.$route.query.regularTest) {
      this.regularTest()
    }
  },
  methods: {
    getScoreTypeOptions() {
      const { grade, specialSubject } = this.$route.query
      return [
        { value: this.$const.SCORE_TYPE.REGULAR, label: this.$t('Điểm thường xuyên'), hidden: grade <= 5 },
        { value: this.$const.SCORE_TYPE.MID_TERM, label: this.$t('Điểm giữa kỳ'), hidden: grade <= 5 },
        {
          value: this.$const.SCORE_TYPE.END_TERM,
          label: this.$t('Điểm cuối kỳ'),
          hidden: grade <= 5 && !specialSubject,
        },
        { value: this.$const.SCORE_TYPE.COMMENT, label: this.$t('Nhận xét') },
      ].filter(o => !o.hidden)
    },
    async fetchScoreboard() {
      const { year, clazz, grade, term, subject } = this.$route.query
      const { DATA } = await this.$api.score.GET_STD_SCOREBOARD({
        BASE_YEAR: year,
        CLASS_ID: clazz,
        GRADE_NO: grade,
        TERM: term,
        SUB_ID: subject,
      })
      this.scoreboard = DATA.ITEMS
      this.evaluateType = DATA.EVALUATION_TYPE
    },
    onSelect(value) {
      switch (this.selectType) {
        case 'scoreType':
          this.scoreType = value
          break
        case 'evaluateType':
          this.evaluateType = value
          break
        default:
          console.log('Error: invalid selectType. Please check for typos')
      }
      this.showBottomSheetSelect = false
    },
    clearKeywrod() {
      this.keyword = ''
      this.regularTestingStudent = null
    },
    getStudentScores(student) {
      switch (this.scoreType) {
        case this.$const.SCORE_TYPE.REGULAR:
          return [student.FIRST_REG_SCORE, student.SECOND_REG_SCORE, student.THIRD_REG_SCORE, student.FOURTH_REG_SCORE]
        case this.$const.SCORE_TYPE.MID_TERM:
          return [student.MID_TERM_SCORE]
        case this.$const.SCORE_TYPE.END_TERM:
          return [student.LAST_TERM_SCORE]
      }
    },
    setStudentScores(student, scores) {
      switch (this.scoreType) {
        case this.$const.SCORE_TYPE.REGULAR:
          return {
            ...student,
            FIRST_REG_SCORE: scores[0],
            SECOND_REG_SCORE: scores[1],
            THIRD_REG_SCORE: scores[2],
            FOURTH_REG_SCORE: scores[3],
          }
        case this.$const.SCORE_TYPE.MID_TERM:
          return {
            ...student,
            MID_TERM_SCORE: scores[0],
          }
        case this.$const.SCORE_TYPE.END_TERM:
          return {
            ...student,
            LAST_TERM_SCORE: scores[0],
          }
        default:
          return student
      }
    },
    updateComment(studentId, comment) {
      this.scoreboard = this.scoreboard.map(s => {
        if (s.STUDENT_ID === studentId) {
          return { ...s, TERM_COMMENT: comment }
        }
        return s
      })
    },
    async saveScore(notify) {
      const { year, clazz, grade, term, subject } = this.$route.query
      const { RESULT } = await this.$api.score.SAVE_STD_SCOREBOARD({
        BASE_YEAR: year,
        CLASS_ID: clazz,
        GRADE_NO: grade,
        TERM: term,
        SUB_ID: subject,
        EVALUATION_TYPE: this.evaluateType,
        ITEMS: this.scoreboard,
        NOTIFY_TO_GUARDIAN: notify,
      })
      if (RESULT === 'SUCCESS') {
        this.$notify.show('pop_notify_complete_save')
      }
    },
    regularTest() {
      this.scoreType = this.$const.SCORE_TYPE.REGULAR
      const needRegularScoreStudents = this.scoreboard.filter(student => {
        return (
          !student.FIRST_REG_SCORE || !student.SECOND_REG_SCORE || !student.THIRD_REG_SCORE || !student.FOURTH_REG_SCORE
        )
      })
      const randomIndex = Math.floor(Math.random() * needRegularScoreStudents.length)
      this.regularTestingStudent = needRegularScoreStudents[randomIndex]
      this.keyword = this.regularTestingStudent.STUDENT_NAME
    },
  },
}
</script>

<style scoped>
.search-icon {
  position: absolute;
  top: 16px;
  right: 12px;
}
.close-icon {
  position: absolute;
  top: 8px;
  right: 4px;
}
.filter-label {
  @apply text-[16px] text-gray-8E8E93;
}
.filter-select {
  @apply w-full bg-white rounded-md shadow p-4 mt-2 flex justify-between items-center text-[16px];
}
.icon-down {
  @apply w-4 h-4;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  display: flex;
}
</style>
