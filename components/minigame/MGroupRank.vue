<template>
  <div
    class="flex flex-row rounded-xl bg-white justify-between items-center shadow-lg overflow-hidden"
    style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 20px 20px 0 rgba(0, 0, 0, 0.1);"
  >
    <div
      v-for="item in listItems"
      :key="JSON.stringify(item)"
      class="text-sm text-center w-full h-full rounded-xl py-1"
      :class="select === item.value ? 'text-white bg-green-27AE60' : 'text-gray-ACB4C3'"
      @click="handleClick(item.value)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MGroupRank',
  props: {
    select: {
      type: String,
      default: 'CLASS',
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    listItems: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClick(value) {
      this.onClick(value)
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped></style>
