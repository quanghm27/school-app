<template>
  <ms-template
    :show-bottom-nav="false"
    default-header-left="drawer"
    :page-title="$t('menu_contact_book')"
    page-class="is-showTab"
  >
    <template slot="headerLeft">
      <ms-back />
    </template>
    <template slot="headerRight">
      <a @click.prevent="showPopup" class="icoApp-search"></a>
    </template>
    <template slot="headerBottom">
      <ms-tabs v-model="currentTab" tab-name="announce">
        <ms-tab v-for="tab in tabs" :name="tab" :key="tab">
          <portal to="contact-book">
            <ms-spinner v-if="$fetchState.pending" />
            <template v-else>
              <section v-if="currentTab === 0" class="contact">
                <div class="contactBook">
                  <div class="row">
                    <div class="col-1-2">
                      <contact-card
                        icon="icoSubj-bookmark"
                        :title="$t('btn_favorite')"
                        :subtitle="contactTch.TEACHER_CONTACT.FAV_TEACHER_COUNT"
                        @click="$router.push({ path: 'contact/teacher-list', query: { favorite: true } })"
                      />
                    </div>
                    <template v-if="isStudent || isParent">
                      <div class="col-1-2" v-for="tch in contactTch.TEACHER_CONTACT.HOMEROOM_TEACHERS" :key="tch.ID">
                        <contact-card
                          icon="icoSubj-person"
                          :title="tch.NAME"
                          :subtitle="`${$t('systext_007_001')} ${isParent ? tch.STUDENT_NAME : ''}`"
                          @click="selectedTeacherId = tch.ID"
                        />
                      </div>
                    </template>
                    <div class="col-1-2">
                      <contact-card
                        icon="icoSubj-list"
                        :title="$t('btn_all_teacher')"
                        :subtitle="contactTch.TEACHER_CONTACT.TEACHER_TOTAL_COUNT"
                        @click="$router.push('contact/teacher-list')"
                      />
                    </div>
                  </div>
                </div>
                <div class="contactBook" v-for="sch in contactTch.CURRICULUM_INFO" :key="sch.SCHOOL_ID">
                  <h2 class="contactBook-title">{{ sch.SCHOOL_NAME }}</h2>
                  <div class="row">
                    <div class="col-1-3" v-for="sub in sch.CURRICULUM" :key="sub.ID">
                      <contact-card
                        icon="icoSubj-vn"
                        :title="sub.NAME"
                        :subtitle="sub.TEACHER_COUNT"
                        @click="
                          $router.push({
                            path: 'contact/teacher-list',
                            query: { school: sch.SCHOOL_ID, subject: sub.ID },
                          })
                        "
                      />
                    </div>
                    <div class="col-1-3">
                      <contact-card
                        icon="icoSubj-list"
                        :title="$t('btn_all')"
                        :subtitle="sch.TEACHER_TOTAL_COUNT"
                        @click="
                          $router.push({
                            path: 'contact/teacher-list',
                            query: { school: sch.SCHOOL_ID },
                          })
                        "
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section v-show="currentTab === 1" class="contact">
                <div class="contactBook">
                  <div class="row">
                    <div class="col-1-2">
                      <contact-card
                        icon="icoSubj-bookmark"
                        :title="$t('btn_favorite')"
                        :subtitle="contactStd.STUDENT_CONTACT.FAV_STUDENT_COUNT"
                        @click="$router.push({ path: 'contact/student-list', query: { favorite: true } })"
                      />
                    </div>
                    <div class="col-1-2">
                      <contact-card
                        icon="icoSubj-list"
                        :title="$t('btn_all_student')"
                        :subtitle="contactStd.STUDENT_CONTACT.STD_TOTAL_COUNT"
                        @click="$router.push('contact/student-list')"
                      />
                    </div>
                  </div>
                </div>
                <div class="contactBook" v-for="std in contactStd.CLASS_INFO" :key="std.SCHOOL_ID">
                  <h2 class="contactBook-title">{{ std.SCHOOL_NAME }}</h2>
                  <div class="row">
                    <div class="col-1-3" v-for="cl in std.CLASSES" :key="cl.ID">
                      <contact-card
                        icon="icoSubj-group"
                        :tag="
                          isTeacher &&
                            ((cl.IS_HOMEROOM && $t('text_class_teacher')) ||
                              (cl.IS_SUB_TEACHER && $t('text_class_teacher_assist')))
                        "
                        :title="`${cl.NAME}`"
                        :subtitle="cl.STUDENT_COUNT"
                        @click="
                          $router.push({
                            path: 'contact/student-list',
                            query: { school: std.SCHOOL_ID, classId: cl.ID },
                          })
                        "
                      />
                    </div>
                    <div class="col-1-3">
                      <contact-card
                        icon="icoSubj-list"
                        :title="$t('btn_all')"
                        :subtitle="std.STD_TOTAL_COUNT"
                        @click="
                          $router.push({
                            path: 'contact/student-list',
                            query: { school: std.SCHOOL_ID },
                          })
                        "
                      />
                    </div>
                  </div>
                </div>
              </section>
            </template>
          </portal>
        </ms-tab>
      </ms-tabs>
    </template>
    <template slot="content">
      <portal-target name="contact-book" />
      <search-contact-popup
        :show="isShow"
        :curriculumInfo="contactTch.CURRICULUM_INFO"
        :classInfo="contactStd.CLASS_INFO"
        @close="closePopup"
        @submit="search"
      />
      <teacher-info-popup
        :show="!!selectedTeacherId"
        :teacherId="selectedTeacherId"
        @close="selectedTeacherId = null"
      />
    </template>
  </ms-template>
</template>

<script>
import { mapState } from 'vuex'
import { ROLE } from '@/constants'
import SearchContactPopup from '@/components/contact/SearchContactPopup'
import ContactCard from '@/components/contact/ContactCard'
import TeacherInfoPopup from '@/components/contact/TeacherInfoPopup'

export default {
  name: 'Index',
  components: { SearchContactPopup, ContactCard, TeacherInfoPopup },
  data() {
    return {
      tabs: [this.$t('text_teacher'), this.$t('text_student')],
      currentTab: this.$route.query.tab ? parseInt(this.$route.query.tab) : 0,
      isShow: false,
      childs: [],
      contactTch: {},
      contactStd: {},
      selectedTeacherId: null,
    }
  },
  computed: {
    ...mapState(['userRole']),
    isTeacher() {
      return this.userRole === ROLE.TEACHER
    },
    isStudent() {
      return this.userRole === ROLE.STUDENT
    },
    isParent() {
      return this.userRole === ROLE.PARENT
    },
  },
  async fetch() {
    const [teachers, students] = await Promise.all([
      this.$api.contact.GET_TEACHER_CONTACT_LIST(),
      this.$api.contact.GET_STUDENT_CONTACT_LIST(),
    ])
    this.contactTch = teachers.DATA
    this.contactStd = students.DATA
  },
  methods: {
    showPopup() {
      this.isShow = true
    },
    closePopup() {
      this.isShow = false
    },
    search({ isTeacher, name, school, subject, classId }) {
      this.isShow = false
      this.$router.push({
        path: `/contact/${isTeacher ? 'teacher' : 'student'}-list`,
        query: this.$lodash.pickBy({
          isTeacher,
          name,
          school,
          subject,
          classId,
        }),
      })
    },
  },
}
</script>

<style scoped></style>
