<template>
  <ms-popup-full
    v-bind="$attrs"
    v-on="$listeners"
    :title="title"
    :close-icon="true"
    @close="closePopup"
    :top-padding="'calc(100vh - 380px)'"
    class-name="!p-0 bg-gray-F9F9F9 bottom-sheet-select"
  >
    <div class="px-4 bg-gray-F9F9F9">
      <div
        v-for="(o, i) in options"
        :key="typeof o.value === 'object' ? i : o.value"
        class="bg-white rounded-md shadow p-3 mb-3 flex justify-between items-center text-[20px]"
        :class="{ 'text-teacher': selected === o.value }"
        @click="$emit('select', o.value)"
      >
        {{ o.label }}
        <n-icon v-if="o.value === selected" icon="check" style="fill: var(--color-teacher)" class="w-4 h-4 mr-1" />
      </div>
    </div>
  </ms-popup-full>
</template>

<script>
export default {
  name: 'BottomSheetSelect',
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: [Number, String, Object],
      default: null,
    },
  },
  methods: {
    closePopup() {
      this.$emit('input', false)
    },
  },
}
</script>

<style scoped>
.main-title {
  background-color: #f9f9f9;
  padding-bottom: 8px;
}
.pop .page {
  height: 380px;
}
</style>
