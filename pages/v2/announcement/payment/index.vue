<template>
  <v2-announcement-layout
    :announce-list="announceList"
    :is-delete.sync="isDelete"
    :selected-list.sync="selectedList"
    @remove="actionRemove"
    :is-loading="$fetchState.pending"
  >
    <div slot="headerContent" class="p-3 mb-2 flex items-center ju rounded-md justify-between bg-white shadow-card">
      <div class="flex items-center">
        <n-icon icon="money" class="w-6 h-6 mr-1"></n-icon>
        <p class="text-gray-2 text-xs">Số tiền cần nộp</p>
      </div>
      <div class="flex items-center" @click="$router.push({ name: 'v2-payment' })">
        <p class="text-gray-5 uppercase">VND</p>
        <p class="ml-1 text-green-25AF0E font-bold">{{ amount | formatMoneyVND(false) }}</p>
        <n-icon icon="chevron-right" class="w-4 h-4 ml-3"></n-icon>
      </div>
    </div>
  </v2-announcement-layout>
</template>

<script>
import { announceMixin } from '../../../../mixins/announce'

export default {
  name: 'Index',
  mixins: [announceMixin],
  data() {
    return {
      amount: null,
    }
  },
  async fetch() {
    const { DATA } = await this.$api.announce.SEARCH_ANNOUNCE()
    this.announceList = DATA.ITEMS.filter(item => item.PAYMENT)
    this.amount = DATA.AMOUNT
  },
}
</script>

<style scoped>
.shadow-card {
  box-shadow: 0 4px 12px 2.29042px rgba(238, 73, 61, 0.02);
}
</style>
