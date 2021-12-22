<template>
  <v2-template class-content="pr-4">
    <template slot="header">
      <attendance-header title="Điểm danh theo ngày"> </attendance-header>
    </template>

    <template slot="content">
      <attendance-picker></attendance-picker>

      <p class="text-[16px] font-semibold mb-4 leading-6 text-black">Danh sách lớp</p>

      <div class="flex flex-col">
        <div class="daily-class-item px-3 py-4 mb-2" v-for="i in 5" :key="i">
          <div class="text-[16px] leading-6 font-semibold daily-text-color-1">Lớp {{ i }} A</div>
          <div class="flex items-end text-[14px] daily-text-color-2">
            <div class="mr-6 flex items-center">
              <n-icon class="daily-icon-size-1 mr-1" icon="group-user"></n-icon>&nbsp;
              <span>Sĩ số: 37</span>
            </div>
            <div class="flex items-center">
              <n-icon class="daily-icon-size-1 mr-1" icon="grey-paragraph"></n-icon>&nbsp;
              <span>Vắng: 2</span>
            </div>
            <div class="ml-auto">
              <nuxt-link
                :to="{ name: 'v2-attendance-daily-class-id', params: { id: i } }"
                class="daily-class-item__btn-detail"
                >Chi tiết
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </template>
  </v2-template>
</template>

<script>
import V2Template from '@/components/common/V2Template'
import AttendanceHeader from '@/components/common/V2Header'
import AttendancePicker from '@/components/v2/attendance/AttendancePicker'

export default {
  name: 'Index',
  components: { V2Template, AttendanceHeader, AttendancePicker },
  data() {
    return {
      currentDay: new Date(),
    }
  },
}
</script>

<style scoped>
.daily-class-item {
  background: #f2f2f7;
  border-radius: 8px;
}

.daily-class-item__btn-detail {
  border-radius: 4px !important;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ee493d;
  color: #fff;
}

.daily-text-color-1 {
  color: #3a3a3c;
}

.daily-text-color-2 {
  color: #aeaeb2;
}

.daily-icon-size-1 {
  width: 14px;
  height: 14px;
}
</style>
