<template>
  <div class="login">
    <div class="logo">
      <img src="~/assets/img/logo.svg" title="SCHOOLS.VN" />
    </div>
    <form class="u-form">
      <div class="u-form-item">
        <div class="u-input-radio">
          <div class="u-radio">
            <input v-model="isTeacher" type="radio" id="radio1" class="u-radio-input" name="search" :value="false" />
            <label for="radio1" class="icoApp-radio"></label>
            <label for="radio1" class="u-radio-txt">{{ $t('btn_student') }}</label>
          </div>
          <div class="u-radio">
            <input v-model="isTeacher" type="radio" id="radio2" class="u-radio-input" name="search" :value="true" />
            <label for="radio2" class="icoApp-radio"></label>
            <label for="radio2" class="u-radio-txt">{{ $t('btn_teacher') }}</label>
          </div>
        </div>
      </div>
      <div class="u-form-item">
        <div class="u-select">
          <label for="inputSelect" class="arrow-D"></label>
          <select id="inputSelect" v-model="currItem">
            <option v-for="(item, index) in data" :key="index" :value="item.value">
              {{ item.FULL_NAME }}
            </option>
          </select>
        </div>
      </div>
    </form>
    <div :style="{ textAlign: 'center' }">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="login-footer">
      <div class="version">
        <p class="version-txt">{{ $appVersion }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  layout: 'empty',
  data() {
    return {
      isTeacher: false,
      data: [],
      teacherList: [],
      studentList: [],
      currItem: {},
    }
  },
  watch: {
    isTeacher() {
      this.data = this.isTeacher ? this.teacherList : this.studentList
    },
    currItem(val) {
      this.genQrCode(val)
    },
  },
  async created() {
    const { formatInput } = this.$utils.datetime
    const [teacherList, studentList] = await Promise.all([
      this.$api.garbage.GET_TEACHER_CARD_NUMBER(),
      this.$api.garbage.GET_STUDENT_CARD_NUMBER(),
    ])

    this.teacherList = teacherList
      .map(e => ({
        ...e,
        value: [e.CARD_NUMBER, e.FULL_NAME, formatInput(e.BIRTHDAY), e.SECRET_KEY].join('|'),
      }))
      .filter(e => !!e.SECRET_KEY)

    this.studentList = studentList
      .map(e => ({
        ...e,
        value: [e.CARD_NUMBER, e.FULL_NAME, formatInput(e.BIRTHDAY), e.SECRET_KEY].join('|'),
      }))
      .filter(e => !!e.SECRET_KEY)

    this.data = this.isTeacher ? this.teacherList : this.studentList
  },
  methods: {
    genQrCode(value) {
      if (!value) {
        return
      }

      console.info('User Info: ', value.split('|'))

      QRCode.toCanvas(this.$refs.canvas, value, { width: 200 }, err => {
        if (err) {
          alert('error')
          console.error(err)
        }
      })
    },
  },
}
</script>
