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
            <div class="text-center mb-1 text-error" :class="typeTextColor">
              <n-icon icon="info_outline"></n-icon>
            </div>
            <h3 v-if="title !== ''" class="leading-6 text-2xl text-gray-900 mt-3 mb-4 font-bold">
              <slot name="title"></slot>
            </h3>
            <div class="text-sm text-center m-0">
              <slot name="default">
                <template v-if="!htmlFormat">{{ message }}</template>
                <div v-else v-html="message"></div>
              </slot>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 text-center">
          <div class="flex justify-center">
            <button
              type="button"
              class="font-bold px-10 py-3 text-white rounded-lg bg-error"
              :class="typeClass"
              @click="close"
            >
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NMessageBox',
  data() {
    return {
      visible: false,
      type: 'error',
      buttonText: 'Đóng',
      title: '',
      message: '',
      htmlFormat: false,
      closeCb: null,
      confirmCb: null,
      typeMap: {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error',
      },
    }
  },
  computed: {
    typeClass() {
      return this.type && this.typeMap[this.type] ? `bg-${this.typeMap[this.type]}` : ''
    },
    typeTextColor() {
      return this.type && this.typeMap[this.type] ? `text-${this.typeMap[this.type]}` : ''
    },
  },
  methods: {
    close() {
      this.closeCb && this.closeCb()
      this.visible = false
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
  },
}
</script>
