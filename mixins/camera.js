export const cameraMixin = {
  data() {
    return {
      showCamera: true,
      cameraVisible: false,
      processingQRCode: false,
      observer: null,
      detecting: false,
    }
  },
  mounted() {
    this.removeQrcodeListener = this.$utils.app.on('QRCODE_DETECTED', e => {
      if (this.processingQRCode) return

      this.processingQRCode = true
      this.onDecode(e.data)
    })
    this.observer = new MutationObserver(() => {
      if (document.getElementById('camera')) {
        setTimeout(() => {
          this.showNativeCamera()
        }, 300)
      } else {
        this.hideNativeCamera()
      }
    })

    if (document.getElementById('camera')) {
      setTimeout(() => {
        this.showNativeCamera()
      }, 300)
    }

    this.observer.observe(document.body, { childList: true, subtree: true })
  },
  destroyed() {
    if (this.cameraVisible) {
      this.hideNativeCamera()
    }
    if (this.removeQrcodeListener) {
      this.removeQrcodeListener()
      this.observer.disconnect()
    }
  },
  methods: {
    showNativeCamera() {
      if (this.cameraVisible) {
        return
      }
      const scanBox = document.getElementById('camera')
      const scanBoxRect = scanBox.getBoundingClientRect()
      const x = scanBoxRect.x || scanBoxRect.left
      const y = scanBoxRect.y || scanBoxRect.top
      const { width, height } = scanBoxRect
      const paddingHorizontal = 36
      const scanBoxHeight = width - paddingHorizontal * 2 // square
      const paddingVertical = (height - scanBoxHeight) / 2
      this.cameraVisible = true
      this.$utils.app.dispatch({
        type: 'SHOW_CAMERA',
        payload: {
          coord: { x, y },
          height,
          width,
          padding: [paddingVertical, paddingHorizontal, paddingVertical, paddingHorizontal],
          borderColor: this.cameraBorderColor || 'white',
        },
      })
    },
    hideNativeCamera() {
      if (!this.cameraVisible) {
        return
      }
      this.cameraVisible = false
      this.$utils.app.dispatch({ type: 'HIDE_CAMERA' })
    },
    handleErrorCamera(options) {
      if (this.cameraVisible) {
        this.showCamera = false
        this.hideNativeCamera()
      }

      this.$messageBox.message({
        message: 'Mã bí mật không hợp lệ!',
        type: 'error',
        buttonText: this.$t('Thử lại'),
        closeCb: async () => {
          if (!this.cameraVisible) {
            this.showCamera = true
            await this.$nextTick()
            this.showNativeCamera()
            this.processingQRCode = false
          }
        },
        ...options,
      })
    },
    async onDetect(promise) {
      this.detecting = true
      const { content } = await promise
      this.detecting = false

      if (!content) {
        this.handleErrorCamera()
        return
      }

      this.onDecode && this.onDecode(content)
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

        console.error(error)
      }
    },
  },
}
