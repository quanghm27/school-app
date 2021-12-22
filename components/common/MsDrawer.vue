<template>
  <div class="page showMenu">
    <div class="decoration">
      <i class="deco deco-1"></i>
      <i class="deco deco-2"></i>
    </div>
    <header class="main-header" :style="{ paddingTop: `${deviceInfo.statusBarHeight}px` }">
      <div class="headerArea">
        <a @click.prevent="hideDrawer" class="icoApp-menuClose"></a>
      </div>
    </header>
    <div class="main-container" v-if="userInfo">
      <!-- User Info -->
      <div class="setPerson" @click.prevent="() => redirect('/setting')">
        <a href="#" class="person-name" v-text="userInfo.USER_NAME" />
        <p>
          {{ $t(`text_${userRole}`) | capitalized }}
          <span class="person-sysID" v-text="userInfo.USER_ID" />
        </p>
      </div>

      <!-- Amount -->
      <div class="setPay" v-if="userInfo.AMOUNT">
        <div class="u-box">
          <a href="#" class="u-box-link">
            <div class="payNoti">
              <p class="pay-txt">{{ $t('text_amount_pay') }}</p>
              <p class="pay-cost c-role">{{ userInfo.AMOUNT | formatMoneyVND }}</p>
              <!-- <i class="arrow-R"></i> -->
            </div>
          </a>
        </div>
      </div>

      <!-- Service List -->
      <ms-services-list :is-drawer="true" />

      <div class="setOther">
        <div class="setOtherArea">
          <a :href="$config.brandSite" target="_blank">{{ $t('btn_schools') }}</a>
          <i class="u-space"></i>
          <n-link :to="{ name: 'inquiry-new' }" @click.native="hideDrawer">
            {{ $t('Trợ giúp') }}
          </n-link>
        </div>
        <a href="#" class="set-logout" @click.prevent="logout">{{ $t('btn_logout') }}</a>
        <div class="version">
          <p class="version-txt">{{ $appVersion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { menuMixin } from '~/mixins/menu'
import { ROLE, ROLES, APP_INFO } from '~/constants'
import MsServicesList from '~/components/common/MsServicesList'

export default {
  name: 'MSDrawer',
  mixins: [menuMixin],
  components: { MsServicesList },
  data() {
    return {
      ROLE,
      ROLES,
    }
  },
  computed: {
    ...mapState(['userInfo']),
    rolesWithoutStudent() {
      return ROLES.filter(e => e.name !== ROLE.STUDENT)
    },
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    },
  },
  methods: {
    switchRole(roleID) {
      const role = ROLES.find(e => e.id === roleID)

      if (this.userRole === role.name) {
        return
      }

      if (this.userInfo.LIST_ROLE.includes(roleID)) {
        this.$notify.show(
          {
            title: this.$t(`pop_confirm_move_to_${role.name}_service_title`),
            message: this.$t(`pop_confirm_move_to_${role.name}_service_msg`),
            cbConfirm: async () => {
              const { RESULT } = await this.$api.user.SWITCH_SERVICE(role.type)
              if (RESULT === 'SUCCESS') {
                if (this.$route.name !== 'index') {
                  this.$router.push('/', () => {
                    window.location.reload()
                  })
                }
                window.location.reload()
              }
            },
          },
          'confirm',
        )
        return
      }

      this.$router.push({ name: 'auth-login-qr' })
    },

    hideDrawer() {
      this.$emit('hide')
      document.body.classList.remove('is-showMenu')
    },
    logout() {
      this.$store.dispatch('logout')
    },
    redirect(url) {
      this.hideDrawer()
      this.$router.push(url)
    },
  },
  created() {
    this.version = localStorage.getItem(APP_INFO) || ''
  },
}
</script>

<style>
.setRoleArea a {
  width: 25%;
}
</style>
