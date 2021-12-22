<template>
  <div class="setIco">
    <h3 class="set-title" :class="!isDrawer ? '!text-2xl' : ''">{{ $t('text_all_service') }}</h3>
    <div class="u-box">
      <div class="row">
        <div class="col-1-3" v-for="service in listServices" :key="service.key" @click="hideDrawer">
          <nuxt-link v-if="service.key !== 'ybm'" :to="service.path" class="u-box-link">
            <i :class="service.icon"></i>
            <p class="setIco-txt">{{ service.title }}</p>
          </nuxt-link>
          <!--          TODO YBM-->
          <nuxt-link v-else class="u-box-link" to="#" @click.native="redirect">
            <i :class="service.icon"></i>
            <p class="setIco-txt">{{ service.title }}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { menuMixin } from '~/mixins/menu'

export default {
  name: 'MsServicesList',
  mixins: [menuMixin],
  props: {
    isDrawer: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async redirect() {
      const { DATA, RESULT } = await this.$api.auth.GET_YBM_TOKEN()

      if (RESULT !== 'SUCCESS') {
        console.error('GET_YBM_TOKEN FAIL!')
        return
      }

      window.location.href = `${this.$config.ybmSite}?jwt=${DATA.JWT}`
    },
    hideDrawer() {
      if (this.isDrawer) {
        this.$emit('hide')
        document.body.classList.remove('is-showMenu')
      }
    },
  },
}
</script>

<style scoped></style>
