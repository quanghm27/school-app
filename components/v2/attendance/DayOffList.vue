<template>
  <div class="w-full overflow-auto" :style="customMaxHeight">
    <div
      v-for="(item, index) in list"
      :key="`${item.studentName}-${index}`"
      :item="item.id"
      class="last:mb-0 relative cursor-pointer w-full bg-white mb-4 pl-4 pr-5 py-3 flex items-center"
    >
      <div>
        <img class="w-10 h-10" src="~/assets/img/avatar-student.png" />
      </div>
      <div class="ml-3 text-[16px] flex-1">
        <div
          class="leading-6 text-[16px] font-bold absence-application-text-color-1 mb-2"
          :class="studentNameClass"
          v-if="studentName"
        >
          {{ item.studentName }}
        </div>
        <div class="absence-application-text-color-2 text-[12px] leading-4 mb-1" v-if="dayOff">
          Ngày xin nghỉ : <span>{{ item.dateOff }}</span>
        </div>
        <div class="absence-application-text-color-2 text-[12px] leading-4 mb-1" v-if="dayCheck">
          Ngày duyệt : <span>{{ item.dateCheck }}</span>
        </div>
        <div class="absence-application-text-color-2 text-[12px] leading-4 mb-1" v-if="teacherName">
          Người duyệt : <span>{{ item.teacherName }}</span>
        </div>
        <div class="absence-application-text-color-2 text-[12px] leading-4" v-if="birthDay">
          <span>{{ item.birthDay }}</span>
        </div>
      </div>
      <div class="ml-2.5 flex-box justify-center items-center">
        <n-link :to="{ name: routeName, params: item.params || { id: item.id } }" :key="item.id">
          <n-icon icon="chevron-right" class="w-[14px] h-[14px]" color="#C7C7CC"></n-icon>
        </n-link>
      </div>
      <div
        class="absence-application_selected pr-5"
        :class="[{ 'absence-application__selected-show': selectedAbsenceApplication.length != 0 }]"
      >
        <Checkbox
          class="w-6 h-6"
          :value="selectedAbsenceApplication.indexOf(item) > -1"
          @input="selectAbsenceApplication(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '@/components/tailwind/Checkbox'

export default {
  name: 'AbsenceApplication',
  props: {
    list: { type: Array, default: () => [] },
    selectAbsenceApplication: {
      type: Function,
      default: () => {},
    },
    selectedAbsenceApplication: { type: Array, default: () => [] },
    checked: { type: Boolean, default: false },
    showDetail: { type: Boolean, default: false },
    maxHeight: { type: String, default: 'none' },
    routeName: { type: String, default: '' },
    studentName: { type: Boolean, default: false },
    dayOff: { type: Boolean, default: false },
    dayCheck: { type: Boolean, default: false },
    teacherName: { type: Boolean, default: false },
    birthDay: { type: Boolean, default: false },
    studentNameClass: { type: String, default: '' },
  },
  computed: {
    customMaxHeight() {
      return `max-height: ${this.maxHeight} !important`
    },
  },
  components: { Checkbox },
}
</script>

<style scoped>
.absence-application_selected {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  justify-content: flex-end;
  align-items: center;
}

.absence-application__selected-show {
  display: flex;
}

.absence-application-text-color-1 {
  color: #1c1c1e;
}

.absence-application-text-color-2 {
  color: #8e8e93;
}
</style>
