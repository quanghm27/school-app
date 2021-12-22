<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    :style="{ display: visible ? 'block' : 'none' }"
  >
    <div class="flex items-center justify-center min-h-screen px-4 text-center block p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-lg w-full"
      >
        <div class="bg-white px-6 pt-6">
          <div class="text-center mt-0 text-left">
            <!-- <div class="text-center mb-1 text-error" :class="typeTextColor">
              <n-icon icon="info_outline"></n-icon>
            </div> -->
            <h3 v-if="title !== ''" class="leading-6 text-2xl text-gray-900 mt-3 mb-4 font-bold">
              <slot name="title"></slot>
            </h3>
            <div class="text-sm text-center m-0">
              <slot name="default">
                <template v-if="!htmlFormat">{{ message }}</template>
                <div v-else v-html="message"></div>
              </slot>
            </div>
            <div v-if="isPrompt" class="mb-2">
              <div class="relative mb-3">
                <input
                  v-model.trim="inputData"
                  v-show="showPass"
                  v-maxlength="6"
                  @input="isShowErr = false"
                  type="number"
                  :placeholder="'Mật khẩu'"
                  class="!border-0 !h-auto block w-full pl-6 pr-12 py-4 leading-7 text-base placeholder-[#bdbdbd] shadow-md rounded-lg focus:ring-0 focus:border-0"
                />
                <input
                  v-model.trim="inputData"
                  v-show="!showPass"
                  v-auto-focus
                  autofocus
                  @input="isShowErr = false"
                  type="password"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  v-maxlength="6"
                  :placeholder="'Mật khẩu'"
                  class="!border-0 !h-auto block w-full pl-6 pr-12 py-4 leading-7 text-base placeholder-[#bdbdbd] shadow-md rounded-lg focus:ring-0 focus:border-0"
                />
                <n-icon
                  v-if="inputData"
                  :icon="showPass ? 'visibility_off' : 'remove_red_eye'"
                  class="absolute text-gray-4 top-4 right-4"
                  @click="showPass = !showPass"
                ></n-icon>
              </div>
              <div v-if="isShowErr" class="text-error">{{ inputErrorMessage }}</div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 text-center">
          <div class="flex justify-center">
            <button
              type="button"
              class="font-bold mr-4 px-10 py-3 border-2 border-gray-4 border-solid text-gray-4 rounded-lg bg-transparent"
              @click="close"
            >
              {{ buttonCancelText }}
            </button>
            <button type="button" class="font-bold px-10 py-3 text-white rounded-lg bg-primary" @click="confirm">
              {{ buttonConfirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NConfirm',
  data() {
    return {
      visible: false,
      buttonConfirmText: 'Xác nhận',
      buttonCancelText: 'Đóng',
      title: '',
      message: '',
      htmlFormat: false,
      isPrompt: true,
      closeCb: null,
      confirmCb: null,
      validateCb: null,
      inputData: null,
      inputType: 'input',
      inputPlaceholder: '',
      inputClass: '',
      inputErrorMessage: '',
      isShowErr: false,
      showPass: false,
      password: '',
    }
  },
  computed: {},
  methods: {
    close() {
      this.closeCb && this.closeCb()
      this.visible = false
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    confirm() {
      //if (!this.validate()) return
      this.confirmCb && this.confirmCb(this.inputData, this.close)
    },
    validate() {
      if (this.validateCb) {
        let result = this.validateCb(this.inputData)
        result = typeof result === 'boolean' ? result : false
        this.isShowErr = !result
        this.inputErrorMessage = this.inputErrorMessage || 'Error'
        return result
      }
      return true
    },
    setErrorMsg(errMsg) {
      this.isShowErr = true
      this.inputErrorMessage = errMsg
    },
  },
}
</script>
