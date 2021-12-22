<template>
  <v2-template>
    <template slot="header">
      <attendance-header title="Điểm Danh">
        <div slot="left" class="hidden"></div>
      </attendance-header>
    </template>
    <template slot="content">
      <div class="flex items-center">
        <img :src="require(`~/assets/img/avatar-${$store.get('userRole')}.png`)" alt="avatar" class="w-16 h-16 mr-4" />
        <div>
          <div class="leading-6 text-[16px] attendance-index__text-color-1">
            {{ $t(`text_${$store.get('userRole')}`) }}
          </div>
          <div class="leading-6 text-[16px] font-bold line-clamp-1 attendance-index__text-color-2">
            {{ userInfo.FULL_NAME }}
          </div>
        </div>
      </div>

      <div class="mt-4 mr-4" v-for="tab in tabs" :key="tab.title">
        <AttendanceTab :tab="tab" />
      </div>
    </template>
  </v2-template>
</template>

<script>
import V2Template from '@/components/common/V2Template'
import AttendanceHeader from '@/components/common/V2Header'
import AttendanceTab from '@/components/v2/attendance/AttendanceTab'
export default {
  name: 'Index',
  components: { V2Template, AttendanceHeader, AttendanceTab },
  data() {
    return {
      tabs: [
        {
          title: 'Quản lý đơn nghỉ',
          routeName: 'v2-attendance-day-off',
          icon: 'paragraph-teacher.svg',
        },
        {
          title: 'Điểm danh theo ngày',
          routeName: 'v2-attendance-daily',
          icon: 'daily-teacher.svg',
        },
        {
          title: 'Điểm danh theo tiết',
          routeName: 'v2-attendance-lecture',
          icon: 'clock-teacher.svg',
        },
        {
          title: 'Quá trình điểm danh',
          routeName: 'v2-attendance-history',
          icon: 'statistical-teacher.svg',
        },
      ],
    }
  },
  computed: {
    userInfo() {
      return this.$store.get('userInfo')
    },
  },
}
</script>

<style>
.attendance-index__text-color-1 {
  color: #636366;
}

.attendance-index__text-color-2 {
  color: #1c1c1e;
}
</style>
