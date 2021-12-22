<template>
  <ms-popup :show="value" :title="$t('Bộ lọc tìm kiếm')" :close-icon="true" @close="closePopup" type="custom">
    <div class="search">
      <form class="u-form" @submit.prevent="search">
        <!-- Common: From - To -->
        <div class="u-form-item">
          <div class="u-select">
            <label for="inputSelect1" class="arrow-D"></label>
            <select id="inputSelect1" class="u-input" v-model="formData.grade" @change="handlerGradeChange">
              <option value="">{{ $t('text_grade') }}</option>
              <option v-for="grade in grades" :key="grade" :value="grade">
                {{ $t('text_grade_0', [grade]) }}
              </option>
            </select>
          </div>
        </div>
        <div class="u-form-item">
          <div class="u-select">
            <label for="inputSelect2" class="arrow-D"></label>
            <select id="inputSelect2" v-model="formData.clazz" class="u-input">
              <option value="">{{ $t('text_class') }}</option>
              <option v-for="c in classes" :key="c.CLASS_ID" :value="c.CLASS_ID">
                {{ c.CLASS_NAME }}
              </option>
            </select>
          </div>
        </div>
        <div class="u-form-item">
          <div class="u-input-fromto">
            <div class="from">
              <div class="u-fakeInput" data-click="0">
                <label for="inputFrom" class="icoApp-calendar"></label>
                <input type="date" v-model="formData.startDate" class="is-hidden inputDate" id="inputFrom" />
                <p class="u-fakeInput-val" v-if="formData.startDate">
                  {{ formData.startDate | formatDates('DD/MMM/YYYY') }}
                </p>
                <p class="u-fakeInput-val" v-else></p>
              </div>
            </div>
            <i class="fromto">~</i>
            <div class="to">
              <div class="u-fakeInput" data-click="0">
                <label for="inputTo" class="icoApp-calendar"></label>
                <input type="date" v-model="formData.endDate" class="is-hidden inputDate" id="inputTo" />
                <p class="u-fakeInput-val" v-if="formData.endDate">
                  {{ formData.endDate | formatDates('DD/MMM/YYYY') }}
                </p>
                <p class="u-fakeInput-val" v-else></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Common: Clear Filter -->
        <div class="search-reset">
          <a @click.prevent="resetSearch" :class="['search-reset-link', { 'is-active': isReset }]">
            <i class="icoApp-reset"></i>
            {{ $t('btn_clear_filter') }}
          </a>
        </div>
        <button type="submit" stype="display: none"></button>
      </form>
    </div>
    <template slot="main-action">
      <a @click.prevent="search" class="btn-default-S">{{ $t('btn_search') }}</a>
    </template>
  </ms-popup>
</template>

<script>
import { mapState } from 'vuex'

const DEFAULT_FORM_DATA = {
  startDate: new Date(),
  endDate: new Date(),
  grade: '',
  clazz: '',
}

export default {
  name: 'AttendanceSearchPopup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    query: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      formData: this.$lodash.cloneDeep(DEFAULT_FORM_DATA),
      isReset: false,
      grades: [],
      classes: [],
    }
  },
  computed: {
    ...mapState({
      baseYear: state => state.currentYear,
    }),
  },
  async fetch() {
    const {
      DATA: { GRADES },
    } = await this.$api.common.GET_LIST_MAIN_GRADE()

    this.grades = GRADES
  },
  methods: {
    async handlerGradeChange() {
      this.formData.clazz = '' // reset class

      if (!this.formData.grade) {
        this.classes = []
        return
      }

      const {
        DATA: { CLASSES },
      } = await this.$api.common.GET_LIST_MAIN_CLASS({
        BASE_YEAR: this.baseYear,
        GRADE_NO: this.formData.grade,
      })

      this.classes = CLASSES
    },
    closePopup() {
      this.$emit('input', false)
    },
    search() {
      const { clazz, start, end } = this.formData

      const payload = {
        CLASS_IDS: clazz ? [clazz] : [],
        END_DATE: this.$utils.datetime.formatInput(start),
        START_DATE: this.$utils.datetime.formatInput(end),
      }

      this.$emit('search', payload)
      this.closePopup()
    },
    resetSearch() {
      this.isReset = true
      this.formData = this.$lodash.cloneDeep(DEFAULT_FORM_DATA)
      setTimeout(() => {
        this.isReset = false
      }, 500)
    },
  },
}
</script>
