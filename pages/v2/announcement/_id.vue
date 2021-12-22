<template>
  <v2-template :show-bottom-nav="false" class-content="!p-0 !bg-white">
    <v2-header slot="header" title="Chi tiết thông báo">
      <template slot="left">
        <n-icon icon="chevron-left" @click="$router.back()"></n-icon>
      </template>
    </v2-header>
    <div slot="content">
      <div v-if="!$fetchState.pending">
        <div class="flex flex-col items-center justify-center">
          <img src="~/assets/img/announce-banner.png" alt="" width="100%" class="bg-cover" />
          <div class="announce-detail-logo">
            <img :src="detail.SCHOOL_IMG || require('~/assets/img/logo-school.png')" alt="" class="bg-cover" />
          </div>
        </div>
        <div class="my-2 px-4 text-center bg-white">
          <h2 class="text-xl mb-2 leading-[150%]">{{ detail.TITLE | capitalized }}</h2>
          <p class="text-gray-4 text-xs">Ngày đăng : {{ detail.DATE | formatDates('DD/MM/YYYY') }}</p>
        </div>
        <div class="h-2 w-full bg-gray-F9F9F9"></div>
        <div v-html="detail.CONTENT" class="p-4 text-xs text-gray-3" />
      </div>
    </div>
  </v2-template>
</template>

<script>
import V2Template from '../../../components/common/V2Template'
import V2Header from '../../../components/common/V2Header'

export default {
  name: 'Id',
  components: { V2Header, V2Template },
  data() {
    return {
      detail: null,
    }
  },
  async fetch() {
    const { DATA } = await this.$api.announce.GET_DETAIL_ANNOUNCE({ ANNOUNCE_ID: this.$route.params.id })
    this.detail = DATA
  },
}
</script>

<style scoped>
.announce-detail-logo {
  @apply h-20 w-20 bg-white -mt-10 rounded p-2 flex items-center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
