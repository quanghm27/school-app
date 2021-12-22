<template>
  <v2-template :show-bottom-nav="false">
    <v2-header slot="header" title="Các khoản cần nộp"> </v2-header>
    <div slot="content" class="pr-4">
      <div class="mb-24">
        <div class="overflow-x-auto flex w-full scrollbar overflow-hidden">
          <div class="flex flex-nowrap items-center mb-4 w-max">
            <div class="p-2 px-5 bg-gray-5 text-gray-4 rounded-md mr-2 min-w-[50%] text-center">Trương Minh Trọng</div>
            <div class="p-2 px-5 bg-primary text-white rounded-md mr-2 min-w-[50%] text-center">Trương Trọng Nghĩa</div>
          </div>
        </div>
        <div class="p-4 bg-white flex items-center justify-between mb-4 rounded-md">
          <div class="flex-1">
            <div class="font-bold text-xs text-gray-2 mb-5">Cắm trại mùa xuân học kỳ I năm học 2020</div>
            <div>
              <span class="text-gray-5 uppercase">
                VND
                <span class="font-bold text-[16px] text-primary">{{ 2305000 | formatMoneyVND }}</span>
              </span>
            </div>
          </div>
          <div class="ml-2"><v2-checkbox v-model="checked" /></div>
        </div>
        <div class="p-4 bg-white flex items-center justify-between mb-4 rounded-md">
          <div class="flex-1">
            <div class="font-bold text-xs text-gray-2 mb-5">Học phí tháng 08/2021</div>
            <div>
              <span class="text-gray-5 uppercase">
                VND
                <span class="font-bold text-[16px] text-primary">{{ 2305000 | formatMoneyVND }}</span>
              </span>
            </div>
          </div>
          <div class="ml-2"><v2-checkbox v-model="checked" /></div>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 p-4 w-full">
        <div
          @click="$router.push({ name: 'v2-payment-id', params: { id: 1 } })"
          class="p-4 bg-primary flex items-center justify-between rounded-md text-white"
        >
          <div class="text-[16px] font-medium">Thanh toán</div>
          <div class="text-[16px] font-medium">234234234</div>
        </div>
      </div>
    </div>
  </v2-template>
</template>

<script>
import V2Template from '../../../components/common/V2Template'
import V2Header from '../../../components/common/V2Header'
import V2Checkbox from '../../../components/common/V2Checkbox'
export default {
  name: 'Index',
  components: { V2Checkbox, V2Header, V2Template },
  data() {
    return {
      checked: false,
      childs: null,
    }
  },
}
</script>

<style scoped></style>
