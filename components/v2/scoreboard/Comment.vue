<template>
  <div>
    <div class="flex justify-between items-center header">
      <div class="font-bold text-[16px]">
        {{ name }}
      </div>
      <n-icon v-if="editable" icon="edit" class="w-4 h-4" @click="onEdit"></n-icon>
    </div>
    <textarea
      class="px-3 py-2 bg-white content border-none"
      :class="{ empty: !value && disabled }"
      ref="input"
      rows="2"
      :disabled="disabled"
      :value="value"
      :placeholder="editable ? $t('Nhập nhận xét') : $t('Chưa có nhận xét')"
      :maxlength="100"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      disabled: true,
    }
  },
  methods: {
    onEdit() {
      this.disabled = false
      this.$nextTick(() => this.$refs.input.focus())
    },
  },
}
</script>

<style scoped>
.header {
  background-color: #f2f2f7;
  padding: 12px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.content {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 96px;
}
.content.empty {
  height: 56px;
}
</style>
