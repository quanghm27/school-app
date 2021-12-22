<template>
  <ms-template :page-title="$t('menu_contact_book_student')">
    <ms-back slot="headerLeft" :to="{ path: '/contact?tab=1' }" />
    <template slot="headerRight">
      <a @click.prevent="showPopupSearch" class="icoApp-search"></a>
    </template>
    <template slot="content">
      <ms-spinner v-if="$fetchState.pending" />
      <ms-empty icon="icoNoti-noFound" :message="$t('msg_result_no')" v-else-if="students.DATA.ITEMS.length === 0" />
      <section class="contact">
        <div :class="['appTop-noti', { 'is-active': searchText }]">
          <a @click.prevent="search()" class="icoApp-close"></a>
          <span class="search-txt">{{ searchText }}</span>
        </div>
        <div :class="['appMid-noti', { 'is-active': isActive }]">
          <p class="app-txt">{{ $t(`text_contact_${isFavorited ? 'add' : 'delete'}`) }}</p>
        </div>
        <p class="search-total" v-if="students.DATA && students.DATA.length">
          {{ `${students.DATA.SEARCH_COUNT || 0} ${$t('text_search_result')}` }}
          <i class="u-space" />
          {{ `${students.DATA.TOTAL_COUNT || 0} ${$t('text_total')}` }}
        </p>
        <div class="searchList" v-infinite-scroll="loadMore" :infinite-scroll-distance="50">
          <div
            class="bookmark is-roleStudent"
            v-for="std in $lodash.get(students, 'DATA.ITEMS', [])"
            :key="std.USER_ID"
          >
            <div class="u-box">
              <ul class="u-tb">
                <li>
                  <a @click.prevent="showPopupInfo(std)" class="u-box-link">
                    <h4 class="person-name">{{ std.USER_NAME }}</h4>
                    <p class="person-sysID">
                      <i :class="`icoApp-${std.SEX === 1 ? 'm' : 'f'}`"></i>
                      {{ std.USER_ID }}
                    </p>
                    <p class="person-class">{{ `${std.SCHOOL_NAME} ${std.CLASS_NAME || ''}` }}</p>
                  </a>
                </li>
                <li class="bookmark-img">
                  <div class="u-pic" :style="`background-image: url(${std.IMG_URL})`">
                    <a
                      @click.prevent="toggleFavorite(std)"
                      :class="['icoApp-star', { 'is-active': std.IS_FAVORITE }]"
                    ></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
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
      <student-info-popup
        :show="!!selectedStudentId"
        :studentId="selectedStudentId"
        @close="closePopupInfo"
        @favorite-changed="updateFavorite"
      />
    </template>
  </ms-template>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import SearchContactPopup from '@/components/contact/SearchContactPopup'
import StudentInfoPopup from '@/components/contact/StudentInfoPopup'

export default {
  name: 'StudentList',
  components: { SearchContactPopup, StudentInfoPopup },
  directives: { infiniteScroll },
  data() {
    return {
      isShowSearch: false,
      selectedStudentId: null,
      students: {},
      loadingMore: false,
      studentInfo: {},
      isFavorited: false,
      isActive: false,
      contactTch: {},
      contactStd: {},
    }
  },
  computed: {
    filters() {
      const { name, school, subject, classId } = this.$route.query
      return {
        isTeacher: false,
        name,
        school,
        subject,
        classId,
      }
    },
    searchText() {
      const { name } = this.$route.query
      const { CLASS_INFO } = this.contactStd
      const school = (CLASS_INFO || []).find(ci => ci.SCHOOL_ID === this.$route.query.school)
      const cl = school && school.CLASSES.find(c => c.ID === this.$route.query.classId)
      if (!name && !school && !cl) {
        return ''
      }
      return [name, this.$lodash.get(school, 'SCHOOL_NAME'), this.$lodash.get(cl, 'NAME')].filter(s => !!s).join(', ')
    },
    hasMore() {
      if (!this.$lodash.get(this, 'students.DATA.ITEMS')) {
        return false
      }
      return this.students.DATA.ITEMS.length < this.students.DATA.SEARCH_COUNT
    },
  },
  async fetch() {
    const { favorite, name, school, classId } = this.$route.query
    const params = {
      CONDITIONS: {
        IS_FAVORITE: favorite,
        STUDENT_NAME: name,
        SCHOOL_ID: school,
        CLASS_ID: classId,
      },
      SEARCH_UNIT: 10,
    }
    this.students = await this.$api.contact.SEARCH_STUDENT(params)

    if (!this.contactTch || this.contactStd) {
      const [techers, students] = await Promise.all([
        this.$api.contact.GET_TEACHER_CONTACT_LIST(),
        this.$api.contact.GET_STUDENT_CONTACT_LIST(),
      ])
      this.contactTch = techers.DATA
      this.contactStd = students.DATA
    }
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
    showPopupInfo(std) {
      this.selectedStudentId = std.USER_ID
    },
    closePopupInfo() {
      this.selectedStudentId = null
    },
    async loadMore() {
      if (this.hasMore && !this.loadingMore) {
        this.loadingMore = true
        const { favorite, name, school, classId } = this.$route.query
        const params = {
          CONDITIONS: {
            IS_FAVORITE: favorite,
            STUDENT_NAME: name,
            SCHOOL_ID: school,
            CLASS_ID: classId,
          },
          NEXT_CURSOR: this.students.DATA.NEXT_CURSOR,
          SEARCH_UNIT: 10,
        }
        const response = await this.$api.contact.SEARCH_STUDENT(params)
        response.DATA.ITEMS = this.students.DATA.ITEMS.concat(response.DATA.ITEMS)
        this.students = response
        this.loadingMore = false
      }
    },
    async toggleFavorite(std) {
      std.IS_FAVORITE = !std.IS_FAVORITE
      this.isFavorited = std.IS_FAVORITE
      const params = {
        USER_ID: std.USER_ID,
        IS_FAVORITE: std.IS_FAVORITE,
        USER_TYPE: std.USER_TYPE,
      }
      const { RESULT } = await this.$api.contact.EDIT_FAVORITE_CONTACT(params)
      if (RESULT === 'SUCCESS') {
        this.isActive = true
        setTimeout(() => {
          this.isActive = false
        }, 1500)
      } else {
        std.IS_FAVORITE = !std.IS_FAVORITE
      }
    },
    updateFavorite() {
      const student = this.students.DATA.ITEMS.find(s => s.USER_ID === this.selectedStudentId)
      student.IS_FAVORITE = !student.IS_FAVORITE
    },
    async search({ isTeacher = false, name, school, subject, classId } = {}) {
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
