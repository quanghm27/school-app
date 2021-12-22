<template>
  <ms-popup :show="show" v-on="$listeners" :title="$t('text_contact_search')" :close-icon="true" type="custom">
    <div class="search">
      <form class="u-form" @submit.prevent="submit">
        <div class="u-form-item">
          <div class="u-input-radio">
            <div class="u-radio">
              <input
                v-model="formData.isTeacher"
                :value="true"
                type="radio"
                id="radio1"
                class="u-radio-input"
                name="contact"
              />
              <label for="radio1" class="icoApp-radio"></label>
              <label for="radio1" class="u-radio-txt">{{ $t('text_teacher') }}</label>
            </div>
            <div class="u-radio">
              <input
                v-model="formData.isTeacher"
                :value="false"
                type="radio"
                id="radio2"
                class="u-radio-input"
                name="contact"
              />
              <label for="radio2" class="icoApp-radio"></label>
              <label for="radio2" class="u-radio-txt">{{ $t('text_student') }}</label>
            </div>
          </div>
        </div>
        <div class="u-form-item">
          <div class="u-input">
            <input v-model="formData.name" type="text" :placeholder="$t('text_name')" />
          </div>
        </div>
        <template v-if="formData.isTeacher && curriculumInfo">
          <div class="u-form-item">
            <div class="u-select">
              <label for="inputSelect1" class="arrow-D"></label>
              <select id="inputSelect1" v-model="formData.school" @change="formData.subject = 0">
                <option :value="0">{{ $t('text_school_all') }}</option>
                <option v-for="school in curriculumInfo" :key="school.SCHOOL_ID" :value="school.SCHOOL_ID">
                  {{ school.SCHOOL_NAME }}
                </option>
              </select>
            </div>
          </div>
          <div class="u-form-item">
            <div :class="['u-select', { 'is-disable': !formData.school }]">
              <label for="inputSelect2" class="arrow-D"></label>
              <select id="inputSelect2" v-model="formData.subject" :disabled="!formData.school">
                <option :value="0">{{ $t('text_subject_all') }}</option>
                <template v-if="formData.school">
                  <option
                    v-for="curriculum in curriculumInfo.find(c => c.SCHOOL_ID == formData.school).CURRICULUM"
                    :key="curriculum.ID"
                    :value="curriculum.ID"
                  >
                    {{ curriculum.NAME }}
                  </option>
                </template>
              </select>
            </div>
          </div>
        </template>
        <template v-if="!formData.isTeacher && classInfo">
          <div class="u-form-item">
            <div class="u-select">
              <label for="inputSelect1" class="arrow-D"></label>
              <select id="inputSelect1" v-model="formData.school" @change="formData.classId = 0">
                <option :value="0">{{ $t('text_school_all') }}</option>
                <option v-for="school in classInfo" :key="school.SCHOOL_ID" :value="school.SCHOOL_ID">
                  {{ school.SCHOOL_NAME }}
                </option>
              </select>
            </div>
          </div>
          <div class="u-form-item">
            <div :class="['u-select', { 'is-disable': !formData.school }]">
              <label for="inputSelect2" class="arrow-D"></label>
              <select id="inputSelect2" v-model="formData.classId" :disabled="!formData.school">
                <option :value="0">{{ $t('text_class_all') }}</option>
                <template v-if="formData.school">
                  <option
                    v-for="cl in classInfo.find(c => c.SCHOOL_ID == formData.school).CLASSES"
                    :key="cl.ID"
                    :value="cl.ID"
                  >
                    {{ cl.NAME }}
                  </option>
                </template>
              </select>
            </div>
          </div>
        </template>
        <div class="search-reset">
          <a @click.prevent="resetForm" :class="['search-reset-link', { 'is-active': true }]">
            <i class="icoApp-reset"></i>{{ $t('btn_clear_filter') }}
          </a>
        </div>
        <div class="main-action">
          <a @click.prevent="submit" class="btn-default-S">{{ $t('btn_search') }}</a>
        </div>
      </form>
    </div>
  </ms-popup>
</template>

<script>
export default {
  name: 'SearchContactPopup',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Object,
      default: null,
    },
    curriculumInfo: {
      type: Array,
      default: null,
    },
    classInfo: {
      type: Array,
      default: null,
    },
  },
  data() {
    const { isTeacher = true, name, school = 0, subject = 0, classId = 0 } = this.filters || {}
    return {
      formData: { isTeacher, name, school, subject, classId },
    }
  },
  watch: {
    filters({ isTeacher = true, name, school = 0, subject = 0, classId = 0 } = {}) {
      this.formData = { isTeacher, name, school, subject, classId }
    },
    curriculumInfo(ci) {
      if (ci && ci.length === 1) {
        this.formData.school = ci[0].SCHOOL_ID
      }
    },
    classInfo(cl) {
      if (cl && cl.length === 1 && cl[0].CLASSES.length === 1) {
        this.formData.classId = cl[0].CLASSES[0].ID
      }
    },
  },
  methods: {
    resetForm() {
      this.formData = {
        isTeacher: true,
        name: '',
        school: 0,
        subject: 0,
        classId: 0,
      }
    },
    submit() {
      this.$emit('submit', this.formData)
    },
  },
}
</script>
