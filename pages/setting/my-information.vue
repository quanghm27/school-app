<template>
  <ms-template :page-title="$t('menu_personal_information')" default-header-left="back">
    <ms-spinner v-if="$fetchState.pending" align="center" />
    <section class="myinfo" v-else>
      <div class="u-pic" :style="`background-image: url(${avatar})`"></div>
      <div class="myinfoBox">
        <div class="myinfoTop">
          <p class="person-name">{{ myInfo.NAME }}</p>
          <p class="person-sysID">{{ myInfo.LOGIN_ID }}</p>
          <template v-if="isStudent">
            <a href="#" class="person-qr"><i class="icoApp-qr" @click.prevent="showQrCode = !showQrCode"></i></a>
            <p class="person-qr-txt">{{ $t('menu_qr') }}</p>
          </template>
        </div>
        <div class="myinfoArea">
          <ul class="u-tb">
            <li>{{ $t('text_nickname') }}</li>
            <li>
              {{ myInfo.NICK_NAME }}
              <nuxt-link :to="{ name: 'setting-nickname' }" class="btn-change">
                {{ $t('btn_update') }}
              </nuxt-link>
            </li>
          </ul>
          <ul class="u-tb">
            <li class="myinfo-bd">{{ $t('text_birthday') }}</li>
            <li>{{ $utils.datetime.formatStandardDate(myInfo.BIRTHDAY) }}</li>
          </ul>
          <ul class="u-tb">
            <li>{{ $t('text_phone') }}</li>
            <li>{{ myInfo.TEL_NO }}</li>
          </ul>
          <ul class="u-tb">
            <li>{{ $t('text_email') }}</li>
            <li>{{ myInfo.EMAIL }}</li>
          </ul>
          <ul class="u-tb">
            <li>{{ $t('text_address') }}</li>
            <li>{{ myInfo | addressInfo }}</li>
          </ul>
        </div>
      </div>
      <a href="#" @click.prevent="logout" class="myinfo-logout">{{ $t('btn_logout') }}</a>
    </section>

    <!-- Popup QR Code -->
    <ms-popup-full v-model="showQrCode" v-if="isStudent" :title="$t('menu_qr')">
      <div class="img-F">
        <div class="u-middle">
          <canvas ref="canvas" />
        </div>
      </div>
    </ms-popup-full>
  </ms-template>
</template>

<script>
import { mapState } from 'vuex'
import QRCode from 'qrcode'
import { ROLE } from '@/constants'

const WIDTH_QR_CODE = 250

export default {
  data() {
    return {
      myInfo: null,
      showQrCode: false,
    }
  },
  computed: {
    ...mapState(['userRole']),
    isStudent() {
      return this.userRole === ROLE.STUDENT
    },
    avatar() {
      return this.myInfo.IMG_URL || '../../img/default_' + this.$store.state.userRole + '.jpg'
    },
  },
  filters: {
    addressInfo(value) {
      if (!value) return ''

      const address = []

      if (value.ADDR_DETAIL) {
        address.push(value.ADDR_DETAIL)
      }

      if (value.DISTRICT_NAME) {
        address.push(value.DISTRICT_NAME)
      }

      if (value.PROVINCE_NAME) {
        address.push(value.PROVINCE_NAME)
      }

      return address.join(', ')
    },
  },
  async fetch() {
    const { DATA } = await this.$api.setting.GET_MY_INFO()
    this.myInfo = DATA

    if (this.isStudent) {
      this.genQrCode(this.myInfo)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    genQrCode(myInfo) {
      const str = [myInfo.SID, myInfo.NAME, myInfo.BIRTHDAY, myInfo.SECRET_KEY].join('|')

      QRCode.toCanvas(this.$refs.canvas, str, { width: WIDTH_QR_CODE }, err => {
        if (err) {
          alert('error')
          console.error(err)
        }
      })
    },
  },
}
</script>
