<template>
  <div
    class="h-full bg-gray-6 bg-cover bg-center overflow-auto"
    :style="{ backgroundImage: `url(${require(`~/assets/img/login/${contentBg}`)})` }"
  >
    <n-header class="px-4 pt-0 items-start" rightDefault="">
      <template #headerLeft>
        <n-icon class="mt-4" icon="arrow_back_ios" @click="$router.back()" />
      </template>
      <template #default>
        <div class="bg-white shadow-lg p-4 pt-10 rounded-b-full">
          <img :src="require(`~/assets/img/login/${avtImg}`)" class="w-28 h-28 rounded-full bg-primary" />
        </div>
      </template>
    </n-header>
    <div class="p-6">
      <form @submit.prevent="submit">
        <h1 class="text-2xl font-bold text-gray-1 ">Xác nhận thông tin</h1>
        <div class="p-6 rounded-xl bg-white mt-4">
          <div class="mb-4 border-0 border-b border-solid border-gray-4 leading-8">
            <div class="text-gray-4">Họ & tên</div>
            <div>{{ info.FULL_NAME }}</div>
          </div>

          <div class="mb-4 border-0 border-b border-solid border-gray-4 leading-8" v-for="l in phone.length" :key="l">
            <div class="text-gray-4 flex items-center">
              Số điện thoại {{ phone.length > 1 ? l : '' }}
              <span v-if="!edited && l === 1" class="text-primary ml-2">[Mặc định]</span>
              <n-icon
                v-if="!edited && l === 1"
                icon="create"
                class="w-5 h-5 flex-end ml-auto"
                @click="handleEditable"
              />
            </div>
            <div>
              <div class="flex justify-between items-center py-2 relative">
                <input
                  :disabled="!edited"
                  ref="phones"
                  class="focus:ring-0 !border-0 p-0"
                  type="number"
                  v-only-phone
                  v-maxlength="11"
                  v-model="phone[l - 1]"
                />
                <t-radio
                  id="phone"
                  name="phone"
                  v-if="edited && phone.length > 1"
                  :value="l"
                  :checked="l - 1 === phoneSelected"
                  @input="selectPhone(l - 1)"
                />
              </div>
            </div>
          </div>

          <div class="mb-4 border-0 border-b border-solid border-gray-4 leading-8" v-if="info.BIRTHDAY">
            <div class="text-gray-4">Ngày sinh</div>
            <div>{{ info.BIRTHDAY | formatBirthday }}</div>
          </div>
        </div>

        <button
          type="submit"
          class="w-full px-6 py-4 shadow-md rounded-lg text-xl font-bold bg-primary text-white mt-8"
        >
          Xác nhận
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'
import { themeMixin } from '~/mixins'

export default {
  name: 'ConfirmInfo',
  layout: 'auth',
  mixins: [themeMixin],
  data() {
    return {
      phone: [],
      oldPhone: [],
      phoneSelected: 0,
      edited: false,
      confirmPwdErrMsg: null,
    }
  },
  computed: {
    ...get('login', ['loginPhone', 'info', 'type', 'oldLoginPhone', 'qr']),
    messageRegisteredOtherRole() {
      const registeredRole = this.type === this.$const.USER_TYPE.TEACHER ? 'vai trò phụ huynh,' : 'vai trò giáo viên,'

      return `<div class='mb-5'>Số điện thoại đã được đăng kí với
      <strong class='text-primary'>${registeredRole}</strong> vui lòng nhập mật khẩu để xác nhận
    </div>`
    },
  },
  created() {
    const phone = this.$store.get('login@phone')
    this.phone = phone.length ? [...phone] : ['']
    this.oldPhone = phone.length ? [...phone] : ['']
  },
  methods: {
    async submit() {
      document.activeElement.blur()

      const phone = this.phone[this.phoneSelected]
      const oldPhone = this.oldPhone[this.phoneSelected]

      if (!phone) {
        this.$messageBox.message({
          message: 'Vui lòng nhập số điện thoại',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      if (!this.$utils.validate.isPhone(phone)) {
        this.$messageBox.message({
          message: 'Số điện thoại không đúng định dạng',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      const { DATA } = await this.$api.auth.CHECK_LOGIN_ID({
        LOGIN_ID: phone,
        USER_TYPE: this.type,
        SECRET_KEY: this.qr,
      })
      if (DATA?.EXISTED_LOGIN_ID_SAME_ROLE) {
        this.$messageBox.message({
          message: `Số điện thoại đã được đăng ký`,
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      // Có pass, không có role khác
      if (DATA?.EXISTED_PASSWORD && !DATA?.EXIST_OTHER_ROLES) {
        this.$messageBox.message({
          message: `Số điện thoại đã được đăng ký`,
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }
      this.$store.set('login/loginPhone', phone)
      this.$store.set('login/oldLoginPhone', oldPhone)

      // Có pass, đã bị role khác đăng ký
      if (DATA?.EXISTED_PASSWORD && DATA?.EXIST_OTHER_ROLES) {
        const instance = this.$confirm.confirm({
          message: this.messageRegisteredOtherRole,
          buttonText: this.$t('Xác nhận'),
          inputType: 'password',
          inputPlaceholder: 'Mật khẩu',
          inputClass: '',
          isPrompt: true,
          htmlFormat: true,
          confirmCb: async (value, done) => {
            await this.registerThenLogin(value)
            if (this.confirmPwdErrMsg) {
              instance.setErrorMsg(this.confirmPwdErrMsg)
              return
            }
            done()
            await this.$store.dispatch('nuxtClientInit')
            await this.$router.push('/')
          },
        })
        return
      }

      // Không có pass
      await this.$router.push({ name: 'auth-login-password-create' })
    },
    async selectPhone(val) {
      this.phoneSelected = Number(val)
      await this.$nextTick()
      this.$refs.phones[this.phoneSelected].focus()
    },
    async handleEditable() {
      this.edited = true
      await this.$nextTick()
      this.$refs.phones[this.phoneSelected].focus()
    },
    async registerThenLogin(password) {
      const { DATA, RESULT, ERR_CODE } = await this.$api.auth.REGISTER_THEN_LOGIN({
        LOGIN_CODE: this.qr,
        LOGIN_ID: this.loginPhone,
        OLD_LOGIN_ID: this.oldLoginPhone,
        PASSWORD: password,
        USER_TYPE: this.type,
        LOGIN_TYPE: this.$const.CLIENT_TYPE,
      })
      this.confirmPwdErrMsg = null
      if (RESULT !== 'SUCCESS') {
        if (ERR_CODE === 'L0087') {
          this.confirmPwdErrMsg = 'Số điện thoại chưa được xác minh'
        } else if (ERR_CODE === 'L0002') {
          this.confirmPwdErrMsg = 'Mật khẩu không chính xác!'
        } else {
          this.confirmPwdErrMsg = 'Đã có lỗi xảy ra!'
        }

        return
      }

      this.$cookiz.set(this.$const.ACCESS_TOKEN, DATA.TOKEN, {
        maxAge: 60 * 60 * 24 * 30, // 30 days,
        path: '/',
      })
    },
  },
}
</script>
