<template>
  <div
    class="flex flex-col h-screen bg-top bg-contain bg-no-repeat bg-primary"
    :style="{ backgroundImage: `url(${require(`~/assets/img/login/${headerBg}`)})` }"
  >
    <n-header class="px-4" rightDefault="">
      <template #headerLeft>
        <n-icon class="text-white" icon="arrow_back_ios" @click="$router.push({ name: 'auth-login-select-role' })" />
      </template>
      <template #default>
        <img src="~/assets/img/logo.png" alt="logo" class="h-16" />
      </template>
    </n-header>
    <auth-content class="flex-grow">
      <form @submit.prevent="submit">
        <div class="text-[#4f4f4f] text-base">
          <h1 class="text-3xl font-bold text-[#333]">Đăng nhập</h1>
          <div class="mt-2 mb-10">
            Sử dụng mã QR hoặc Mã số bí mật để đăng nhập lần đầu vào ứng dụng
          </div>
          <input
            v-model.trim="code"
            v-auto-focus
            autofocus
            type="input"
            class="block w-full px-6 py-4 leading-7 shadow-md rounded-lg text-base placeholder-[#bdbdbd]"
            placeholder="Số điện thoại hoặc mã số bí mật"
          />
          <button
            type="submit"
            class="block w-full px-6 py-4 shadow-md rounded-lg text-xl font-bold bg-primary text-white mt-6"
          >
            Tiếp theo
          </button>
          <div class="flex justify-evenly mt-6">
            <div class="flex items-center items-center" @click="$router.push({ name: 'auth-login-qr' })">
              <n-icon icon="qr_code" class="w-8 h-8 mr-1 text-primary"></n-icon>
              <span class="text-base text-[#666666]">Mã QR</span>
            </div>
            <div class="flex items-center items-center" @click="$router.push({ name: 'inquiry-new-guest' })">
              <n-icon icon="help_outline" class="w-8 h-8 mr-1 text-primary"></n-icon>
              <span class="text-base text-[#666666]">Trợ giúp</span>
            </div>
          </div>
        </div>
      </form>
    </auth-content>
  </div>
</template>

<script>
import { loginMixin, themeMixin } from '@/mixins'
import AuthContent from '@/components/auth/AuthContent'

export default {
  name: 'CodeInput',
  layout: 'auth',
  mixins: [loginMixin, themeMixin],
  components: { AuthContent },
  created() {
    this.$store.set('login/phone', [])
  },
  methods: {
    async submit() {
      document.activeElement.blur()

      if (!this.type) {
        await this.$router.push({ name: 'auth-login-select-role' })
        return
      }

      if (!this.code) {
        this.$messageBox.message({
          message: 'Vui lòng nhập số điện thoại hoặc mã số bí mật',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      if (this.isStudent) {
        // Học sinh
        this.handleStudentLogin()
        return
      }

      // Phụ huynh or Giáo viên
      await this.getLoginInfo()

      if (this.$lodash.isEmpty(this.info)) return

      this.info.IS_PRE_LOGIN_BY_QR ? this.handleLoginByQr() : this.handleLoginByPhone()
    },
  },
}
</script>
