<template>
  <div
    class="flex h-full flex-col bg-top bg-contain bg-no-repeat bg-primary"
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
        <h1 class="text-3xl font-bold text-[#333]">Xin chào!</h1>
        <div class="flex items-center my-6">
          <img :src="require(`~/assets/img/login/${avtImg}`)" class="w-18 h-18 rounded-full bg-primary" />
          <div class="ml-6">
            <div class="text-gray-4">{{ label }}</div>
            <div class="fw-normal mt-1">{{ info.FULL_NAME }}</div>
            <div class="fw-normal mt-1">{{ loginPhone }}</div>
          </div>
        </div>
        <form @submit.prevent="submit">
          <div class="relative mb-3">
            <input
              v-model="password"
              v-show="showPass"
              v-maxlength="6"
              type="number"
              :placeholder="$t('Mật khẩu')"
              class="!border-0 !h-auto block w-full pl-6 pr-12 py-4 leading-7 text-base placeholder-[#bdbdbd] shadow-md rounded-lg focus:ring-0 focus:border-0"
            />
            <input
              v-model="password"
              v-show="!showPass"
              v-auto-focus
              autofocus
              type="password"
              pattern="[0-9]*"
              inputmode="numeric"
              v-maxlength="6"
              :placeholder="$t('Mật khẩu')"
              class="!border-0 !h-auto block w-full pl-6 pr-12 py-4 leading-7 text-base placeholder-[#bdbdbd] shadow-md rounded-lg focus:ring-0 focus:border-0"
            />
            <n-icon
              v-if="password"
              :icon="showPass ? 'visibility_off' : 'remove_red_eye'"
              class="absolute text-gray-4 top-4 right-4"
              @click="showPass = !showPass"
            ></n-icon>
          </div>

          <button
            class="block w-full px-6 py-4 shadow-md rounded-lg text-xl font-bold bg-primary text-white mt-8"
            type="submit"
          >
            Xác nhận
          </button>
        </form>
        <div class="flex flex-col justify-center items-center mt-4">
          <n-link class="text-gray-4" :to="{ name: 'auth-login-password-create', query: { forgot: true } }">
            Quên mật khẩu?
          </n-link>
          <button type="button" class="mt-4" @click="logoutConfirm = true">
            Thoát tài khoản
          </button>
        </div>
      </div>
    </auth-content>

    <n-modal v-model="verifyPhone" @confirm="handleConfirmSms">
      <template #title class="font-bold">
        Xác thực tài khoản
      </template>

      Để xác thực tài khoản Schools.vn bạn vui lòng gửi tin nhắn với cú pháp <strong>SCL</strong> gửi
      <strong>8100</strong>. Phí dịch vụ 1.500đ/SMS
      <br />
      <br />
      Cảm ơn bạn đã sử dụng dịch vụ.
      <br />
      <br />
    </n-modal>

    <n-modal v-model="logoutConfirm" @confirm="handleConfirmLogout">
      Bạn chắc chắn muốn thoát tài khoản?
      <br />
      <br />

      <template #bottom="{close, confirm}">
        <div class="flex justify-end">
          <button type="button" class="font-bold mr-4 px-4 py-3 uppercase" @click="close">
            {{ $t('Huỷ') }}
          </button>
          <button type="button" class="font-bold px-4 py-3 text-primary uppercase" @click="confirm">
            {{ $t('Xác thực') }}
          </button>
        </div>
      </template>
    </n-modal>
    <a
      ref="sms"
      class="hidden"
      :href="`sms:${verifyMessage.callCenter}${isIOS ? '&' : '?'}body=${verifyMessage.syntax}`"
    />
  </div>
</template>

<script>
import { get } from 'vuex-pathify'
import { loginMixin, themeMixin } from '~/mixins'
import AuthContent from '~/components/auth/AuthContent'

export default {
  name: 'NextTime',
  layout: 'auth',
  mixins: [themeMixin, loginMixin],
  components: {
    AuthContent,
  },
  data() {
    return {
      password: '',
      showPass: false,
      logoutConfirm: false,
      verifyPhone: Boolean(this.$route.query.verifyPhone),
      verifyMessage: {
        callCenter: 8100,
        syntax: 'SCL',
      },
    }
  },
  computed: {
    ...get('login', ['loginPhone']),
    label() {
      if (this.isTeacher) {
        return 'Quý thầy cô:'
      }

      if (this.isParent) {
        return 'Phụ huynh của:'
      }

      return 'Học sinh:'
    },
    validLength() {
      return this.password.length === 6
    },
    isIOS() {
      return this.$store.state.device.deviceInfo.os === 'ios'
    },
  },
  methods: {
    handleConfirmLogout() {
      this.$router.push({ name: 'auth-login-select-role' })
    },
    handleConfirmSms() {
      this.$refs.sms.click()
    },
    async submit() {
      document.activeElement.blur()

      if (!this.password) return

      if (!this.validLength) {
        this.$messageBox.message({
          message: 'Vui lòng nhập 6 chữ số',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      const { DATA, RESULT, ERR_CODE } = await this.$api.auth.LOGIN({
        LOGIN_ID: this.loginPhone,
        PASSWORD: this.password,
        USER_TYPE: this.type,
        LOGIN_TYPE: this.$const.CLIENT_TYPE,
      })

      if (RESULT !== 'SUCCESS') {
        if (ERR_CODE === 'L0087') {
          this.$messageBox.message({
            message: 'Số điện thoại chưa được xác minh',
            type: 'error',
            buttonText: this.$t('Thử lại'),
          })
          this.verifyPhone = true
        }
        if (ERR_CODE === 'L0002') {
          this.$messageBox.message({
            message: 'Mật khẩu không chính xác!',
            type: 'error',
            buttonText: this.$t('Thử lại'),
          })
        }

        return
      }

      await this.$cookiz.set(this.$const.ACCESS_TOKEN, DATA.TOKEN, {
        maxAge: 60 * 60 * 24 * 30, // 30 days,
        path: '/',
      })

      await this.$store.dispatch('nuxtClientInit')
      await this.$router.push('/')
    },
  },
}
</script>
