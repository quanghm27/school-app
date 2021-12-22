<template>
  <ms-template :page-title="$t('Trợ giúp')" :show-bottom-nav="false" :show-drawer="false" page-type="subpage">
    <div class="container">
      <section class="setting">
        <div class="setList">
          <div class="u-box">
            <ul class="setListArea">
              <li class="setList-item">
                <a
                  href="https://trpth-my.sharepoint.com/:w:/g/personal/chien_do_tripath_vn/ESFzXeHla-REr7Cgq48vTicBiGXNxw4zkuOIcnfCEmTyxw"
                  target="_blank"
                  class="u-box-link"
                >
                  {{ $t('5 lợi ích của schools.vn') }}
                  <i class="arrow-R"></i>
                </a>
              </li>
              <li class="setList-item">
                <a
                  href="https://trpth-my.sharepoint.com/:w:/g/personal/chien_do_tripath_vn/EQljtWg7abNGiaYP6N3Ijd8BYLva493FlfhgLM_VWBnjkQ?e=ZjDsLn"
                  target="_blank"
                  class="u-box-link"
                >
                  {{ $t('Tầm nhìn của chúng tôi') }}
                  <i class="arrow-R"></i>
                </a>
              </li>
              <li class="setList-item">
                <n-link :to="{ name: loggedIn ? 'inquiry-new' : 'inquiry-new-guest' }" class="u-box-link">
                  {{ $t('Báo lỗi') }}
                  <i class="arrow-R"></i>
                </n-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="setList">
          <div class="u-box">
            <ul class="setListArea">
              <li class="setList-item">
                <a
                  href="#"
                  class="u-box-link"
                  @click="openApp('https://www.youtube.com/channel/UCQc7sx0Qe-AUa5TbBy2FYjQ')"
                >
                  {{ $t('Kênh Youtube') }}
                  <i class="arrow-R"></i>
                </a>
              </li>
              <li class="setList-item">
                <a
                  href="#"
                  class="u-box-link"
                  @click="
                    openApp(
                      `fb://${deviceInfo.os === 'ios' ? 'profile' : 'page'}/104753385020406`,
                      'https://m.facebook.com/Schoolsvn-104753385020406',
                    )
                  "
                >
                  {{ $t('Trang tin Schools.vn trên Facebook') }}
                  <i class="arrow-R"></i>
                </a>
              </li>
              <li class="setList-item">
                <a href="https://schools.vn" target="_blank" class="u-box-link">
                  {{ $t('Cộng đồng người dùng Schools.vn') }}
                  <i class="arrow-R"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section class="social">
        <a :href="`tel:${$const.HOTLINE}`" class="social-item">
          <img class="social-item--img" src="~/assets/img/social/Phone.png" />
          <span>{{ $t('Điện thoại') }}</span>
        </a>
        <a class="social-item" @click="openApp('https://zalo.me/0968334227')">
          <img class="social-item--img" src="~/assets/img/social/Zalo.png" />
          <span class="social-item--text">{{ $t('Zalo') }}</span>
        </a>
        <a
          href="#"
          class="social-item"
          @click="
            openApp(
              `fb-messenger://${deviceInfo.os === 'ios' ? 'user-thread' : 'user'}/104753385020406`,
              'https://www.messenger.com/t/104753385020406',
            )
          "
        >
          <img class="social-item--img" src="~/assets/img/social/Messenger.png" />
          <span class="social-item--text">{{ $t('Messenger') }}</span>
        </a>
      </section>
    </div>
  </ms-template>
</template>

<script>
export default {
  name: 'Support',
  layout: 'auth',
  computed: {
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    },
    loggedIn() {
      return !!this.$store.state.userInfo
    },
  },
  methods: {
    openApp(url, fallback) {
      this.$utils.app.dispatch({ type: 'OPEN_APP_LINK', payload: { url, fallback } })
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.social {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15%;
}

.social-item {
  display: flex;
  flex-direction: column;
}

.social-item--img {
  max-width: 3em;
  max-height: 3em;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

.social-item--text {
  text-align: center;
}

.setting {
  margin-top: 10%;
}

.setList-item {
  border-top: none;
  margin: 10px 0;
}

.setList-item .arrow-R:before,
.setList-item .arrow-R:after {
  background-color: #363853;
}
</style>
