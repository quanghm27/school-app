<template>
  <v2-template class-content="pr-4 flex flex-col items-start" :showBottomNav="false">
    <template slot="header">
      <v2-header title="Chi tiết đơn"></v2-header>
    </template>
    <template slot="content">
      <div class="text-[20px] text-black leading-6 font-bold text-center mb-4">Đơn xin nghỉ học</div>

      <div class="mb-2">
        <div class="text-[16px] leading-6 font-bold day-off-detail__text-color-1">
          Kính gửi: Thầy/ Cô giáo viên chủ nhiệm
        </div>
        <div class="text-[16px] leading-6 font-bold day-off-detail__text-color-1">Em tên là: {{ dayOff.name }}</div>
        <div class="text-[16px] leading-6 font-bold day-off-detail__text-color-1">Lớp: {{ dayOff.class_name }}</div>
        <div class="text-[16px] leading-6 font-normal day-off-detail__text-color-2">
          Gia đình xin phép cho cháu nghỉ học
        </div>
      </div>

      <div class="mb-2">
        <div class="text-[16px] leading-6 font-bold day-off-detail__text-color-1">Ngày: {{ dayOff.date }}</div>
        <div class="text-[16px] leading-6 font-bold day-off-detail__text-color-1">Lý do: {{ dayOff.reason }}</div>
      </div>

      <div class="mb-6 text-[16px] leading-6 font-normal day-off-detail__text-color-2">
        Gia đình cam kết giúp cháu tự học, ôn tập và làm bài tập được giao về nhà trong thời gian nghỉ học. Trân trọng
        cảm ơn
      </div>

      <div class="flex justify-end self-end mb-6">
        <div class="text-center">
          <div class="text-[16px] leading-6 font-normal day-off-detail__text-color-3">Họ và tên phụ huynh</div>
          <div class="text-[16px] leading-6 font-bold day-off-detail__text-color-1">{{ dayOff.parent_name }}</div>
        </div>
      </div>

      <div v-if="dayOff.checked && dayOff.teacherComment" class="mt-4">
        <div class="day-off-detail__line mb-4"></div>
        <div class="text-[16px] leading-6 font-normal day-off-detail__text-color-3 mb-2">Ý kiến thầy cô giáo</div>
        <div class="text-[16px] leading-6 font-normal day-off-detail__text-color-1">{{ dayOff.teacherComment }}</div>
      </div>
      <textarea
        v-if="!dayOff.checked"
        class="text-[16px] leading-5 day-off-detail__textarea"
        placeholder="Ý kiến thầy cô giáo"
      ></textarea>
      <AttendanceAction v-if="!dayOff.checked" :always-show="true" />
    </template>
  </v2-template>
</template>

<script>
import V2Template from '@/components/common/V2Template'
import V2Header from '@/components/common/V2Header'
import AttendanceAction from '@/components/v2/attendance/AttendanceAction'

export default {
  name: 'Id',
  components: { V2Template, V2Header, AttendanceAction },
  data() {
    return {
      dayOff: {
        name: 'Mai Thị Linh',
        date: 'Thứ 2 - 24/08/2021',
        parent_name: 'Mai Huy Thanh',
        checked: false,
        class_name: '12A1',
        reason: 'Việc gia đình',
        teacherComment: '',
      },
    }
  },
}
</script>

<style scoped>
.day-off-detail__text-color-1 {
  color: #1c1c1e;
}

.day-off-detail__text-color-2 {
  color: #48484a;
}

.day-off-detail__text-color-3 {
  color: #8e8e93;
}

.day-off-detail__textarea {
  padding: 12px;
  background: #ffffff;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  height: 110px;
}

.day-off-detail__line {
  height: 0;
  border: 1px solid #000000;
  width: 100%;
  opacity: 0.1;
}
</style>
