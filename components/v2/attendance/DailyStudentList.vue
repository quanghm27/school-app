<template>
  <div>
    <div class="flex justify-between mb-4 items-center">
      <div class="text-[16px] font-bold leading-6">Danh sách học sinh vắng</div>
      <n-icon icon="plus-red"></n-icon>
    </div>

    <div class="daily-student-list">
      <div
        class="flex flex-col bg-white rounded-md py-3 px-4 daily-student-list__item"
        v-for="status in statuses"
        :key="status.text"
      >
        <div class="flex justify-between mb-3">
          <div class="flex items-start">
            <img class="mr-2 w-[32px] h-[32px]" :src="require('~/assets/img/avatar-student.png')" />
            <div class="text-[16px] font-bold leading-6">Đỗ Rê Mon</div>
          </div>
          <n-icon class="w-6 h-6" icon="close"></n-icon>
        </div>

        <div class="flex justify-between">
          <div
            class="w-[105px] h-[30px] text-[12px] rounded-[4px] flex items-center justify-center"
            :class="classByStatus(status.status)"
          >
            {{ status.text }}
          </div>
          <div>
            <switch-input></switch-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchInput from '@/components/v2/attendance/SwitchInput'

export default {
  name: 'DailyStudentList',
  components: { SwitchInput },
  data() {
    return {
      statuses: [
        { text: 'Chưa duyệt', status: 0 },
        { text: 'Không lý do', status: 1 },
        { text: 'Có phép', status: 2 },
      ],
    }
  },
  methods: {
    classByStatus(status) {
      switch (status) {
        case 0:
          return 'daily-status-none-checked'
        case 1:
          return 'daily-status-none-reason'
        case 2:
          return 'daily-status-have-reason'
      }
    },
  },
}
</script>

<style scoped>
.daily-student-list {
  max-height: 333px;
  overflow-y: auto;
}

.daily-student-list__item {
  margin-bottom: 16px;
}

.daily-student-list__item:last-child {
  margin-bottom: 0;
}

.daily-status-none-checked {
  background-color: rgba(238, 73, 61, 0.1);
  color: #ee493d;
}

.daily-status-none-reason {
  background-color: rgba(255, 168, 0, 0.1);
  color: #ffa800;
}

.daily-status-have-reason {
  background-color: rgba(15, 139, 255, 0.1);
  color: #0f8bff;
}
</style>
