<template>
  <ms-template default-header-left="drawer" :page-title="$t('menu_setting')">
    <ms-spinner v-if="$fetchState.pending" />
    <section class="setting" v-else>
      <div class="setList">
        <h3 class="set-title">{{ $t('text_account_setting') }}</h3>
        <div class="u-box">
          <ul class="setListArea">
            <li class="setList-item">
              <n-link :to="{ name: 'setting-my-information' }" class="u-box-link">
                {{ $t('btn_personal_information') }}
                <i class="arrow-R"></i>
              </n-link>
            </li>
            <li class="setList-item">
              <n-link :to="{ name: 'setting-nickname' }" class="u-box-link">
                {{ $t('btn_nickname_setting') }}
                <i class="arrow-R"></i>
              </n-link>
            </li>
            <li class="setList-item">
              <div class="switch">
                <p class="switch-txt">{{ $t('text_auto_login_setting') }}</p>
                <ms-toggle v-model="userSetting.autoLogin" @input="handleAutoLoginChange" />
              </div>
            </li>
            <li class="setList-item">
              <a href="#" class="u-box-link" @click="logout">
                {{ $t('btn_logout') }}
                <i class="arrow-R"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="setList">
        <h3 class="set-title">{{ $t('text_payment_setting') }}</h3>
        <div class="u-box">
          <ul class="setListArea">
            <li class="setList-item">
              <n-link :to="{ name: 'setting-payment' }" class="u-box-link">
                {{ $t('btn_payment_management') }}
                <i class="arrow-R"></i>
              </n-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="setList">
        <h3 class="set-title">{{ $t('text_push_alarm_setting') }}</h3>
        <div class="u-box">
          <ul class="setListArea">
            <li class="setList-item">
              <div class="switch">
                <p class="switch-txt">{{ $t('text_receive_ad_information') }}</p>
                <ms-toggle v-model="setting.IS_RECEIVE_ADVERTISING" @input="handleReceiveAdChange" />
              </div>
              <p class="switch-note" v-html="$utils.common.nl2br($t('text_guide_ad_push'))" />
            </li>
            <li class="setList-item">
              <div class="switch">
                <p class="switch-txt">{{ $t('text_school_push_receive') }}</p>
                <ms-toggle v-model="setting.IS_RECEIVE_SCHOOL" @input="handleReceiveSchoolChange" />
              </div>
              <p class="switch-note" v-html="$utils.common.nl2br($t('text_guide_school_push'))" />
            </li>
          </ul>
        </div>
      </div>
      <div class="setList" v-if="userRole === ROLE.PARENT">
        <h3 class="set-title">{{ $t('text_children_setting') }}</h3>
        <div class="u-box">
          <ul class="setListArea">
            <li class="setList-item">
              <nuxt-link :to="{ name: 'setting-manage-children' }" class="u-box-link">
                {{ $t('btn_children_management') }}
                <i class="arrow-R"></i>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="setList">
        <h3 class="set-title">{{ $t('text_inquiry') }}</h3>
        <div class="u-box">
          <ul class="setListArea">
            <li class="setList-item">
              <nuxt-link :to="{ name: 'inquiry-new' }" class="u-box-link">
                {{ $t('Trợ giúp') }}
                <i class="arrow-R"></i>
              </nuxt-link>
            </li>
            <li class="setList-item">
              <nuxt-link :to="{ name: 'inquiry' }" class="u-box-link">
                {{ $t('btn_inquiry_history') }}
                <i class="arrow-R"></i>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="setList">
        <h3 class="set-title">{{ $t('text_information_version') }}</h3>
        <div class="u-box">
          <ul class="setListArea">
            <li class="setList-item">
              <div class="updateStatus is-active">
                <p class="update-txt">{{ $t('text_version_present') }}: {{ $appVersion }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </ms-template>
</template>

<script>
import { mapState } from 'vuex'
import { USER_SETTING, ACCESS_TOKEN } from '@/constants'

export default {
  data() {
    return {
      ROLE: this.$const.ROLE,
      userSetting: null,
      setting: {
        IS_RECEIVE_ADVERTISING: false,
        IS_RECEIVE_SCHOOL: false,
      },
    }
  },
  computed: {
    ...mapState(['userRole']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    handleAutoLoginChange(val) {
      const token = this.$cookiz.get(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN)

      if (val) {
        this.$cookiz.set(ACCESS_TOKEN, token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        })
        sessionStorage.removeItem(ACCESS_TOKEN)
        this.userSetting.autoLogin = true
      } else {
        this.$cookiz.remove(ACCESS_TOKEN)
        sessionStorage.setItem(ACCESS_TOKEN, token)
        this.userSetting.autoLogin = false
      }
      this.$utils.app.dispatch({ type: 'FLUSH_COOKIES' })

      localStorage.setItem(USER_SETTING, JSON.stringify(this.userSetting))
    },
    handleReceiveAdChange(val) {
      this.$api.setting.RECEIVE_ADVERTISING({
        IS_RECEIVE_ADVERTISING: val,
      })
    },
    handleReceiveSchoolChange(val) {
      this.$api.setting.RECEIVE_INFO_SCHOOL({
        IS_RECEIVE_SCHOOL: val,
      })
    },
  },
  async fetch() {
    const { DATA } = await this.$api.setting.GET_SETTING_INFO()
    const userSetting = JSON.parse(localStorage.getItem(USER_SETTING))

    this.setting = DATA
    this.userSetting = userSetting || {}
  },
}
</script>
