<template>
  <ms-popup :show="value" :title="$t('Thêm học sinh')" :close-icon="true" @close="closePopup" type="custom">
    <template slot="header-bottom">
      <div class="mb-2">
        <div class="relative">
          <input
            class="border rounded-md border-solid border-gray-300 px-2"
            placeholder="Tìm kiếm"
            type="text"
            @input="searchStudent"
          />
          <i v-if="searchText" class="icoApp-close absolute top-2.5 right-2.5" @click="handleClearSearchText"></i>
        </div>

        <p class="mt-2 overflow-y-auto max-h-[38px]">
          {{ studentSelectedName.join(', ') }}
        </p>
      </div>
    </template>
    <template>
      <div class="u-form-item">
        <div class="u-input-check">
          <div class="u-check py-4 odd:bg-gray-50" v-for="student in studentFilted" :key="student.STUDENT_ID">
            <input v-model="student.SELECTED" type="checkbox" :id="student.STUDENT_ID" class="u-check-input" />
            <label :for="student.STUDENT_ID" class="icoApp-check top-1.5"></label>
            <label :for="student.STUDENT_ID" class="u-check-txt text-md block">{{ student.STUDENT_NAME }}</label>
          </div>
        </div>
      </div>
    </template>
    <template slot="main-action">
      <a
        @click.prevent="save"
        :disabled="!studentSelected.length"
        :class="['btn-default-S', { 'is-disable': !studentSelected.length }]"
      >
        {{ $t('Thêm') }}
      </a>
    </template>
  </ms-popup>
</template>

<script>
import debounce from 'lodash/debounce'
import { normalize } from 'normalize-diacritics'

export default {
  name: 'PopupSearchStudent',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    students: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      studentFilted: [],
      searchText: '',
    }
  },
  computed: {
    studentSelected() {
      return this.students.filter(e => e.SELECTED)
    },
    studentSelectedName() {
      return this.studentSelected.map(e => e.STUDENT_NAME)
    },
  },
  fetch() {
    this.searchStudent()
  },
  watch: {
    students: {
      handler() {
        this.searchStudent()
      },
    },
  },
  methods: {
    handleClearSearchText() {
      this.searchText = ''
      this.searchStudent()
    },
    // TODO
    searchStudent: debounce(async function($event) {
      this.searchText = $event?.target?.value || ''

      if (!this.searchText) {
        this.studentFilted = this.students
        return
      }

      const q = await normalize(this.searchText.trim().toLowerCase())

      this.studentFilted = this.students.filter(e => e.SEARCH_NAME.includes(q))
    }, 300),
    closePopup() {
      this.$emit('input', false)
      this.handleClearSearchText()
      this.studentSelected.forEach(e => (e.SELECTED = false))
    },
    save() {
      const ids = this.studentSelected.map(e => e.STUDENT_ID)
      this.$emit('save', ids)
      this.closePopup()
    },
  },
}
</script>

<style scoped>
.icoApp-check {
  top: 50%;
  transform: translateY(-50%);
}
.u-check {
  float: none;
}
</style>
