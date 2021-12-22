<template>
  <v2-template class-content="pr-4" :show-bottom-nav="false">
    <template slot="header">
      <v2-header title="Quá trình điểm danh"></v2-header>
    </template>
    <template slot="content">
      <div class="attendance-history__item pl-4 pr-5 py-2 mb-2" v-for="item in 5" :key="item">
        <div class="flex-1">
          <div class="font-bold leading-6 text-[16px] attendance-history__text-color-1">Lớp 10A4</div>
          <div class="font-normal leading-5 text-[12px] ">Sỹ số: 32</div>
        </div>
        <n-link :to="{ name: 'v2-attendance-history-class-id', params: { id: item } }" :key="item.id">
          <n-icon icon="chevron-right" class="w-[14px] h-[14px] attendance-history__text-color-2"></n-icon>
        </n-link>
      </div>
    </template>
  </v2-template>
</template>

<script>
import V2Template from '@/components/common/V2Template'
import V2Header from '@/components/common/V2Header'

export default {
  name: 'Index',
  components: { V2Template, V2Header },
}
</script>

<style scoped>
.attendance-history__item {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
}
.attendance-history__text-color-1 {
  color: #1c1c1e;
}
.attendance-history__text-color-2 {
  color: #8e8e93;
}
</style>
