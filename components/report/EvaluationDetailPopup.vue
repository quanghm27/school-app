<template>
  <ms-popup
    type="custom"
    :show="show"
    :title="$t('pop_custom_evaluation_detail_title')"
    :close-icon="true"
    v-on="$listeners"
  >
    <template>
      <div class="commentArea">
        <div class="comment-info">
          <ul class="u-tb">
            <li>{{ $t('text_school_year') }}</li>
            <i18n tag="li" :path="term.TERM === 0 ? 'text_myclass_info_overall' : 'text_myclass_info'">
              <span v-if="term.TERM > 0">{{ term.TERM }}</span>
              <span>{{ term.BASE_YEAR | formatSchoolYear }}</span>
            </i18n>
          </ul>
          <ul class="u-tb">
            <li>{{ $t('text_student') }}</li>
            <li>{{ studentName }}</li>
          </ul>
        </div>
        <div class="grade" v-if="subject">
          <h4 class="grade-subj">{{ subject.SUBJECT_NAME }}</h4>
          <table class="gradeTb">
            <tr>
              <td class="gradeTb-title">{{ $t('systext_031_001') }}</td>
              <td>
                <span v-for="(score, index) in regularTest" :key="index">{{ score }}</span>
              </td>
            </tr>
            <tr>
              <td class="gradeTb-title">{{ $t('text_exam_middle_semester') }}</td>
              <td>
                <span v-for="(score, index) in midtermTest" :key="index">{{ score }}</span>
              </td>
            </tr>
            <tr>
              <td class="gradeTb-title">{{ $t('systext_027_004') }}</td>
              <td>
                <span v-for="(score, index) in finalTest" :key="index">{{ score }}</span>
              </td>
            </tr>
            <tr>
              <td class="gradeTb-title gradeTb-bg">
                <b>{{ $t('text_semester_average') }}</b>
              </td>
              <td>
                <p class="grade-sum">{{ scoreAvg | formatGrade }}</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </template>
  </ms-popup>
</template>

<script>
export default {
  name: 'EvaluationDetail',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    subject: {
      type: Object,
      default: null,
    },
    term: {
      type: Object,
      required: true,
    },
    studentName: {
      type: String,
      default: '',
    },
  },
  computed: {
    finalTest() {
      return this.subject.IS_CLOSE_TASK ? this.subject.SUBJECT_SCORE.FINAL_TEST : []
    },
    regularTest() {
      return this.subject.IS_CLOSE_TASK ? this.subject.SUBJECT_SCORE.REGULAR_TEST : []
    },
    midtermTest() {
      return this.subject.IS_CLOSE_TASK ? this.subject.SUBJECT_SCORE.MID_TERM_TEST : []
    },
    scoreAvg() {
      return this.subject.IS_CLOSE_TASK ? this.subject.SCORE_AVG : 0
    },
  },
}
</script>
