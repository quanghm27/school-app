<template>
  <div class="flex flex-row justify-around items-center">
    <div
      v-for="item in listItems"
      :key="JSON.stringify(item)"
      class="text-sm text-center w-full h-full rounded-full py-1"
      @click="handleClick(item.value)"
    >
      <div class="flex flex-col justify-center items-center">
        <img
          :src="require(`~/assets/img/minigame/${item.image}`)"
          class="object-contain"
          :class="select === item.value ? 'h-14 w-14' : 'h-10 w-14'"
        />
        <p
          class="text-base w-full text-center -mt-3"
          style="color: #944200"
          :class="select === item.value ? 'font-bold' : 'font-normal'"
        >
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MGroupTypeGift',
  props: {
    select: {
      type: String,
      default: 'POSTER',
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
