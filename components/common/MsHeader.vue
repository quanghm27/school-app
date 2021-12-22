<template>
  <header class="main-header" :style="{ paddingTop: `${deviceInfo.statusBarHeight}px` }">
    <div class="headerArea">
      <h1 class="main-title">{{ pageTitle }}</h1>

      <slot name="headerLeft" v-if="hasLeftSlot" />
      <template v-else>
        <!--        <a href="#" v-if="leftDefault === 'drawer'" @click.prevent="showDrawer" class="icoApp-hamberger"></a>-->
        <ms-back v-if="leftDefault === 'back'" />
      </template>

      <!--      <template v-if="pageType === 'home'">-->
      <!--        <n-link :to="{ name: 'alarm' }" class="icoApp-bell">-->
      <!--          <i class="number-noti" v-if="alarmCount">-->
      <!--            <span v-text="alarmCount" />-->
      <!--          </i>-->
      <!--        </n-link>-->
      <!--        <n-link :to="{ name: 'setting' }" class="icoApp-setting"></n-link>-->
      <!--      </template>-->

      <slot name="headerRight" />
      <ms-close v-if="rightDefault === 'close'" />
    </div>
    <slot name="headerBottom" />
  </header>
</template>

<script>
export default {
  name: 'MSHeader',
  data() {
    return {
      alarmCount: null,
    }
  },
  props: {
    // home, submain, subpage
    pageType: {
      type: String,
      required: true,
    },
    pageTitle: {
      type: String,
      required: true,
    },
    leftDefault: {
      type: String,
      required: true,
    },
    rightDefault: {
      type: String,
      required: true,
    },
  },
  computed: {
    hasLeftSlot() {
      return !!this.$slots.headerLeft
    },
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    },
  },
  async fetch() {
    // Fetch notifications
    if (this.pageType === 'home') {
      const { DATA } = await this.$api.alarm.GET_ALARM_UNREAD_TOTAL()
      this.alarmCount = DATA
    }
  },
  methods: {
    showDrawer() {
      this.$utils.app.dispatch({ type: 'SET_BAR_STYLE', payload: 'light-content' })
      document.body.classList.toggle('is-showMenu')
    },
  },
}
</script>
