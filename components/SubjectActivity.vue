<template>
  <section class="report">
    <div class="grade" v-if="isSecondary">
      <h4 class="grade-subj">{{ $t('text_overall_score') }}</h4>
      <table class="gradeTb">
        <tr>
          <td colspan="2" class="gradeTb-bg">
            {{ $t('text_average_score') }}
          </td>
          <td colspan="2">
            <p class="grade-sum">{{ !isCloseTask ? '' : summary.SCORE_AVG | formatGrade }}</p>
          </td>
        </tr>
        <tr>
          <td>{{ $t('text_rank') }}</td>
          <td>
            <b>{{ !isCloseTask ? '' : summary.RANK }} </b>
          </td>
          <td>{{ $t('text_education_grade') }}</td>
          <td>
            <b>{{ !isCloseTask ? '' : $option.get('SCORE_GRADE', summary.SCORE_GRADE) }}</b>
          </td>
        </tr>
        <tr>
          <td>{{ $t('text_ranking') }}</td>
          <td>
            <b>{{ !isCloseTask ? '' : $option.get('SCORE_GRADE', summary.SCORE_GRADE) }}</b>
          </td>
          <td>{{ $t('text_behavior_grade') }}</td>
          <td>
            <b>{{ !isCloseTask ? '' : $option.get('CONDUCT_GRADE', summary.CONDUCT_GRADE) }}</b>
          </td>
        </tr>
        <tr>
          <td>{{ $t('text_absence_not_allowed') }}</td>
          <td>
            <b>{{ !isCloseTask ? '' : summary.ATTEND_NOT_ALLOW || 0 }}</b>
          </td>
          <td>{{ $t('text_absence_allowed') }}</td>
          <td>
            <b>{{ !isCloseTask ? '' : summary.ATTEND_ALLOWED || 0 }}</b>
          </td>
        </tr>
      </table>
    </div>
    <div class="reportBook">
      <p class="report-note" v-if="isSecondary">{{ $t('text_check_score_guide') }}</p>
      <div class="row">
        <div class="col-1-2" v-for="sub in subInfo" :key="sub.SUBJECT_ID">
          <div class="u-box">
            <a
              :class="['u-box-link', { 'is-gotCom': sub.IS_CLOSE_TASK && sub.COMMENT }]"
              @click.prevent="selectSubject(sub)"
            >
              <ul class="u-tbr">
                <li>
                  <p class="report-subj">
                    {{ sub.SUBJECT_NAME }}
                    <!-- <i class="icoApp-up" /> -->
                    <span class="icon-up" v-if="sub.IS_CLOSE_TASK && sub.UPDATED_AT - sub.LAST_SEEN > 0">
                      Updated
                    </span>
                  </p>
                </li>
                <li v-if="sub.IS_CLOSE_TASK">
                  <p class="report-point">{{ getSubjectScore(sub) }}</p>
                </li>
                <li>
                  <i class="icoApp-alert-S" v-if="!sub.IS_CLOSE_TASK"></i>
                  <p class="report-comment" v-if="!isSecondary || !sub.IS_CLOSE_TASK">
                    <i class="icoApp-com" v-if="!isSecondary && sub.IS_CLOSE_TASK && sub.COMMENT" />
                    {{ getSubjectDesc(sub) }}
                  </p>
                </li>
              </ul>
            </a>
            <i :class="`icoRep-${sub.ICON}`"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SubjectActivity',
  props: {
    summary: {
      type: Object,
      required: false,
      default: null,
    },
    subInfo: {
      type: Array,
      default: null,
      required: true,
    },
  },
  computed: {
    isSecondary() {
      return !!this.summary
    },
    isCloseTask() {
      return !this.subInfo.some(sub => !sub.IS_CLOSE_TASK)
    },
  },
  methods: {
    selectSubject(sub) {
      if (this.summary) {
        this.$emit('is-show-detail', { open: true, subject: sub })
      } else if (sub.IS_CLOSE_TASK && sub.COMMENT) {
        this.$emit('is-show-comment', { open: true, cmt: sub.COMMENT, subName: sub.SUBJECT_NAME })
      }
    },
    getSubjectScore(sub) {
      const subjectEvaluate = this.$option.get('EVALUATE_SCORE', sub.EVALUATE)
      const subjectEvaluateLevel = subjectEvaluate && subjectEvaluate.slice(0, 1)
      if (sub.SCORE_AVG && subjectEvaluateLevel) {
        return `${sub.SCORE_AVG}/${subjectEvaluateLevel}`
      }
      return sub.SCORE_AVG || subjectEvaluateLevel
    },
    getSubjectDesc(sub) {
      if (!sub.IS_CLOSE_TASK) {
        return this.$t('text_score_no')
      }
      if (sub.COMMENT) {
        return this.$t('btn_check_comment')
      }
      if (!sub.SCORE_AVG && !sub.EVALUATE) {
        return this.$t('text_score_no')
      }
      return this.$t('text_comment_no')
    },
  },
}
</script>
