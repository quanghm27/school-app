<template>
  <v2-template :show-bottom-nav="false">
    <v2-header slot="header" title="Bảng điểm">
      <n-icon
        slot="left"
        icon="chevron-left"
        @click="$router.push({ name: 'v2-scoreboard-teacher', query: $route.query })"
      />
      <!-- TODO: fix header alignment and remove this shit -->
      <div slot="right" style="width: 32px" />
    </v2-header>
    <template slot="content">
      <div class="pr-4 pb-4" v-if="!$fetchState.pending">
        <div class="relative">
          <input
            class="py-4 pl-3 pr-8 shadow rounded-md w-full leading-5"
            :placeholder="$t('Tìm kiếm học sinh')"
            v-model="keyword"
          />
          <n-icon v-if="keyword" icon="close" class="w-8 h-8 close-icon" @click="keyword = ''" />
          <n-icon v-else icon="search" class="w-4 h-4 search-icon" />
        </div>
        <ScoreProgressBar
          v-if="showScore"
          title="Số học sinh đã nhập điểm"
          :current="numberOfStudentsHaveScore"
          :total="scoreboard.length"
        />
        <div class="mt-4" v-if="showScore">
          <div class="font-medium text-[16px]">{{ scoreLabel }}</div>
          <div v-if="studentScores.length === 0" class="mt-2">Không có kết quả tìm kiếm</div>
          <ScoreTable
            v-else
            v-model="studentScores"
            :disabled="true"
            :headers="tableHeaders"
            :evaluate-type="evaluateType"
            class="mt-4"
          />
        </div>
        <div class="mt-4">
          <div class="font-medium text-[16px]">{{ commentLabel }}</div>
          <div v-if="studentScores.length === 0" class="mt-2">Không có kết quả tìm kiếm</div>
          <Comment
            class="mt-4"
            v-for="s in studentScores"
            :key="s.id"
            :editable="false"
            :name="s.name"
            :value="s.comment"
          />
        </div>
      </div>
    </template>
  </v2-template>
</template>

<script>
import ScoreProgressBar from '@/components/v2/scoreboard/ScoreProgressBar'
import ScoreTable from '@/components/v2/scoreboard/ScoreTable'
import Comment from '@/components/v2/scoreboard/Comment'

export default {
  name: 'TeacherScoreboard',
  components: { Comment, ScoreTable, ScoreProgressBar },
  data() {
    return {
      keyword: '',
      evaluateType: null,
      scoreboard: null,
    }
  },
  computed: {
    scoreLabel() {
      const { term } = this.$route.query
      return ['', 'Kết quả học tập kỳ I', 'Kết quả học tập kỳ II', 'Kết quả học tập cả năm'][term]
    },
    commentLabel() {
      const { term } = this.$route.query
      return ['', 'Nhận xét cuối kỳ I', 'Nhận xét cuối kỳ II', 'Nhận xét cả năm'][term]
    },
    showScore() {
      const { grade, specialSubject } = this.$route.query
      return grade > 5 || specialSubject
    },
    tableHeaders() {
      const { term, grade, specialSubject } = this.$route.query
      if (+term === 3) {
        return [
          {
            name: 'Học sinh',
            colspan: 1,
            width: '30%',
          },
          {
            name: 'Học kỳ I',
            colspan: 1,
          },
          {
            name: 'Học kỳ II',
            colspan: 1,
          },
          {
            name: 'Cả năm',
            colspan: 1,
            hidden: grade <= 5,
          },
        ].filter(h => !h.hidden)
      }
      if (grade <= 5 && specialSubject) {
        return [
          {
            name: 'Học sinh',
            colspan: 1,
            width: '60%',
          },
          {
            name: 'Điểm cuối kỳ',
            colspan: 1,
          },
        ]
      }
      return [
        {
          name: 'Học sinh',
          colspan: 1,
          width: '100px',
        },
        {
          name: 'TX',
          colspan: 4,
        },
        {
          name: 'GK',
          colspan: 1,
        },
        {
          name: 'CK',
          colspan: 1,
        },
        {
          name: 'TB',
          colspan: 1,
        },
      ]
    },
    studentScores() {
      return this.scoreboard
        .filter(s => {
          return this.$utils.common
            .removePunctuation(s.STUDENT_NAME.toLowerCase())
            .includes(this.$utils.common.removePunctuation(this.keyword.toLowerCase()))
        })
        .map(s => ({
          id: s.STUDENT_ID,
          name: s.STUDENT_NAME,
          scores: this.getStudentScores(s),
          comment: +this.$route.term === 3 ? s.YEAR_COMMENT : s.TERM_COMMENT,
        }))
    },
    numberOfStudentsHaveScore() {
      const { grade, specialSubject } = this.$route.query
      if (grade <= 5 && specialSubject) {
        return this.scoreboard.filter(s => !isNaN(parseFloat(s.LAST_TERM_SCORE))).length
      }
      return this.scoreboard.filter(s => !isNaN(parseFloat(s.FIRST_REG_SCORE))).length
    },
  },
  async fetch() {
    await this.fetchScoreboard()
  },
  methods: {
    async fetchScoreboard() {
      const { year, clazz, grade, term, subject } = this.$route.query
      if (+term !== 3) {
        const { DATA } = await this.$api.score.GET_STD_SCOREBOARD({
          BASE_YEAR: year,
          CLASS_ID: clazz,
          GRADE_NO: grade,
          TERM: term,
          SUB_ID: subject,
        })
        this.scoreboard = DATA.ITEMS
        this.evaluateType = DATA.EVALUATION_TYPE
        return
      }
      const [firstTermScoreboard, secondTermScoreboard] = await Promise.all([
        this.$api.score.GET_STD_SCOREBOARD({
          BASE_YEAR: year,
          CLASS_ID: clazz,
          GRADE_NO: grade,
          TERM: 1,
          SUB_ID: subject,
        }),
        this.$api.score.GET_STD_SCOREBOARD({
          BASE_YEAR: year,
          CLASS_ID: clazz,
          GRADE_NO: grade,
          TERM: 2,
          SUB_ID: subject,
        }),
      ])
      this.scoreboard = secondTermScoreboard.DATA.ITEMS.map((s, i) => ({
        ...s,
        FIRST_TERM_AVG_SCORE: firstTermScoreboard.DATA.ITEMS[i].TERM_AVG_SCORE,
        SECOND_TERM_AVG_SCORE: s.TERM_AVG_SCORE,
      }))
      this.evaluateType = secondTermScoreboard.DATA.EVALUATION_TYPE
    },
    getStudentScores(student) {
      const { term, grade, specialSubject } = this.$route.query
      if (+term === 3) {
        if (grade > 5) {
          return [student.FIRST_TERM_AVG_SCORE, student.SECOND_TERM_AVG_SCORE, student.YEAR_AVG_SCORE]
        }
        return [student.FIRST_TERM_AVG_SCORE, student.SECOND_TERM_AVG_SCORE]
      }
      if (grade <= 5 && specialSubject) {
        return [student.LAST_TERM_SCORE]
      }
      return [
        student.FIRST_REG_SCORE,
        student.SECOND_REG_SCORE,
        student.THIRD_REG_SCORE,
        student.FOURTH_REG_SCORE,
        student.MID_TERM_SCORE,
        student.LAST_TERM_SCORE,
        student.TERM_AVG_SCORE,
      ]
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
</style>
