import { get } from 'vuex-pathify'

export const loginMixin = {
  data() {
    return {
      code: '',
    }
  },
  computed: {
    ...get('login', ['type', 'info']),
    isStudent() {
      return this.type === this.$const.USER_TYPE.STUDENT
    },
    isTeacher() {
      return this.type === this.$const.USER_TYPE.TEACHER
    },
    isParent() {
      return this.type === this.$const.USER_TYPE.PARENT
    },
    isScanCamera() {
      return this.$route.name === 'auth-login-qr'
    },
  },
  methods: {
    // ---------------------------------------------------
    // -------------------LOGIN INFO----------------------
    // ---------------------------------------------------
    async getLoginInfo() {
      console.info(`!!! Code & Type: ${this.code}, ${this.type}`)
      const { DATA, RESULT, ERR_CODE } = await this.$api.auth.PRE_LOGIN({
        LOGIN_CODE: this.code,
        LOGIN_TYPE: this.type,
      })

      if (RESULT !== 'SUCCESS') {
        let message = '[Mã bí mật] hoặc [Số điện thoại] không đúng!'

        if (ERR_CODE === 'L0009') {
          message = '[Mã bí mật] hoặc [Số điện thoại] chưa có trong hệ thống!'
        }

        if (this.isScanCamera) {
          this.handleErrorCamera({ message })
        } else {
          this.$messageBox.message({
            message,
            type: 'error',
            buttonText: this.$t('Thử lại'),
          })
        }

        this.$store.set('login/info', {})
        return
      }

      this.$store.set('login/info', DATA)
    },

    // ---------------------------------------------------
    // -------------------Phone---------------------------
    // ---------------------------------------------------
    handleLoginByPhone() {
      // Học sinh bắt buộc login bằng QR
      if (this.isStudent) return

      if (!this.info.PHONE_NUMBER || !this.info.PHONE_NUMBER.length) {
        console.info('!!! Chưa có SDT trong hệ thống')
        this.$store.set('login/loginPhone', '')
        this.$store.set('login/phone', [])
        this.$messageBox.message({
          message: 'Chưa có số điện thoại trong hệ thống',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
        return
      }

      // ---------------------------------------------------
      if (this.info.PHONE_NUMBER?.length) {
        console.info('!!! Có SDT trong hệ thống')
        this.$store.set('login/loginPhone', this.info.PHONE_NUMBER[0])
        this.$store.set('login/phone', this.info.PHONE_NUMBER)

        if (this.info.IS_EXISTED_LOGIN_PASSWORD) {
          console.info('!!! Có Password trong hệ thống')
          this.$router.push({ name: 'auth-login-next-time' })

          return
        }

        console.info('!!! Chưa có Password trong hệ thống')
        // Giáo viên về màn Create password
        // Phụ huynh đứng im
        if (this.isTeacher) {
          this.$router.push({ name: 'auth-login-password-create' })
          return
        }

        // TODO
        this.$messageBox.message({
          message: 'Vui lòng đăng nhập bằng mã bí mật',
          type: 'error',
          buttonText: this.$t('Thử lại'),
        })
      }
    },

    // ---------------------------------------------------
    // -------------------QR CODE-------------------------
    // ---------------------------------------------------
    async handleLoginByQr() {
      this.$store.set('login/qr', this.code)

      if (this.info.IS_QR_EXPIRED) {
        console.info('!!! Login bằng QR code hết hạn')
        if (this.isScanCamera) {
          this.handleErrorCamera({ message: `Mã bí mật đã được liên kết với sđt ${this.info.PHONE_NUMBER.join(', ')}` })
        } else {
          this.$messageBox.message({
            message: `Mã bí mật đã được liên kết với sđt ${this.info.PHONE_NUMBER.join(', ')}`,
            type: 'error',
            buttonText: this.$t('Thử lại'),
          })
        }

        this.$store.set('login/info', {})
        return
      }

      console.info('!!! Login bằng QR code còn hạn')
      if (this.isStudent) {
        this.handleStudentLogin()
        return
      }

      // TODO
      if (this.info.PHONE_NUMBER?.length) {
        console.info('!!! Có SĐT trong hệ thống')
        this.$store.set('login/loginPhone', this.info.PHONE_NUMBER[0])
        this.$store.set('login/phone', this.info.PHONE_NUMBER)
      } else {
        this.$store.set('login/loginPhone', '')
        this.$store.set('login/phone', [])
      }

      console.info('!!! Chưa có SĐT trong hệ thống')
      await this.$router.push({ name: 'auth-login-confirm-info' })
    },

    // ---------------------------------------------------
    // -------------------STUDENT-------------------------
    // ---------------------------------------------------
    async handleStudentLogin() {
      const { DATA, RESULT } = await this.$api.auth.LOGIN_BY_SECRET_CODE({
        LOGIN_CODE: this.code,
        LOGIN_TYPE: this.type,
      })

      if (RESULT !== 'SUCCESS') {
        if (this.isScanCamera) {
          this.handleErrorCamera({ message: 'Không tìm thấy mã bí mật!' })
        } else {
          this.$messageBox.message({
            message: 'Không tìm thấy mã bí mật!',
            type: 'error',
            buttonText: this.$t('Thử lại'),
          })
        }
        return
      }

      this.$cookiz.set(this.$const.ACCESS_TOKEN, DATA.TOKEN, {
        maxAge: 60 * 60 * 24 * 30, // 30 days,
        path: '/',
      })

      await this.$store.dispatch('nuxtClientInit')
      await this.$router.push('/')
    },
  },
}
