<template>
  <div class="ms-wrapper">
    <div :class="`page page-${pageType} ${pageClass}`">
      <ms-header
        v-if="isHeader"
        :page-type="pageType"
        :page-title="pageTitle"
        :left-default="defaultHeaderLeft"
        :right-default="defaultHeaderRight"
      >
        <slot name="headerLeft" slot="headerLeft" />
        <slot name="headerRight" slot="headerRight" />
        <slot name="headerBottom" slot="headerBottom" />
      </ms-header>
      <ms-pull-to-refresh
        id="main-scroll"
        class="main-container"
        :style="{
          position: showPopup ? 'initial' : '',
          overflowY: contentSrollable ? 'auto' : 'hidden',
          padding: !isHeader && 0,
        }"
        :on-refresh="onRefresh"
      >
        <slot name="content" />
        <slot />
      </ms-pull-to-refresh>
      <slot name="bottom" />
      <!--      <div-->
      <!--        v-if="showBottomNav"-->
      <!--        :style="{ paddingBottom: deviceInfo.bottomSpace ? `${deviceInfo.bottomSpace}px` : '0.82em' }"-->
      <!--      >-->
      <!--        <ms-bottom-nav />-->
      <!--      </div>-->
      <div v-if="showBottomNav">
        <ms-bottom />
      </div>
    </div>
    <!--    <ms-drawer v-if="showDrawer" @hide="$utils.app.dispatch({ type: 'SET_BAR_STYLE', payload: statusBarStyle })" />-->

    <!-- Global notify -->
    <ms-popup
      :title="popupInfo.title"
      :show="popupInfo.visible"
      @close="closePopup"
      :z-index="51"
      :cbConfirm="popupInfo.cbConfirm"
      :cbClose="popupInfo.cbClose"
      :type="popupInfo.errors ? 'error' : popupInfo.type"
    >
      <p
        :class="[{ 'pop-note': popupInfo.type === 'error' }]"
        v-if="popupInfo.message"
        v-html="$utils.common.nl2br(popupInfo.message)"
      />
      <p class="pop-note" v-if="popupInfo.errors">
        <template v-for="(err, errKey) in popupInfo.errors">
          <span :key="errKey">
            {{ err }}
            <br />
          </span>
        </template>
      </p>
    </ms-popup>

    <portal-target name="v2-rating" multiple />
    <portal-target name="popup" multiple />
    <portal-target name="popup-full" multiple />
    <portal-target name="banner" multiple />
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'MsTemplate',
  props: {
    isHeader: {
      type: Boolean,
      required: false,
      default: true,
    },
    pageType: {
      type: String,
      required: false,
      default: 'submain',
    },
    pageTitle: {
      type: String,
      required: false,
      default: 'Schools.vn',
    },
    defaultHeaderLeft: {
      type: String,
      required: false,
      default: 'back',
    },
    defaultHeaderRight: {
      type: String,
      required: false,
      default: '',
    },
    pageClass: {
      type: String,
      required: false,
      default: '',
    },
    showBottomNav: {
      type: Boolean,
      required: false,
      default: true,
    },
    showDecor: {
      type: Boolean,
      required: false,
      default: false,
    },
    showDrawer: {
      type: Boolean,
      required: false,
      default: true,
    },
    statusBarStyle: {
      type: String,
      required: false,
      default: 'dark-content',
    },
    contentSrollable: {
      type: Boolean,
      required: false,
      default: true,
    },
    onRefresh: {
      type: Function,
      required: false,
      default: null,
    },
  },
  computed: {
    ...mapState(['popupInfo', 'showPopup']),
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    },
  },
  watch: {
    popupInfo: {
      handler: newValue => {},
      deep: true,
    },
  },
  created() {
    this.$utils.app.dispatch({ type: 'SET_BAR_STYLE', payload: this.statusBarStyle })
  },
  methods: {
    closePopup() {
      this.$notify.hide()
    },
  },
}
</script>
