<template>
  <div class="pr-4 pt-4">
    <div class="mb-4" @click="isSelectedAll = true">Chọn tất cả</div>
    <v2-announcement-card :is-selected.sync="isSelected" :is-delete.sync="isDelete" />
    <div class="my-20 text-gray-4 text-center flex justify-center">
      <p class="w-1/2">
        Chỉ hiển thị thông báo trong vòng 1 năm gần đây
      </p>
    </div>
  </div>
</template>

<script>
import V2AnnouncementCard from './AnnouncementCard'
export default {
  name: 'V2TabSchool',
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  components: { V2AnnouncementCard },
}
</script>

<style scoped></style>
