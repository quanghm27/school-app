<template>
  <ms-popup :show="value" v-on="$listeners" type="custom" @close="$emit('input', false)">
    <div class="pt-5">
      <div class="text-center">
        {{ $t('Sau khi lưu điểm bạn có muốn gửi thông báo cho phụ huynh không') }}
      </div>
      <!--      <div class="py-2 px-3 bg-gray-F9F9F9 rounded mt-2 text-center font-medium">-->
      <!--        {{ $t('Bài kiểm tra thường xuyên số 1 đã có kết quả. Vui lòng truy cập school.vn để xem chi tiết!') }}-->
      <!--      </div>-->
    </div>
    <template #main-action>
      <div class="px-4 flex">
        <button class="flex-1 bg-white rounded-md p-4 text-[16px] font-bold" @click="$emit('reject')">
          Không
        </button>
        <button class="flex-1 bg-teacher rounded-md text-white p-4 text-[16px] font-bold" @click="$emit('accept')">
          Đồng ý
        </button>
      </div>
    </template>
  </ms-popup>
</template>

<script>
export default {
  name: 'ConfirmScoreNotificationPopup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
