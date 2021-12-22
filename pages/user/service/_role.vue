<template>
  <ms-template
    :page-title="$t('menu_add_service')"
    page-type="subpage"
    :show-drawer="false"
    :show-bottom-nav="false"
    :content-srollable="deviceInfo.os !== 'ios'"
  >
    <ms-back slot="headerLeft" />
    <template slot="content">
      <section class="addService">
        <i class="icoApp-addService" title="Teacher" :style="{ marginTop: deviceInfo.os === 'ios' ? 0 : '2.86em' }" />
        <i18n path="btn_register_service" tag="h2" class="addService-title" for="btn_register_service">
          <b class="c-role">{{ $t(`btn_${role}`) }}</b>
        </i18n>

        <!-- Tab temporary -->
        <div class="tab">
          <ul class="u-tb">
            <li :class="['tab-item', { 'is-active': tabs.qr }]" @click.prevent="selectTab('qr')">
              <a href="#" class="tab-link">{{ $t('text_register_qr') }}</a>
            </li>
            <li :class="['tab-item', { 'is-active': tabs.input }]" @click.prevent="selectTab('input')">
              <a href="#" class="tab-link">{{ $t('text_enter_information_directly') }}</a>
            </li>
          </ul>
        </div>
        <div id="camera" class="scan" v-if="tabs.qr">
          <template v-if="deviceInfo.os !== 'ios'">
            <div class="scan-camera">
              <qrcode-stream @decode="onDecode" @init="onInit" />
            </div>
            <div class="scanFocus"></div>
            <div class="scanBox">
              <i class="scan-conner TL"></i>
              <i class="scan-conner TR"></i>
              <i class="scan-conner BL"></i>
              <i class="scan-conner BR"></i>
            </div>
            <p class="scan-PS ws-pre">{{ $t(`msg_register_${role === 'teacher' ? 'teacher' : 'student'}_qr`) }}</p>
          </template>
          <div v-else :style="{ width: '100%', height: '100%', backgroundColor: '#000' }" />
        </div>
        <form class="u-form" v-if="tabs.input" @submit.prevent="onSubmit">
          <template v-if="['teacher', 'student'].includes(role)">
            <div class="u-form-item">
              <label class="u-form-txt">{{ $t('text_card_number') }}<sup>*</sup></label>
              <div class="u-input">
                <input type="password" v-model="dataForm.CARD_NUMBER" />
              </div>
            </div>
            <div class="u-form-item">
              <label class="u-form-txt">{{ $t('text_secret_key') }}<sup>*</sup></label>
              <div class="u-input">
                <input type="password" v-model="dataForm.SECRET_KEY" />
              </div>
            </div>
            <div class="main-action">
              <a href="#" class="btn-default" @click.prevent="onSubmit">{{ $t('btn_confirmation') }}</a>
            </div>
          </template>
          <template v-if="role === 'parents'">
            <div class="u-form-item">
              <label class="u-form-txt">{{ $t('text_name_student') }}<sup>*</sup></label>
              <div class="u-input">
                <input type="text" v-model="parentForm.STUDENT_NAME" />
              </div>
              <p class="u-form-note">{{ $t('text_guide_name') }}</p>
            </div>
            <div class="u-form-item">
              <label class="u-form-txt">{{ $t('text_birthday_student') }}<sup>*</sup></label>
              <div class="u-fakeInput" data-click="0">
                <input type="date" v-model="parentForm.STUDENT_BIRTHDAY" class="is-hidden inputDate" id="inputDate" />
                <p class="u-fakeInput-val" v-if="parentForm.STUDENT_BIRTHDAY">
                  {{ parentForm.STUDENT_BIRTHDAY | formatBirthday }}
                </p>
                <p class="u-fakeInput-val placeholder" v-else>{{ $t('text_select_date_guide') }}</p>
              </div>
            </div>
            <div class="u-form-item">
              <label class="u-form-txt">{{ $t('text_card_number_student') }}<sup>*</sup></label>
              <div class="u-input">
                <input type="password" v-model="parentForm.CARD_NUMBER" />
              </div>
            </div>
            <div class="main-action">
              <a href="#" class="btn-default" @click.prevent="onSubmit">{{ $t('btn_confirmation') }}</a>
            </div>
          </template>
        </form>
      </section>
    </template>
  </ms-template>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { ROLES, USER_TYPE } from '~/constants'
import { cameraMixin } from '~/mixins/camera'

export default {
  mixins: [cameraMixin],
  middleware({ params, redirect }) {
    const isValidRole = ROLES.find(e => e.name === params.role)
    if (!isValidRole) {
      return redirect('/user/service/add')
    }
  },
  components: {
    QrcodeStream,
  },
  data() {
    return {
      result: '',
      error: '',
      roles: ROLES,
      tabs: {
        qr: true,
        input: false,
      },
      dataForm: {
        CARD_NUMBER: null,
        SECRET_KEY: null,
      },
      parentForm: {
        STUDENT_NAME: null,
        STUDENT_BIRTHDAY: null,
        CARD_NUMBER: null,
      },
      addServiceSuccess: false,
    }
  },
  computed: {
    role() {
      return this.$route.params.role || null
    },
    notifyVisible() {
      return this.$store.state.popupInfo.visible
    },
    isParent() {
      return this.role === 'parents'
    },
    cameraBorderColor() {
      const colors = {
        parents: '#159a3e',
        student: '#396cff',
        teacher: '#ee493d',
      }
      return colors[this.role]
    },
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    },
  },
  mounted() {
    this.updateBodyClass()
  },
  watch: {
    notifyVisible(val) {
      if (!val && this.addServiceSuccess) {
        this.$router.push('/')
      }
    },
  },
  methods: {
    updateBodyClass() {
      const el = document.body
      this.removeClassByPrefix(el, 'role-')
      el.classList.add(`role-${this.role}`)
    },
    removeClassByPrefix(el, prefix) {
      const regx = new RegExp('\\b' + prefix + '.*?\\b', 'g')
      ;[...el.classList].forEach(className => {
        regx.test(className) && el.classList.remove(className)
      })
    },
    selectTab(tab) {
      if (tab === 'qr') {
        this.tabs.qr = true
        this.tabs.input = false
      }
      if (tab === 'input') {
        this.tabs.input = true
        this.tabs.qr = false
      }
    },
    onSubmit() {
      if (!this.validateForm()) {
        return
      }
      let params = {
        ...this.dataForm,
        USER_TYPE: this.role === 'student' ? USER_TYPE.STUDENT : USER_TYPE.TEACHER,
      }
      if (this.isParent) {
        params = {
          ...this.parentForm,
          STUDENT_BIRTHDAY: this.$utils.datetime.formatInput(this.parentForm.STUDENT_BIRTHDAY),
        }
      }
      this.addService(params, 'input')
    },
    async addService(params, type) {
      let segment = 'auth'
      if (this.role === 'parents') {
        segment = 'app/parent'
      }
      const { RESULT } = await this.$api.user.ADD_SERVICE(params, segment)
      if (RESULT === 'FAIL' && type === 'qr') {
        this.selectTab('input')
        if (this.isParent) {
          this.parentForm = params
        } else {
          this.dataForm = params
        }
      }
      if (RESULT === 'SUCCESS') {
        this.addServiceSuccess = true
        this.$notify.show('pop_notify_complete_add_service')
        await this.$store.dispatch('nuxtClientInit')
      }
    },
    validateForm() {
      const commonFormValidate =
        ['teacher', 'student'].includes(this.role) && (!this.dataForm.CARD_NUMBER || !this.dataForm.SECRET_KEY)
      const parentFormValidate =
        this.role === 'parents' &&
        (!this.parentForm.STUDENT_NAME || !this.parentForm.STUDENT_BIRTHDAY || !this.parentForm.CARD_NUMBER)

      if (commonFormValidate || parentFormValidate) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      return true
    },
    onDecode(result) {
      console.log('QRCODE data: ', result)
      const [CARD_NUMBER, STUDENT_NAME, STUDENT_BIRTHDAY, SECRET_KEY] = result.split('|')

      if (!CARD_NUMBER || !STUDENT_NAME || !STUDENT_BIRTHDAY || !SECRET_KEY) {
        console.log('Invalid QR-code!')
        return
      }

      if (this.role === 'parents') {
        this.parentForm = {
          CARD_NUMBER,
          STUDENT_NAME,
          STUDENT_BIRTHDAY: this.$utils.datetime.formatToInput(STUDENT_BIRTHDAY),
        }
      } else {
        this.dataForm = {
          CARD_NUMBER,
          SECRET_KEY,
        }
      }
      this.selectTab('input')
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        switch (error.name) {
          case 'NotAllowedError':
            this.$utils.app.dispatch({ type: 'REQUEST_PERMISSIONS', payload: ['camera'] })
            // this.error = 'ERROR: you need to grant camera access permission'
            break
          case 'NotFoundError':
            // this.error = 'ERROR: no camera on this device'
            break
          case 'NotSupportedError':
            this.error = 'ERROR: secure context required (HTTPS, localhost)'
            break
          case 'NotReadableError':
            this.error = 'ERROR: is the camera already in use?'
            break
          case 'OverconstrainedError':
            this.error = 'ERROR: installed cameras are not suitable'
            break
          case 'StreamApiNotSupportedError':
            this.error = 'ERROR: Stream API is not supported in this browser'
            break

          default:
            this.error = error
            break
        }

        // this.$notify.error({
        //   title: 'QR Code Error!',
        //   message: this.error,
        //   cbClose: () => {
        //     this.selectTab('input')
        //   },
        // })

        console.error(error)
      }
    },
  },
}
</script>

<style>
.scan-PS {
  padding: 0 1.29em;
}
</style>
