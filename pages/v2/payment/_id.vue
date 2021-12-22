<template>
  <v2-template>
    <v2-header slot="header" title="Thông tin chuyển khoản" />
    <div class="pr-4" slot="content">
      <div class="font-medium text-gray-2 mb-4">
        Bạn cần sử dụng ứng dụng Ngân hàng để chuyển khoản tới số tài khoản của trường THPT Nguyễn Trãi
      </div>
      <div class="mb-6">
        <div class="font-bold text-gray-3 text-[16px] mb-2.5">Số tiền</div>
        <div class="flex items-center">
          <div class="font-bold text-primary text-xl">
            <span>
              2,305,000 VNĐ
              <n-icon class="w-5 h-5 ml-5" icon="plus" />
            </span>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <div class="font-bold text-gray-3 text-[16px] mb-2.5">Số tài khoản - BIDV</div>
        <div class="flex items-center">
          <div class="font-bold text-primary text-xl">
            <span>
              983284382343
              <n-icon class="w-5 h-5 ml-5" icon="plus" />
            </span>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <div class="font-bold text-gray-3 text-[16px] mb-2.5">Người nhận</div>
        <div class="flex items-center">
          <div class="font-bold text-primary text-xl">
            <span>
              Trường THPT Nguyễn Trãi
              <n-icon class="w-5 h-5 ml-5" icon="plus" />
            </span>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <div class="font-bold text-gray-3 text-[16px] mb-2.5">Nội dung chuyển khoản</div>
        <div class="flex items-center">
          <div class="font-bold text-primary text-xl">
            <span>
              Mai Thị Linh - 10A1 - 02082005 asdas asudfa s
              <n-icon class="w-5 h-5 ml-5" icon="plus" />
            </span>
          </div>
        </div>
      </div>
      <div class="mb-6 text-gray-2 font-medium">
        <span>
          Thiếu thông tin này Trường THPT Nguyễn Trãi sẽ không thể nhận ra thông tin chuyển khoản từ
          <span class="text-primary">Mai Thị Linh</span>.
        </span>
      </div>
      <div class="absolute bottom-0 left-0 p-4 w-full">
        <div
          @click="$router.push({ name: 'v2-home' })"
          class="p-4 bg-primary flex items-center justify-center rounded-md text-white"
        >
          <div class="text-[16px] font-medium">Trang chủ</div>
        </div>
      </div>
    </div>
  </v2-template>
</template>

<script>
export default {
  name: 'Id',
}
</script>

<style scoped></style>
