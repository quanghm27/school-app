<template>
  <ms-template :page-title="$t('menu_report_card')" :page-class="`is-showSem ${isParent && 'is-showPerson'}`">
    <template slot="headerLeft">
      <ms-back :to="{ path: '/' }" />
    </template>
    <template slot="headerBottom">
      <div class="showPerson" v-if="isParent && !isLoadChild && childs.length > 0">
        <div class="personSwipe">
          <div class="u-swipe" id="personSwipe">
            <div class="u-swipeArea" ref="swipe">
              <div
                v-for="(child, index) in childs"
                :key="child.CHILD_ID"
                :class="['u-swipe-item', { 'is-active': index === currentChild }]"
              >
                <a @click.prevent="changeChild($event, child.CHILD_ID, index)" class="u-swipe-link">
                  <span class="person-name">{{ child.CHILD_NAME }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="showSem" v-if="!isLoadTerm && termList.length > 0">
        <ul class="u-tb">
          <li class="showSem-arrow">
            <button :disabled="termIndex === 0" @click="prev" class="icoApp-arrow-L" />
          </li>
          <li>
            <i18n
              tag="p"
              class="semester-title"
              :path="currentTerm.TERM === 0 ? 'text_myclass_info_overall' : 'text_myclass_info'"
            >
              <span v-if="currentTerm.TERM > 0">{{ currentTerm.TERM }}</span>
              <span>{{ currentTerm.BASE_YEAR | formatSchoolYear }}</span>
            </i18n>
          </li>
          <li class="showSem-arrow">
            <button :disabled="termIndex === termList.length - 1" @click="next" class="icoApp-arrow-R" />
          </li>
        </ul>
      </div>
      <ms-spinner v-if="isLoading" />
      <template v-else-if="termList.length > 0 && !$lodash.isEmpty(reportInfo)">
        <ms-tabs v-model="currentTab" tab-name="announce">
          <ms-tab v-for="(tab, index) in visibleTabs" :key="index" :name="tab.name" :is-new="tab.isNew">
            <portal to="destination">
              <comment-popup
                :show="isShowComment"
                :term="currentTerm.TERM"
                :baseYear="currentTerm.BASE_YEAR"
                :studentName="reportInfo.STUDENT_NAME"
                :subName="subName"
                :comment="comment"
                @close="closeComment"
              />
              <evaluation-detail-popup
                :show="!!selectedSubject"
                :subject="selectedSubject"
                :term="currentTerm"
                :studentName="reportInfo.STUDENT_NAME"
                @close="closeEvaluationDetail"
              />
              <subject-activity
                v-show="activeTab.key === 'subject'"
                :summary="reportInfo.SUMMARY_TERM"
                :subInfo="reportInfo.TERM_SCORE.ITEMS"
                @is-show-comment="openPopup"
                @is-show-detail="openEvaluationDetail"
              />
              <ability-talent
                v-show="activeTab.key === 'ability'"
                :observation="reportInfo.OBSERVATION"
                :lastSeen="observationLastSeen"
                @is-show-comment="openPopup"
              />
              <opinions v-show="activeTab.key === 'opinion'" :opinions="opinions" :lastSeen="observationLastSeen" />
            </portal>
          </ms-tab>
        </ms-tabs>
      </template>
    </template>
    <template slot="content">
      <portal-target name="destination" />
    </template>
  </ms-template>
</template>

<script>
import { mapState } from 'vuex'
import SubjectActivity from '@/components/SubjectActivity'
import AbilityTalent from '@/components/AbilityTalent'
import Opinions from '@/components/Opinions'
import CommentPopup from '@/components/report/CommentPopup'
import EvaluationDetailPopup from '@/components/report/EvaluationDetailPopup'

export default {
  name: 'Index',
  components: { Opinions, AbilityTalent, SubjectActivity, CommentPopup, EvaluationDetailPopup },
  data() {
    return {
      currentTab: 0,
      tabs: [
        {
          key: 'subject',
          name: (
            <i18n path="text_subject_activity" tag="span">
              <br />
            </i18n>
          ),
          isNew: true,
          isHidden: () => false,
        },
        {
          key: 'ability',
          name: (
            <i18n path="text_ability_talent" tag="span">
              <br />
            </i18n>
          ),
          isNew: false,
          isHidden: () => this.isSecondary,
        },
        {
          key: 'opinion',
          name: (
            <i18n path="text_overall_opinion" tag="span">
              <br />
            </i18n>
          ),
          isNew: false,
          isHidden: () => false,
        },
      ],
      currentTerm: {},
      termIndex: 0,
      termList: [],
      reportInfo: {},
      isShowComment: false,
      selectedSubject: null,
      comment: '',
      subName: '',
      childs: [],
      currentChild: 0,
      isLoadChild: true,
      isLoadTerm: true,
      isLoadReport: true,
    }
  },
  computed: {
    ...mapState(['userRole', 'userInfo']),
    visibleTabs() {
      return this.tabs.filter(t => !t.isHidden())
    },
    activeTab() {
      return this.visibleTabs[this.currentTab]
    },
    isParent() {
      return this.userRole === this.$const.ROLE.PARENT
    },
    isStudent() {
      return this.userRole === this.$const.ROLE.STUDENT
    },
    isLoading() {
      return this.isLoadReport || this.isLoadTerm || (this.isParent && this.isLoadChild)
    },
    currentStudentId() {
      if (this.isParent) {
        return this.childs[this.currentChild].CHILD_ID
      }
      return this.userInfo.SID
    },
    isSecondary() {
      return !!this.reportInfo.SUMMARY_TERM
    },
    observationLastSeen() {
      const ls = this.$lodash.get(this.reportInfo, 'OBSERVATION.LAST_SEEN')
      if (!ls) {
        return 0
      }
      return this.$moment(ls).unix() * 1000
    },
    opinions() {
      if (!this.reportInfo || !this.reportInfo.OBSERVATION) {
        return null
      }
      return {
        COMMENT_TITLE:
          this.currentTerm.TERM === 0 ? this.$t('text_opinion_schoolyear_end') : this.$t('text_opinion_semester_end'),
        COMMENT_TERM:
          (this.reportInfo.OBSERVATION.IS_CLOSE_TASK && this.reportInfo.OBSERVATION.COMMENT_TERM) ||
          this.$t('text_comment_no'),
        UPDATE_AT: this.reportInfo.OBSERVATION.UPDATE_AT,
        IS_CLOSE_TASK: this.reportInfo.OBSERVATION.IS_CLOSE_TASK,
      }
    },
    subjectTabHasUpdate() {
      const subjects = this.$lodash.get(this.reportInfo, 'TERM_SCORE.ITEMS', [])
      return subjects.some(sub => sub.IS_CLOSE_TASK && sub.UPDATED_AT - sub.LAST_SEEN > 0)
    },
    abilityTabHasUpdate() {
      const { UPDATED_ATTITUDE_AT, UPDATED_APTITUDE_AT, IS_CLOSE_TASK } = this.$lodash.get(
        this.reportInfo,
        'OBSERVATION',
        {
          UPDATED_ATTITUDE_AT: 0,
          UPDATED_APTITUDE_AT: 0,
        },
      )
      if (!IS_CLOSE_TASK) {
        return false
      }
      return UPDATED_ATTITUDE_AT - this.observationLastSeen > 0 || UPDATED_APTITUDE_AT - this.observationLastSeen > 0
    },
    opinionTabHasUpdate() {
      if (!this.opinions || !this.opinions.IS_CLOSE_TASK) {
        return false
      }
      return this.opinions.UPDATE_AT - this.observationLastSeen > 0
    },
  },
  async mounted() {
    if (this.isParent) {
      await this.fetchChildList()
    }
    await this.fetchTerm()
    await this.fetchReport()
  },
  methods: {
    async fetchChildList() {
      const { DATA } = await this.$api.parent.GET_CHILD_LIST()
      this.childs = DATA
      this.isLoadChild = false
      await this.$router.push({ query: { STUDENT_ID: this.currentStudentId } })
    },
    async fetchTerm() {
      this.isLoadTerm = true
      const { DATA } = await this.$api.report.GET_LIST_TERM({ STUDENT_ID: this.currentStudentId })
      this.termList = DATA.sort((t1, t2) => {
        if (t1.BASE_YEAR === t2.BASE_YEAR) {
          if (t1.TERM === 0) {
            return 1
          }
          return t1.TERM - t2.TERM
        }
        return t1.BASE_YEAR - t2.BASE_YEAR
      })
      this.termIndex = this.termList.length - 1
      this.currentTerm = { ...this.termList[this.termIndex] }
      this.isLoadTerm = false
    },
    async fetchReport() {
      this.isLoadReport = true
      const params = {
        ...this.currentTerm,
        STUDENT_ID: this.currentStudentId,
      }
      const { DATA } = await this.$api.report.GET_REPORT_CARD(params)
      this.reportInfo = DATA || {}
      this.isLoadReport = false
      this.updateLastSeen()
      const updateStatusMap = [this.subjectTabHasUpdate, this.abilityTabHasUpdate, this.opinionTabHasUpdate]
      this.tabs = this.tabs.map((t, index) => ({
        ...t,
        isNew: updateStatusMap[index],
      }))
      this.currentTab = 0
    },
    async updateLastSeen() {
      const observationId = this.$lodash.get(this.reportInfo, 'OBSERVATION.OBSERVATION_ID')
      const subId = this.$lodash.get(this.reportInfo, 'TERM_SCORE.ITEMS', []).map(sub => sub.SUBJECT_ID)
      await this.$api.report.UPDATE_LAST_SEEN_REPORT_CARD({
        OBSERVATION_ID: observationId,
        SUB_IDS: subId,
        TERM: this.currentTerm.TERM,
        CLASS_ID: this.currentTerm.CLASS_ID,
      })
    },
    async changeChild(event, id, i) {
      let elem = event.target
      while (!elem.className.includes('u-swipe-item')) {
        elem = elem.offsetParent
      }
      this.$refs.swipe.scrollTo({
        top: 0,
        left: elem.offsetLeft,
        behavior: 'smooth',
      })
      this.currentChild = i
      await this.$router.push({ query: { STUDENT_ID: id } })
      await this.fetchTerm()
      await this.fetchReport()
    },
    async prev() {
      if (this.termIndex <= 0 || this.isLoadTerm) {
        return
      }
      this.termIndex = this.termIndex - 1
      this.currentTerm = this.termList[this.termIndex]
      await this.fetchReport()
    },
    async next() {
      if (this.termIndex === this.termList.length - 1 || this.isLoadTerm) {
        return
      }
      this.termIndex = this.termIndex + 1
      this.currentTerm = this.termList[this.termIndex]
      await this.fetchReport()
    },
    closeComment() {
      this.isShowComment = false
    },
    openPopup(payload) {
      this.isShowComment = payload.open
      this.comment = payload.cmt
      this.subName = payload.subName
    },
    openEvaluationDetail({ subject }) {
      this.selectedSubject = subject
    },
    closeEvaluationDetail() {
      this.selectedSubject = null
    },
  },
}
</script>
