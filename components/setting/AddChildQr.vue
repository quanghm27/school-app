<template>
  <section class="addChild scan-screen">
    <!-- QR code -->
    <div :id="showCamera && 'camera'" class="scan">
      <div :style="{ width: '100%', height: '100%', backgroundColor: '#000' }" />
    </div>
    <div class="scan-options">
      <div>
        <button
          :class="['btn-default', 'btn-custom', 'btn-custom--upload', { 'btn-disabled': loading }]"
          :disabled="loading"
        >
          {{ loading ? $t('Đang xử lý...') : $t('Chọn ảnh có sẵn') }}
          <qrcode-capture @decode="onDecode" @init="onInit" @detect="onDetect" class="is-hidden qr-capture" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { QrcodeCapture } from 'vue-qrcode-reader'
import { cameraMixin } from '~/mixins/camera'

export default {
  name: 'AddChildQr',
  mixins: [cameraMixin],
  components: {
    QrcodeCapture,
  },
  data() {
    return {
      loading: false,
    }
  },
  mounted() {
    this.showNativeCamera()
  },
  methods: {
    onDecode(result) {
      const [, , , SECRET_KEY] = result.split('|')

      if (!SECRET_KEY) {
        this.handleErrorCamera()
        return
      }

      this.submit(SECRET_KEY)
    },
    async submit(SECRET_KEY) {
      if (!SECRET_KEY) {
        this.handleErrorCamera()
        return
      }
      if (this.loading) {
        return
      }
      this.loading = true

      const { RESULT } = await this.$api.parent.ADD_CHILD_BY_QR({
        SECRET_KEY,
        clientOptions: {
          errorHandler: false,
        },
      })

      this.loading = false
      if (RESULT !== 'SUCCESS') {
        this.handleErrorCamera()
        return
      }
      this.$notify.show('pop_notify_complete_add_service')
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.scan-screen {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
}
.scan {
  flex: 1;
  height: auto;
}
.scan-options {
  text-align: center;
  z-index: 2;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-custom {
  display: inline-block;
  width: 45%;
}

.btn-custom--upload {
  position: relative;
  background-color: #159a3e;
  color: #fff;
  border: 2px solid #159a3e;
  font-weight: 500;
}

.btn-disabled {
  background-color: #b1b1b1;
  border-color: #b1b1b1;
}

.qr-capture {
  max-width: 100%;
}
</style>
