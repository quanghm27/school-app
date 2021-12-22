<template>
  <div v-if="!$fetchState.pending">
    <div class="mb-4" v-if="showYear">
      <div class="filter-label">
        {{ $t('Năm học') }}
      </div>
      <button class="filter-select" :class="{ 'text-gray-4': !year }" @click="selectType = 'year'">
        {{ yearLabel }}
        <n-icon icon="chevron-down" class="icon-down"></n-icon>
      </button>
    </div>
    <div class="mb-4">
      <div class="filter-label">
        {{ $t('Học kỳ') }}
      </div>
      <button class="filter-select" :class="{ 'text-gray-4': !term }" @click="selectType = 'term'">
        {{ termLabel }}
        <n-icon icon="chevron-down" class="icon-down"></n-icon>
      </button>
    </div>
    <div class="mb-4">
      <div class="filter-label">
        {{ $t('Khối') }}
      </div>
      <button class="filter-select" :class="{ 'text-gray-4': !grade }" @click="selectType = 'grade'">
        {{ gradeLabel }}
        <n-icon icon="chevron-down" class="icon-down"></n-icon>
      </button>
    </div>
    <div class="mb-4">
      <div class="filter-label">
        {{ $t('Môn học') }}
      </div>
      <button
        class="filter-select"
        :class="{ 'text-gray-4': !subject }"
        :disabled="!grade || !term"
        @click="selectType = 'subject'"
      >
        {{ subjectLabel }}
        <n-icon icon="chevron-down" class="icon-down"></n-icon>
      </button>
    </div>
    <div class="mb-4">
      <div class="filter-label">
        {{ $t('Tên lớp') }}
      </div>
      <button
        class="filter-select"
        :class="{ 'text-gray-4': !clazz }"
        :disabled="!subject"
        @click="selectType = 'clazz'"
      >
        {{ clazzLabel }}
        <n-icon icon="chevron-down" class="icon-down"></n-icon>
      </button>
    </div>
    <slot name="action" :filters="{ year, grade, term, clazz, subject }" />
    <BottomSheetSelect
      :title="bottomSheetSelectTitle"
      v-model="showBottomSheetSelect"
      :options="options"
      :selected="selected"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BottomSheetSelect from '@/components/v2/scoreboard/BottomSheetSelect'

export default {
  name: 'ScoreFilter',
  components: { BottomSheetSelect },
  props: {
    showYear: {
      type: Boolean,
      default: false,
    },
    showWholeYearOptions: {
      type: Boolean,
      default: false,
    },
    defaultYear: {
      type: Number,
      default: null,
    },
    defaultTerm: {
      type: Number,
      default: null,
    },
    defaultGrade: {
      type: Number,
      default: null,
    },
    defaultClazz: {
      type: Number,
      default: null,
    },
    defaultSubject: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      selectType: null,
      yearOptions: [],
      gradeOptions: [],
      subjectOptions: [],
      clazzOptions: [],
      year: +this.defaultYear || this.$store.get('currentYear'),
      term: +this.defaultTerm || this.$store.get('currentTerm'),
      grade: +this.defaultGrade || null,
      clazz: +this.defaultClazz || null,
      subject: null,
    }
  },
  computed: {
    ...mapState(['currentYear', 'currentTerm']),
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
    gradeLabel() {
      return this.gradeOptions.find(o => o.value === this.grade)?.label || this.$t('Chọn khối')
    },
    clazzLabel() {
      return this.clazzOptions.find(o => o.value === this.clazz)?.label || this.$t('Chọn lớp')
    },
    subjectLabel() {
      return this.subjectOptions.find(o => o.value?.SUB_ID === this.subject?.SUB_ID)?.label || this.$t('Chọn môn học')
    },
    bottomSheetSelectTitle() {
      switch (this.selectType) {
        case 'year':
          return this.$t('Năm học')
        case 'term':
          return this.$t('Học kỳ')
        case 'grade':
          return this.$t('Khối')
        case 'clazz':
          return this.$t('Lớp')
        case 'subject':
          return this.$t('Môn học')
        default:
          return ''
      }
    },
    termOptions() {
      const options = [
        { value: 1, label: 'Học kỳ I' },
        { value: 2, label: 'Học kỳ II' },
      ]
      if (this.showWholeYearOptions) {
        return [...options, { value: 3, label: 'Cả năm' }]
      }
      return options
    },
    options() {
      switch (this.selectType) {
        case 'year':
          return this.yearOptions
        case 'term':
          return this.termOptions
        case 'grade':
          return this.gradeOptions
        case 'clazz':
          return this.clazzOptions
        case 'subject':
          return this.subjectOptions
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
        case 'grade':
          return this.grade
        case 'clazz':
          return this.clazz
        case 'subject':
          return this.subject
        default:
          return null
      }
    },
  },
  async fetch() {
    // TODO: make some fetchs parallel
    if (this.showYear) {
      await this.fetchYearOptions()
    }
    await this.fetchGradeOptions()
    if (this.defaultTerm && this.defaultGrade && this.defaultSubject) {
      await this.fetchSubjectOptions()
      this.subject = this.subjectOptions.find(o => o.value.SUB_ID === this.defaultSubject)?.value
    }
    if (this.subject && this.defaultClazz) {
      await this.fetchClazzOptions()
      this.clazz = this.defaultClazz
    }
  },
  methods: {
    async fetchYearOptions() {
      const { DATA } = await this.$api.score.GET_SCHOOL_YEAR_LIST()
      this.yearOptions = DATA.YEARS.map(({ BASE_YEAR }) => ({
        value: BASE_YEAR,
        label: `${BASE_YEAR} ~ ${BASE_YEAR + 1}`,
      }))
    },
    async fetchGradeOptions() {
      const { DATA } = await this.$api.score.GET_LIST_TEACH_GRADE({ BASE_YEAR: this.year })
      this.gradeOptions = DATA.GRADES.map(g => ({
        value: g,
        label: `Khối ${g}`,
      }))
    },
    async fetchSubjectOptions() {
      if (!this.grade || !this.term) {
        return
      }
      const { DATA } = await this.$api.score.GET_LIST_TEACH_SUBJECT({
        BASE_YEAR: this.year,
        GRADE_NO: this.grade,
        TERM: this.term,
      })
      this.subjectOptions = DATA.ITEMS.map(item => ({
        value: item,
        label: item.SUB_NAME,
      }))
    },
    async fetchClazzOptions() {
      const { DATA } = await this.$api.score.GET_LIST_TEACH_CLASS({
        LECTURE_ID: this.subject?.LECTURE_IDS.split(','),
      })
      this.clazzOptions = DATA.ITEMS.map(item => ({
        value: item.CLASS_ID,
        label: item.CLASS_NAME,
      }))
    },
    onSelect(value) {
      switch (this.selectType) {
        case 'year':
          this.year = value
          this.grade = null
          this.subject = null
          this.clazz = null
          this.fetchGradeOptions()
          break
        case 'term':
          this.term = value
          this.subject = null
          this.clazz = null
          this.fetchSubjectOptions()
          break
        case 'grade':
          this.grade = value
          this.subject = null
          this.clazz = null
          this.fetchSubjectOptions()
          break
        case 'subject':
          this.subject = value
          this.clazz = null
          this.fetchClazzOptions()
          break
        case 'clazz':
          this.clazz = value
          break
        default:
          console.log('Error: invalid selectType. Please check for typos')
      }
      this.showBottomSheetSelect = false
    },
  },
}
</script>

<style scoped>
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
</style>
