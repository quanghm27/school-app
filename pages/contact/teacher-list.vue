<template>
  <ms-template :page-title="$t('menu_contact_book_teacher')">
    <ms-back slot="headerLeft" :to="{ path: '/contact?tab=0' }" />
    <template slot="headerRight">
      <a @click.prevent="showPopupSearch" class="icoApp-search"></a>
    </template>
    <template slot="content">
      <ms-spinner v-if="$fetchState.pending" />
      <ms-empty icon="icoNoti-noFound" :message="$t('msg_result_no')" v-else-if="teachers.DATA.ITEMS.length === 0" />
      <section class="contact">
        <div :class="['appTop-noti', { 'is-active': searchText }]">
          <a @click.prevent="search()" class="icoApp-close"></a>
          <span class="search-txt">{{ searchText }}</span>
        </div>
        <div :class="['appMid-noti', { 'is-active': isActive }]">
          <p class="app-txt">{{ $t(`text_contact_${isFavorited ? 'add' : 'delete'}`) }}</p>
        </div>
        <p class="search-total" v-if="teachers.DATA && teachers.DATA.length">
          {{ `${teachers.DATA.SEARCH_COUNT || 0} ${$t('text_search_result')}` }}
          <i class="u-space" />
          {{ `${teachers.DATA.TOTAL_COUNT || 0} ${$t('text_total')}` }}
        </p>
        <div class="searchList" v-infinite-scroll="loadMore" :infinite-scroll-distance="50">
          <div
            class="bookmark is-roleTeacher"
            v-for="tch in $lodash.get(teachers, 'DATA.ITEMS', [])"
            :key="tch.USER_ID"
          >
            <div class="u-box">
              <ul class="u-tb">
                <li>
                  <a @click.prevent="showPopupInfo(tch)" class="u-box-link">
                    <h4 class="person-name">{{ tch.USER_NAME }}</h4>
                    <p class="person-subject">{{ tch.SUB_INFO }}</p>
                    <p class="person-class">{{ `${tch.SCHOOL_NAME} ${tch.CLASS_NAME || ''}` }}</p>
                  </a>
                </li>
                <li class="bookmark-img">
                  <div class="u-pic" :style="`background-image: url(${tch.IMG_URL})`">
                    <a
                      @click.prevent="toggleFavorite(tch)"
                      :class="['icoApp-star', { 'is-active': tch.IS_FAVORITE }]"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <ms-spinner v-if="loadingMore" />
        </div>
      </section>
      <search-contact-popup
        :show="isShowSearch"
        :filters="filters"
        :curriculumInfo="contactTch.CURRICULUM_INFO"
        :classInfo="contactStd.CLASS_INFO"
        @close="closePopupSearch"
        @submit="search"
      />
      <teacher-info-popup
        :show="!!selectedTeacherId"
        :teacherId="selectedTeacherId"
        @close="closePopupInfo"
        @favorite-changed="updateFavorite"
      />
    </template>
  </ms-template>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import SearchContactPopup from '@/components/contact/SearchContactPopup'
import TeacherInfoPopup from '@/components/contact/TeacherInfoPopup'

export default {
  name: 'TeacherList',
  components: { SearchContactPopup, TeacherInfoPopup },
  directives: { infiniteScroll },
  data() {
    return {
      isShowSearch: false,
      selectedTeacherId: null,
      teachers: {},
      loadingMore: false,
      isFavorited: false,
      isActive: false,
      contactTch: {},
      contactStd: {},
    }
  },

  computed: {
    filters() {
      const { name, school, subject } = this.$route.query
      return {
        isTeacher: true,
        name,
        school,
        subject,
      }
    },
    searchText() {
      const { name } = this.$route.query
      const { CURRICULUM_INFO } = this.contactTch
      const school = (CURRICULUM_INFO || []).find(ci => `${ci.SCHOOL_ID}` === `${this.$route.query.school}`)
      const subject = school && school.CURRICULUM.find(c => `${c.ID}` === `${this.$route.query.subject}`)
      if (!name && !school && !subject) {
        return ''
      }
      return [name, this.$lodash.get(school, 'SCHOOL_NAME'), this.$lodash.get(subject, 'NAME')]
        .filter(s => !!s)
        .join(', ')
    },
    hasMore() {
      if (!this.$lodash.get(this, 'teachers.DATA.ITEMS')) {
        return false
      }
      return this.teachers.DATA.ITEMS.length < this.teachers.DATA.SEARCH_COUNT
    },
  },
  async fetch() {
    if (!this.contactTch || this.contactStd) {
      const [techers, students] = await Promise.all([
        this.$api.contact.GET_TEACHER_CONTACT_LIST(),
        this.$api.contact.GET_STUDENT_CONTACT_LIST(),
      ])
      this.contactTch = techers.DATA
      this.contactStd = students.DATA
    }
    const { favorite, name, school, subject } = this.$route.query
    const params = {
      CONDITIONS: {
        IS_FAVORITE: favorite,
        TEACHER_NAME: name,
        SCHOOL_ID: school,
        SUBJECT_CODE: subject,
      },
      SEARCH_UNIT: 10,
    }
    this.teachers = await this.$api.contact.SEARCH_TEACHER(params)
  },
  watch: {
    searchText() {
      this.$fetch()
    },
  },
  methods: {
    showPopupSearch() {
      this.isShowSearch = true
    },
    closePopupSearch() {
      this.isShowSearch = false
    },
    closePopupInfo() {
      this.selectedTeacherId = null
    },
    showPopupInfo(tch) {
      this.selectedTeacherId = tch.USER_ID
    },
    async loadMore() {
      if (this.hasMore && !this.loadingMore) {
        this.loadingMore = true
        const { favorite, name, school, subject } = this.$route.query
        const params = {
          CONDITIONS: {
            IS_FAVORITE: favorite,
            TEACHER_NAME: name,
            SCHOOL_ID: school,
            SUBJECT_CODE: subject,
          },
          NEXT_CURSOR: this.teachers.DATA.NEXT_CURSOR,
          SEARCH_UNIT: 10,
        }
        const response = await this.$api.contact.SEARCH_TEACHER(params)
        response.DATA.ITEMS = this.teachers.DATA.ITEMS.concat(response.DATA.ITEMS)
        this.teachers = response
        this.loadingMore = false
      }
    },
    async toggleFavorite(tch) {
      tch.IS_FAVORITE = !tch.IS_FAVORITE
      this.isFavorited = tch.IS_FAVORITE
      const params = {
        USER_ID: tch.USER_ID,
        IS_FAVORITE: tch.IS_FAVORITE,
        USER_TYPE: tch.USER_TYPE,
      }
      const { RESULT } = await this.$api.contact.EDIT_FAVORITE_CONTACT(params)
      if (RESULT === 'SUCCESS') {
        this.isActive = true
        setTimeout(() => {
          this.isActive = false
        }, 1500)
      } else {
        tch.IS_FAVORITE = !tch.IS_FAVORITE
      }
    },
    updateFavorite() {
      const teacher = this.teachers.DATA.ITEMS.find(t => t.USER_ID === this.selectedTeacherId)
      teacher.IS_FAVORITE = !teacher.IS_FAVORITE
    },
    async search({ isTeacher = true, name, school, subject, classId } = {}) {
      this.isShowSearch = false
      try {
        await this.$router.replace({
          path: `/contact/${isTeacher ? 'teacher' : 'student'}-list`,
          query: this.$lodash.pickBy({
            isTeacher,
            name,
            school,
            subject,
            classId,
          }),
        })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped></style>
