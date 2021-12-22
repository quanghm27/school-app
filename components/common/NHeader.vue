<template>
  <header
    class="grid grid-cols-5 pt-4"
    :style="{ paddingTop: `${$store.state.device.deviceInfo.statusBarHeight + 10}px` }"
  >
    <div class="flex justify-start items-center">
      <slot name="headerLeft">
        <n-icon v-if="leftDefault === 'drawer'" icon="menu"></n-icon>
        <n-icon v-if="leftDefault === 'back'" icon="arrow_back_ios" @click="back"></n-icon>
      </slot>
    </div>
    <div class="flex justify-center items-center col-span-3 min-h-[60px]">
      <slot>
        <img src="~/assets/img/next/logo.svg" alt="logo" />
      </slot>
    </div>
    <div class="flex justify-end items-center">
      <slot name="headerRight">
        <n-link v-if="rightDefault === 'help'" :to="{ name: 'inquiry-new' }" class="text-white font-bold no-underline">
          {{ $t('Trợ giúp') }}
        </n-link>
      </slot>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    leftDefault: {
      type: String,
      default: 'back',
    },
    rightDefault: {
      type: String,
      default: 'help',
    },
  },
  methods: {
    back() {
      this.$router.back()
    },
  },
}
</script>
