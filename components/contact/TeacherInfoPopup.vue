<template>
  <ms-popup type="custom" :show="show" :title="$t('text_information_teacher')" :close-icon="true" v-on="$listeners">
    <ms-spinner v-if="loading" />
    <div v-else class="personBox">
      <div class="personInfo">
        <div class="u-pic" :style="`background-image: url(${teacherInfo.IMG_URL})`">
          <i :class="['icoApp-star', { 'is-active': teacherInfo.IS_FAVORITE }]" @click.prevent="toggleFavorite" />
        </div>
        <div :class="['appMid-noti', { 'is-active': showToast }]">
          <p class="app-txt">{{ $t(`text_contact_${teacherInfo.IS_FAVORITE ? 'add' : 'delete'}`) }}</p>
        </div>
        <div class="personInfo-name">
          <i class="icoApp-m"></i>
          <p class="person-name">{{ teacherInfo.NAME }}</p>
        </div>
        <p class="person-subject" v-if="teacherInfo.SUB_INFO">
          {{ teacherInfo.SUB_INFO.map(s => s.SUB_NAME).join(', ') }}
        </p>
        <p class="person-class">
          {{ `${teacherInfo.SCHOOL_NAME || ''} ${teacherInfo.CLASS_NAME || ''}` }}
        </p>
      </div>
      <div class="personContact is-roleTeacher">
        <a :href="`tel:${teacherInfo.PHONE}`" class="contactNow">
          <i class="icoApp-phone"></i>
          {{ teacherInfo.PHONE | withDefault }}
        </a>
        <a class="contactNow is-disable" v-if="!teacherInfo.EMAIL">
          <i class="icoApp-email"></i>
          {{ $t('text_email_no') }}
        </a>
        <a v-else :href="`mailto:${teacherInfo.EMAIL}`" class="contactNow">
          <i class="icoApp-email"></i>
          {{ teacherInfo.EMAIL }}
        </a>
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
    teacherId: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      teacherInfo: {},
      loading: true,
      showToast: false,
    }
  },
  watch: {
    teacherId(tid) {
      if (tid) {
        this.fetchTeacherInfo(tid)
      }
    },
  },
  methods: {
    async fetchTeacherInfo(teacherId) {
      this.loading = true
      const { DATA } = await this.$api.contact.GET_TEACHER_INFO({ TEACHER_ID: teacherId })
      this.teacherInfo = DATA
      this.loading = false
    },
    async toggleFavorite() {
      this.teacherInfo.IS_FAVORITE = !this.teacherInfo.IS_FAVORITE
      const { RESULT } = await this.$api.contact.EDIT_FAVORITE_CONTACT({
        IS_FAVORITE: this.teacherInfo.IS_FAVORITE,
        USER_ID: this.teacherInfo.ID,
        USER_TYPE: 2,
      })
      if (RESULT === 'SUCCESS') {
        this.$emit('favorite-changed')
        this.showToast = true
        setTimeout(() => {
          this.showToast = false
        }, 1500)
      } else {
        this.teacherInfo.IS_FAVORITE = !this.teacherInfo.IS_FAVORITE
      }
    },
  },
}
</script>
