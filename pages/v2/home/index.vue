<template>
  <v2-template>
    <template slot="header">
      <home-header />
    </template>
    <template slot="content">
      <home-status />
      <home-service v-model="listServices" />
      <home-notification />
      <home-utilities v-model="utility" />
    </template>
  </v2-template>
</template>

<script>
import HomeHeader from '../../../components/v2/home/HomeHeader'
import HomeStatus from '../../../components/v2/home/HomeStatus'
import HomeService from '../../../components/v2/home/HomeService'
import HomeNotification from '../../../components/v2/home/HomeNotification'
import HomeUtilities from '../../../components/v2/home/HomeUtilities'
import V2Template from '../../../components/common/V2Template'
import { loginMixin, themeMixin, menuMixin } from '@/mixins'
export default {
  components: { V2Template, HomeUtilities, HomeNotification, HomeService, HomeStatus, HomeHeader },
  mixins: [loginMixin, themeMixin, menuMixin],
  data() {
    return {
      utility: [],
    }
  },
  async fetch() {
    const { DATA } = await this.$api.user.GET_AVAIL_EXT_SERVICE()
    const serviceIcons = DATA.map(d => d.SERVICE_ICON)

    this.utility = this.listUtilities.filter(item => {
      if (serviceIcons.includes(item.icon)) {
        item.isShow = true
      }
      return item.isShow
    })
  },
}
</script>
