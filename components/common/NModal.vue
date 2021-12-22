<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    :style="{ display: value ? 'block' : 'none' }"
  >
    <div class="flex items-center justify-center min-h-screen px-4 text-center block p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-lg w-full"
      >
        <div class="bg-white px-6 pt-6">
          <div class="text-center mt-0 text-left">
            <h3 class="leading-6 text-2xl text-gray-900 mt-3 mb-4 font-bold">
              <slot name="title" v-if="$slots.title"></slot>
            </h3>
            <div class="text-sm m-0">
              <slot name="default"></slot>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 ">
          <slot name="bottom" v-bind="{ close, confirm }">
            <div class="flex justify-between">
              <button
                type="button"
                class="font-bold mr-4 px-10 py-3 border-2 border-gray-4 border-solid text-gray-4 rounded-lg bg-transparent"
                @click="close"
              >
                {{ $t('Huỷ') }}
              </button>
              <button
                type="button"
                class="font-bold px-10 py-3 border-0 text-white rounded-lg bg-primary"
                @click="confirm"
              >
                {{ $t('Xác thực') }}
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    confirm() {
      this.$emit('confirm')
      this.close()
    },
  },
}
</script>
