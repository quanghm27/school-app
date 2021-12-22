<template>
  <v2-template :show-bottom-nav="false">
    <v2-header slot="header" title="Bảng điểm">
      <n-icon slot="left" icon="chevron-left" @click="$router.back()"></n-icon>
      <!-- TODO: fix header alignment and remove this shit -->
      <div slot="right" style="width: 32px" />
    </v2-header>
    <template slot="content" v-if="!$fetchState.pending">
      <div class="showPerson" v-if="isParent && children.length > 1">
        <div class="personSwipe">
          <div class="u-swipe" id="personSwipe">
            <div class="u-swipeArea" ref="swipe">
              <div
                v-for="child in children"
                :key="child.CHILD_ID"
                :class="['u-swipe-item', { active: selectedChild && selectedChild.CHILD_ID === child.CHILD_ID }]"
              >
                <a @click="selectChild(child)" class="u-swipe-link">
                  <span class="person-name">{{ child.CHILD_NAME }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pr-4 py-4">
        <div class="flex items-center">
          <img
            :src="require(`~/assets/img/avatar-${$store.get('userRole')}.png`)"
            alt="avatar"
            class="w-16 h-16 mr-4"
          />
          <div v-if="isParent">
            <div class="leading-6 text-[16px]">{{ $t('Phụ huynh của') }}</div>
            <div class="leading-6 text-[16px] font-bold line-clamp-1">{{ selectedChild.CHILD_NAME }}</div>
            <div class="leading-6 text-[16px] font-medium">{{ userInfo.PHONE || userInfo.LOGIN_ID }}</div>
          </div>
          <div v-else>
            <div class="leading-6 text-[16px]">{{ $t('Học sinh') }}</div>
            <div class="leading-6 text-[16px] font-bold line-clamp-1">{{ userInfo.FULL_NAME }}</div>
            <div class="leading-6 text-[16px] font-medium">Lớp {{ userInfo.CLASS_NAME }}</div>
          </div>
        </div>
        <div class="flex mt-4">
          <div class="flex-1 mr-2">
            <div class="filter-label">
              {{ $t('Năm học') }}
            </div>
            <button class="filter-select" :class="{ 'text-gray-4': !year }" @click="selectType = 'year'">
              {{ yearLabel }}
              <n-icon icon="chevron-down" class="icon-down"></n-icon>
            </button>
          </div>
          <div class="flex-1 ml-2">
            <div class="filter-label">
              {{ $t('Học kỳ') }}
            </div>
            <button class="filter-select" :class="{ 'text-gray-4': !term }" @click="selectType = 'term'">
              {{ termLabel }}
              <n-icon icon="chevron-down" class="icon-down"></n-icon>
            </button>
          </div>
        </div>
        <template v-if="showScores">
          <div class="mt-4">
            <ScoreProgressBar
              title="Số môn học đã nhập điểm"
              :current="numberOfSubjectsHaveScore"
              :total="subjectScores.length"
            />
          </div>
          <div class="mt-4 text-[11px] text-[#AEAEB2]">{{ $t('*điểm có thể thay đổi trong tương lai') }}</div>
          <ScoreTable disabled v-model="subjectScores" :headers="scoreTableHeaders" class="mt-4" />
          <div class="mt-4 text-[#AEAEB2]">
            <div>Chú thích :</div>
            <div>TX : Điểm thường xuyên</div>
            <div>GK : Điểm giữa kỳ</div>
            <div>CK : Điểm cuối kỳ</div>
            <div>TB : Điểm trung bình môn</div>
            <div>Đ : Đạt, CĐ : Chưa đạt</div>
          </div>
        </template>
        <div v-if="grade > 5" class="mt-4">
          <div class="font-bold text-[16px] mb-4">{{ $t('Tổng kết học kỳ') }}</div>
          <SummaryTable :headers="summaryHeaders" :rows="summaryRows" />
        </div>

        <div class="mt-4">
          <div class="font-bold text-[16px] mb-4">{{ $t('Nhận xét của giáo viên chủ nhiệm') }}</div>
          <div class="comment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo congue at tortor, diam scelerisque adipiscing
            ultrices. In vitae,
          </div>
        </div>
        <div class="mt-4" v-for="s in scoreboard" :key="s.id">
          <div class="font-bold text-[16px] mb-4">{{ `${$t('Nhận xét của giáo viên bộ môn ')}${s.SUB_NAME}` }}</div>
          <div class="comment">
            {{ (+term === 3 ? s.TERM_SCORE : s.YEAR_COMMENT) || $t('Chưa có nhận xét') }}
          </div>
        </div>
      </div>
      <BottomSheetSelect
        :title="bottomSheetSelectTitle"
        v-model="showBottomSheetSelect"
        :options="options"
        :selected="selected"
        @select="onSelect"
      />
    </template>
  </v2-template>
</template>

<script>
import { mapState } from 'vuex'
import BottomSheetSelect from '@/components/v2/scoreboard/BottomSheetSelect'
import ScoreProgressBar from '@/components/v2/scoreboard/ScoreProgressBar'
import ScoreTable from '@/components/v2/scoreboard/ScoreTable'
import SummaryTable from '@/components/v2/scoreboard/SummaryTable'

export default {
  name: 'ScoreBoard',
  components: { SummaryTable, ScoreTable, ScoreProgressBar, BottomSheetSelect },
  data() {
    return {
      children: [],
      selectedChild: null,
      selectType: null,
      yearOptions: [],
      year: this.$store.get('currentYear'),
      term: this.$store.get('currentTerm') || 1,
      scoreboard: null,
      grade: null,
    }
  },
  computed: {
    ...mapState(['userRole', 'userInfo', 'currentYear']),
    isParent() {
      return this.userRole === this.$const.ROLE.PARENT
    },
    isStudent() {
      return this.userRole === this.$const.ROLE.STUDENT
    },
    studentId() {
      return this.selectChild?.CHILD_ID || this.userInfo.SID
    },
    showBottomSheetSelect: {
      get() {
        return !!this.selectType
      },
      set() {
        this.selectType = null
      },
    },
    yearLabel() {
      return this.yearOptions.find(o => o.value === this.year)?.label || this.$t('Chọn năm học')
    },
    termLabel() {
      return this.termOptions.find(o => o.value === this.term)?.label || this.$t('Chọn học kỳ')
    },
    bottomSheetSelectTitle() {
      switch (this.selectType) {
        case 'year':
          return this.$t('Năm học')
        case 'term':
          return this.$t('Học kỳ')
        default:
          return ''
      }
    },
    termOptions() {
      return [
        { value: 1, label: 'Học kỳ I' },
        { value: 2, label: 'Học kỳ II' },
        { value: 3, label: 'Cả năm' },
      ]
    },
    options() {
      switch (this.selectType) {
        case 'year':
          return this.yearOptions
        case 'term':
          return this.termOptions
        default:
          return []
      }
    },
    selected() {
      switch (this.selectType) {
        case 'year':
          return this.year
        case 'term':
          return this.term
        default:
          return null
      }
    },
    showScores() {
      return this.subjectScores.length > 0
    },
    scoreTableHeaders() {
      if (this.grade <= 5) {
        if (+this.term === 3) {
          return [
            {
              name: 'Môn học',
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
          ]
        }
        return [
          {
            name: 'Môn học',
            colspan: 1,
            width: '60%',
          },
          {
            name: 'Điểm cuối kỳ',
            colspan: 1,
          },
        ]
      }
      if (+this.term === 3) {
        return [
          {
            name: 'Môn học',
            colspan: 1,
            width: '25%',
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
            name: 'TBCN',
            colspan: 1,
          },
        ]
      }
      return [
        {
          name: 'Môn học',
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
    subjectScores() {
      return this.scoreboard
        .filter(s => this.grade > 5 || s.SPECIAL_SUBJECT)
        .map(s => ({
          id: s.SUB_ID,
          name: s.SUB_NAME,
          scores: this.getSubjectScores(s),
          comment: s.TERM_COMMENT,
        }))
    },
    summaryHeaders() {
      if (+this.term !== 3) {
        return null
      }
      return [{ name: 'Danh mục' }, { name: 'Học kỳ I' }, { name: 'Học kỳ II' }, { name: 'Cả năm' }]
    },
    summaryRows() {
      if (+this.term === 3) {
        return [
          ['Điểm TBHK', 'Tốt', 'Tốt', 'Tốt'],
          ['Học lực', 'Khá', 'Giỏi', 'Giỏi'],
          ['Hạnh kiểm', 'Tốt', 'Tốt', 'Tốt'],
          ['Xếp hạng', 'Tốt', 'Tốt', 'Tốt'],
        ]
      }
      return [
        ['Điểm TBHK', 9.5],
        ['Học lực', 9.5],
        ['Hạnh kiểm', 9.5],
        ['Xếp hạng', 3],
      ]
    },
    numberOfSubjectsHaveScore() {
      return this.scoreboard
        .filter(s => this.grade > 5 || s.SPECIAL_SUBJECT)
        .filter(s => {
          if (+this.term === 3) {
            return (
              !isNaN(parseFloat(s.FIRST_TERM_LAST_TERM_SCORE)) &&
              !isNaN(parseFloat(s.SECOND_TERM_LAST_TERM_SCORE)) &&
              !isNaN(parseFloat(s.YEAR_AVG_SCORE))
            )
          }
          return !isNaN(parseFloat(s.LAST_TERM_SCORE))
        }).length
    },
  },
  async fetch() {
    if (this.isParent) {
      await this.fetchChildren()
    }
    await this.fetchYearOptions()
    await this.fetchScoreboard()
  },
  methods: {
    async fetchChildren() {
      const { DATA } = await this.$api.parent.GET_CHILD_LIST()
      this.children = DATA
      this.selectedChild = this.children[0]
    },
    async fetchYearOptions() {
      const { DATA } = await this.$api.score.GET_SCHOOL_YEAR_LIST()
      this.yearOptions = DATA.YEARS.map(({ BASE_YEAR }) => ({
        value: BASE_YEAR,
        label: `${BASE_YEAR} ~ ${BASE_YEAR + 1}`,
      }))
      this.year = this.currentYear || this.yearOptions[2]?.value
    },
    async fetchScoreboard() {
      if (!this.year || !this.term) {
        return
      }
      if (+this.term !== 3) {
        const { DATA } = await this.$api.score.GET_WHOLE_SCOREBOARD({
          BASE_YEAR: this.year,
          TERM: this.term,
          STUDENT_ID: this.studentId,
        })
        this.scoreboard = DATA.SCOREBOARD
        this.grade = DATA.STUDENT_GRADE
        return
      }
      const [firstTermScoreboard, secondTermScoreboard] = await Promise.all([
        this.$api.score.GET_WHOLE_SCOREBOARD({
          BASE_YEAR: this.year,
          TERM: 1,
          STUDENT_ID: this.studentId,
        }),
        this.$api.score.GET_WHOLE_SCOREBOARD({
          BASE_YEAR: this.year,
          TERM: 2,
          STUDENT_ID: this.studentId,
        }),
      ])
      this.scoreboard = secondTermScoreboard.DATA.SCOREBOARD.map((s, i) => ({
        ...s,
        FIRST_TERM_AVG_SCORE: firstTermScoreboard.DATA.SCOREBOARD[i]?.TERM_AVG_SCORE,
        SECOND_TERM_AVG_SCORE: s.TERM_AVG_SCORE,
        FIST_TERM_LAST_TERM_SCORE: firstTermScoreboard.DATA.SCOREBOARD[i]?.LAST_TERM_SCORE,
        SECOND_TERM_LAST_TERM_SCORE: s.LAST_TERM_SCORE,
      }))
      this.grade = firstTermScoreboard.DATA.STUDENT_GRADE
    },
    async selectChild(child) {
      this.selectedChild = child
      await this.fetchScoreboard()
    },
    onSelect(value) {
      switch (this.selectType) {
        case 'year':
          this.year = value
          this.fetchScoreboard()
          break
        case 'term':
          this.term = value
          this.fetchScoreboard()
          break
        default:
          console.log('Error: invalid selectType. Please check for typos')
      }
      this.showBottomSheetSelect = false
    },
    getSubjectScores(subject) {
      if (+this.term === 3) {
        if (this.grade > 5) {
          return [subject.FIRST_TERM_AVG_SCORE, subject.SECOND_TERM_AVG_SCORE, subject.YEAR_AVG_SCORE]
        }
        return [subject.FIST_TERM_LAST_TERM_SCORE, subject.SECOND_TERM_LAST_TERM_SCORE]
      }
      if (this.grade <= 5) {
        return [subject.LAST_TERM_SCORE]
      }
      return [
        subject.FIRST_REG_SCORE,
        subject.SECOND_REG_SCORE,
        subject.THIRD_REG_SCORE,
        subject.FOURTH_REG_SCORE,
        subject.MID_TERM_SCORE,
        subject.LAST_TERM_SCORE,
        subject.TERM_AVG_SCORE,
      ]
    },
  },
}
</script>

<style scoped>
.showPerson {
  margin-top: -16px;
  margin-left: -16px;
  background-color: transparent;
}
.personSwipe {
  height: 66px;
}
.u-swipeArea {
  padding: 16px;
}
.u-swipe-item {
  margin-right: 8px;
}
.u-swipe-link {
  border-radius: 4px;
  font-size: 15px;
  background-color: #e0e0e0;
  color: #bdbdbd;
}
.u-swipe-item.active .u-swipe-link {
  background-color: #39a45a;
  color: #fff;
}
.filter-label {
  @apply text-[16px] text-gray-8E8E93;
}
.filter-select {
  @apply w-full bg-white rounded-md shadow p-4 mt-2 flex justify-between items-center text-[16px];
}
.filter-select:disabled {
  background-color: #f2f2f2;
}
.icon-down {
  @apply w-4 h-4;
}
.comment {
  background-color: #fff;
  padding: 12px;
  border-radius: 8px;
}
</style>
