<template>
  <nuxt-link class="bg-white mb-4 pl-4 pr-5 h-14 flex items-center" :to="{ name: tab.routeName }">
    <div>
      <n-icon class="w-5 h-5" :icon="tab.icon"></n-icon>
    </div>
    <div class="ml-3 text-[16px] attendance-tabs__text-color-2 flex-1">{{ tab.title }}</div>
    <div class="attendance-tabs__count-notify">2</div>
    <div class="ml-2.5 flex justify-center items-center">
      <n-icon icon="chevron-right" class="w-[14px] h-[14px]" color="#C7C7CC"></n-icon>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'AttendanceTabs',
  props: {
    tab: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.attendance-tabs__count-notify {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #ee493d;
  width: 18px;
  height: 18px;
  color: #fff;
  font-size: 13px;
}
</style>
