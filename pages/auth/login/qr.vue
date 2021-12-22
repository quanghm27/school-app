<template>
  <div class="relative">
    <div class="flex flex-col justify-between h-screen">
      <n-header
        class="relative z-10 bg-primary p-4"
        rightDefault=""
        :style="{ paddingTop: `${$store.state.device.deviceInfo.statusBarHeight + 30}px` }"
      >
        <template #headerLeft>
          <n-icon icon="arrow_back_ios" class="text-white" @click="$router.back()"></n-icon>
        </template>
        <span class="text-white font-bold">
          Đăng nhập
        </span>
      </n-header>
      <div :id="showCamera && 'camera'" class="flex-grow relative">
        <div :style="{ width: '100%', height: '100%', backgroundColor: '#000' }" />
      </div>
      <div class="flex justify-center items-center text-center min-h-[133px]" v-if="detecting">
        Đang xử lý....
      </div>
      <div class=" flex justify-evenly items-center w-full py-8" v-else>
        <div class="flex flex-col justify-center items-center text-gray-2" @click="handleSelectFile">
          <n-icon icon="crop_original" class="mb-2 w-10 h-10"></n-icon>
          {{ $t('Chọn ảnh có sẵn') }}
          <qrcode-capture ref="capture" @decode="onDecode" @init="onInit" @detect="onDetect" class="hidden" />
        </div>

        <div
          class="flex flex-col justify-center items-center text-gray-2"
          @click="$router.push({ name: 'inquiry-new-guest' })"
        >
          <n-icon icon="info_outline" class="mb-2 w-10 h-10"></n-icon>
          {{ $t('Trợ giúp') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeCapture } from 'vue-qrcode-reader'
import { cameraMixin, loginMixin } from '~/mixins'

export default {
  name: 'LoginQR',
  layout: 'auth',
  mixins: [cameraMixin, loginMixin],
  data() {
    return {
      code: '',
      showCamera: true,
    }
  },
  components: { QrcodeCapture },
  methods: {
    handleSelectFile() {
      this.$refs.capture.$el.click()
    },
    async onDecode(result) {
      const [, , , LOGIN_CODE] = result.split('|')

      this.code = LOGIN_CODE
      await this.submit()
    },

    async submit() {
      if (!this.code) {
        this.handleErrorCamera({ message: 'Vui lòng nhập số điện thoại hoặc mã số bí mật' })
        return
      }

      if (!this.type) {
        await this.$router.push({ name: 'auth-login-select-role' })
        return
      }

      if (this.type === this.$const.USER_TYPE.STUDENT) {
        // Học sinh
        this.handleStudentLogin()
        return
      }

      // Giáo viên or Phụ huynh
      await this.getLoginInfo()

      if (this.$lodash.isEmpty(this.info)) return

      this.handleLoginByQr()
    },
  },
}
</script>
