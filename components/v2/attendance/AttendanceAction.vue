<template>
  <div class="mt-auto">
    <div
      class="flex w-full justify-between mt-auto mb-8 attendance-action"
      :class="[{ 'attendance-action__show': alwaysShow || selectedAbsenceApplication.length > 0 }]"
    >
      <slot name="action-control">
        <button class="attendance-action__btn attendance-action__btn__btn-3" @click="cancel">Hủy đơn</button>
        <button class="attendance-action__btn attendance-action__btn__btn-2" @click="approve">Duyệt đơn</button>
      </slot>
    </div>
    <ms-popup
      type="v2-confirm"
      :show="showConfirmPopup"
      :cbClose="closePopup"
      :cbConfirm="action.callback"
      :title="action.title"
    ></ms-popup>
  </div>
</template>

<script>
import MsPopup from '@/components/common/MsPopup'

export default {
  name: 'AttendanceAction',
  components: { MsPopup },
  props: {
    selectedAbsenceApplication: {
      type: Array,
      default: () => [],
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showConfirmPopup: false,
      actions: {
        confirm: {
          callback: () => {
            this.apiCall()
          },
          title: 'Bạn muốn duyệt đơn này ?',
        },
        cancel: {
          callback: () => {
            this.apiCall()
          },
          title: 'Bạn muốn hủy đơn này ?',
        },
      },
      action: {},
    }
  },
  methods: {
    cancel() {
      this.showConfirmPopup = true
      this.action = this.actions.cancel
    },
    approve() {
      this.showConfirmPopup = true
      this.action = this.actions.confirm
    },
    apiCall(action) {
      alert('Chưa gắng api')
    },
    closePopup() {
      this.showConfirmPopup = false
    },
  },
}
</script>

<style scoped>
.attendance-action__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  width: 168px;
}

.attendance-action__btn__btn-2 {
  height: 56px;
  background-color: #ee493d;
  border-radius: 4px;
}

.attendance-action__btn__btn-3 {
  height: 56px;
  border-radius: 4px;
  color: #8e8e93;
  border: 1px solid #8e8e93;
  background-color: #fff;
}

.attendance-action {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s, opacity 0.3s linear;
}

.attendance-action__show {
  visibility: visible;
  opacity: 1;
}
</style>
