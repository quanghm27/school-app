<template>
  <div class="flex-1 flex flex-col items-center mt-20">
    <n-icon icon="announce-empty" class="w-[160px] h-[160px] mb-4"></n-icon>
    <h2 class="text-[16px] mb-2 text-center">Không có thông báo nào</h2>
    <h3 class="max-w-[65%] mx-auto text-center">
      {{ `Thông báo chỉ được lưu tối đa trong vòng ${router === 'common' ? '30 ngày' : '1 năm'}` }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'V2AnnouncementEmpty',
  inject: ['router'],
}
</script>

<style scoped></style>
