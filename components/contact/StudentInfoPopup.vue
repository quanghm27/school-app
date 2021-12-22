<template>
  <ms-popup type="custom" :show="show" :title="$t('text_information_student')" :close-icon="true" v-on="$listeners">
    <ms-spinner v-if="loading" />
    <div class="personBox" v-else>
      <div class="personInfo">
        <div class="u-pic" :style="`background-image: url(${studentInfo.IMG_URL})`">
          <i :class="['icoApp-star', { 'is-active': studentInfo.IS_FAVORITE }]" @click.prevent="toggleFavorite" />
        </div>
        <div :class="['appMid-noti', { 'is-active': showToast }]">
          <p class="app-txt">{{ $t(`text_contact_${studentInfo.IS_FAVORITE ? 'add' : 'delete'}`) }}</p>
        </div>
        <div class="personInfo-name">
          <i :class="`icoApp-${studentInfo.SEX === 1 ? 'm' : 'f'}`"></i>
          <p class="person-name">{{ studentInfo.NAME }}</p>
        </div>
        <p class="person-sysID">{{ studentInfo.ID }}</p>
        <p class="person-class">
          {{ `${studentInfo.SCHOOL_NAME || ''} ${studentInfo.CLASS_NAME || ''}` }}
        </p>
      </div>
      <div class="personContact is-roleStudent">
        <a :href="`tel:${studentInfo.PHONE}`" class="contactNow">
          <i class="icoApp-phone"></i>
          {{ studentInfo.PHONE | withDefault }}
        </a>
        <a class="contactNow is-disable" v-if="!studentInfo.EMAIL">
          <i class="icoApp-email"></i>
          {{ $t('text_email_no') }}
        </a>
        <a v-else :href="`mailto:${studentInfo.EMAIL}`" class="contactNow">
          <i class="icoApp-email"></i>
          {{ studentInfo.EMAIL | withDefault }}
        </a>
      </div>
      <div class="personParents">
        <div class="u-box" v-for="pr in studentInfo.PARENT_INFO" :key="pr.ID">
          <ul class="u-tb">
            <li>
              <h2>{{ pr.NAME }}</h2>
              <p class="person-relate">{{ pr.RELATION_ID }}</p>
            </li>
            <li class="personParents-btn">
              <a :href="pr.EMAIL && `mailto:${pr.EMAIL}`" :class="['btn-circle', { 'is-disable': !pr.EMAIL }]">
                <i class="icoApp-email-S"></i>
              </a>
              <a :href="pr.PHONE && `tel:${pr.PHONE}`" :class="['btn-circle', { 'is-disable': !pr.PHONE }]">
                <i class="icoApp-phone-S"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ms-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    studentId: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      studentInfo: {},
      loading: true,
      showToast: false,
    }
  },
  watch: {
    studentId(sid) {
      if (sid) {
        this.fetchStudentInfo(sid)
      }
    },
  },
  methods: {
    async fetchStudentInfo(studentInfo) {
      this.loading = true
      const { DATA } = await this.$api.contact.GET_STUDENT_INFO({ STUDENT_ID: studentInfo })
      this.studentInfo = DATA
      this.loading = false
    },
    async toggleFavorite() {
      this.studentInfo.IS_FAVORITE = !this.studentInfo.IS_FAVORITE
      const { RESULT } = await this.$api.contact.EDIT_FAVORITE_CONTACT({
        IS_FAVORITE: this.studentInfo.IS_FAVORITE,
        USER_ID: this.studentInfo.ID,
        USER_TYPE: 1,
      })
      if (RESULT === 'SUCCESS') {
        this.$emit('favorite-changed')
        this.showToast = true
        setTimeout(() => {
          this.showToast = false
        }, 1500)
      } else {
        this.studentInfo.IS_FAVORITE = !this.studentInfo.IS_FAVORITE
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
