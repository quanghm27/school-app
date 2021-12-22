<template>
  <ms-template
    default-header-left="drawer"
    page-class="is-showDaySwipe teacher-attendance-header"
    :page-title="$t('Điểm Danh')"
  >
    <template slot="content">
      <div class="flex flex-col min-h-[100%] justify-center">
        <h2 class="text-2xl mb-4">{{ $t('Chọn tính năng') }}</h2>
        <nuxt-link
          v-for="item in items"
          :key="item.title"
          :to="{ name: item.routeName }"
          class="flex flex-col justify-center items-center px-4 py-8 mb-4 border-default rounded-xl shadow-lg  text-2xl font-bold disabled:text-gray-300"
          tag="button"
          :disabled="item.disabled"
        >
          <svg-icon :name="item.icon" :class="['w-16', 'h-16', { 'text-orange-EE493D': !item.disabled }]"></svg-icon>
          <span class="max-w-[60%] text-center">
            {{ $t(item.title) }}
          </span>
        </nuxt-link>
      </div>
    </template>
  </ms-template>
</template>

<script>
export default {
  name: 'AttendanceIndex',
  data() {
    return {
      items: [
        {
          title: 'Điểm danh theo ngày',
          routeName: 'attendance-daily',
          icon: 'date_range',
          disabled: !this.$store.state.isMainTeacher,
        },
        {
          title: 'Điểm danh theo tiết',
          routeName: 'attendance-lecture',
          icon: 'date_range',
          disabled: false,
        },
        {
          title: 'Thống kê điểm danh ngày',
          routeName: 'attendance-statistic',
          icon: 'insert_chart_outlined',
          // disabled: !this.$store.state.isSchoolAdmin,
          disabled: true,
        },
      ],
    }
  },
}
</script>
<style>
.teacher-attendance-header {
  background: #ee493d;
}
</style>
