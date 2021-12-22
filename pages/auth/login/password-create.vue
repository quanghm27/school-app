<template>
  <div
    class="flex flex-col h-full bg-top bg-contain bg-no-repeat bg-primary"
    :style="{ backgroundImage: `url(${require(`~/assets/img/login/${headerBg}`)})` }"
  >
    <n-header class="px-4" rightDefault="">
      <template #headerLeft>
        <n-icon class="text-white" icon="arrow_back_ios" @click="$router.back()" />
      </template>
      <template #default>
        <img src="~/assets/img/logo.png" alt="logo" class="h-16" />
      </template>
    </n-header>
    <auth-content class="content">
      <div class="text-[#4f4f4f] text-base">
        <h1 class="text-3xl font-bold text-[#333]">Tạo mật khẩu mới</h1>
        <div class="mt-2 mb-8">
          Vui lòng thay đổi mật khẩu để tiếp tục sử dụng dịch vụ
        </div>

        <form @submit.prevent="submit">
          <div class="relative mb-3">
            <input
              v-model="formData.password"
              v-show="showPass"
              type="number"
              v-maxlength="6"
              :placeholder="$t('Mật khẩu mới')"
              class="!border-0 !h-auto block w-full pl-6 pr-12 py-4 leading-7 text-base placeholder-[#bdbdbd] shadow-md rounded-lg focus:ring-0 focus:border-0"
            />
            <input
              v-model="formData.password"
              v-show="!showPass"
              v-auto-focus
              autofocus
              type="password"
              pattern="[0-9]*"
              inputmode="numeric"
              v-maxlength="6"
              :placeholder="$t('Mật khẩu mới')"
              class="!border-0 !h-auto block w-full pl-6 pr-12 py-4 leading-7 text-base placeholder-[#bdbdbd] shadow-md rounded-lg focus:ring-0 focus:border-0"
            />
            <n-icon
              v-if="formData.password"
              :icon="showPass ? 'visibility_off' : 'remove_red_eye'"
              class="absolute text-gray-4 top-4 right-4"
              @click="showPass = !showPass"
            ></n-icon>
          </div>

          <div class="relative mb-3">
            <input
              v-model="formData.confirmPassword"
              v-show="showConfirmPass"
              type="number"
              v-maxlength="6"
              :placeholder="$t('Xác nhận mật khẩu')"
              class="!border-0 !h-auto block w-full pl-6 pr-12 py-4 leading-7 text-base placeholder-[#bdbdbd] shadow-md rounded-lg focus:ring-0 focus:border-0"
            />
            <input
              v-model="formData.confirmPassword"
              v-show="!showConfirmPass"
              type="password"
              pattern="[0-9]*"
              inputmode="numeric"
              v-maxlength="6"
              :placeholder="$t('Xác nhận mật khẩu')"
              class="!border-0 !h-auto block w-full pl-6 pr-12 py-4 leading-7 text-base placeholder-[#bdbdbd] shadow-md rounded-lg focus:ring-0 focus:border-0"
            />
            <n-icon
              v-if="formData.confirmPassword"
              :icon="showConfirmPass ? 'visibility_off' : 'remove_red_eye'"
              class="absolute text-gray-4 top-4 right-4"
              @click="showConfirmPass = !showConfirmPass"
            ></n-icon>
          </div>

          <button
            class="block w-full px-6 py-4 shadow-md rounded-lg text-xl font-bold bg-primary text-white mt-8"
            type="submit"
          >
            Xác nhận
          </button>
        </form>
        <div class="flex justify-center mt-6">
          <div class="flex items-center items-center" @click="$router.push({ name: 'inquiry-new-guest' })">
            <n-icon icon="help_outline" class="w-8 h-8 mr-1 text-primary"></n-icon>
            <span class="text-base text-[#666666]">Trợ giúp</span>
          </div>
        </div>
      </div>
    </auth-content>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'
import AuthContent from '~/components/auth/AuthContent'
import { themeMixin } from '@/mixins'

export default {
  name: 'PasswordCreate',
  layout: 'auth',
  components: {
    AuthContent,
  },
  mixins: [themeMixin],
  data() {
    return {
      showPass: false,
      showConfirmPass: false,
      formData: {
        password: '',
        confirmPassword: '',
      },
    }
  },
  computed: {
    ...get('login', ['info', 'loginPhone', 'type', 'qr', 'oldLoginPhone']),
    validConfirmPassword() {
      return this.formData.password === this.formData.confirmPassword
    },
    validLength() {
      return this.formData.password.length === 6
    },
  },
  methods: {
    async handleForgotPassword() {
      const { RESULT } = await this.$api.auth.RESET_PASSWORD_APP({
        PHONE_NUMBER: this.loginPhone,
        NEW_PASSWORD: this.formData.password,
        NEW_PASSWORD_CONFIRMATION: this.formData.confirmPassword,
      })

      if (RESULT !== 'SUCCESS') {
        this.$messageBox.message({
          message: 'Đã có lỗi xảy ra!',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      this.$router.push({
        name: 'auth-login-next-time',
        query: {
          verifyPhone: !this.info.IS_PRE_LOGIN_BY_QR,
        },
      })
    },
    async submit() {
      document.activeElement.blur()

      if (!this.validConfirmPassword) {
        this.$messageBox.message({
          message: '[Mật khẩu mới] và [Xác nhận mật khẩu] không thống nhất',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      if (!this.validLength) {
        this.$messageBox.message({
          message: 'Vui lòng nhập 6 chữ số',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      if (this.$route.query.forgot) {
        console.info('!!! Quên mật khẩu')
        await this.handleForgotPassword()
        return
      }

      const { DATA, RESULT } = await this.$api.auth.REGISTER_APP({
        LOGIN_CODE: this.qr || null,
        LOGIN_ID: this.loginPhone,
        OLD_LOGIN_ID: this.oldLoginPhone,
        PASSWORD: this.formData.password,
        CONFIRM_PASSWORD: this.formData.confirmPassword,
        USER_TYPE: this.type,
        IS_PRE_LOGIN_BY_QR: this.info.IS_PRE_LOGIN_BY_QR,
      })

      if (RESULT !== 'SUCCESS') {
        this.$messageBox.message({
          message: 'Đã có lỗi xảy ra!',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      console.info('!!! LOGIN bằng QR Code')
      if (DATA?.TOKEN) {
        this.$cookiz.set(this.$const.ACCESS_TOKEN, DATA.TOKEN, {
          maxAge: 60 * 60 * 24 * 30, // 30 days,
          path: '/',
        })

        await this.$store.dispatch('nuxtClientInit')
        await this.$router.push('/')
        return
      }

      console.info('!!! LOGIN bằng SĐT')
      this.$router.push({
        name: 'auth-login-next-time',
        query: {
          verifyPhone: !this.info.IS_PRE_LOGIN_BY_QR,
        },
      })
    },
  },
}
</script>
