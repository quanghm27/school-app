<template>
  <header class="relative">
    <div
      class="flex justify-center "
      :style="{
        paddingTop: `${statusBarHeight + 8}px`,
      }"
    >
      <button class="button-back absolute p-2 left-2 top-2">
        <img src="~/assets/img/icoBack.png" alt="back" class="icon-back" />
      </button>
      <img src="~/assets/img/logo.png" alt="logo" class="app-logo" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'AuthHeader',
  computed: {
    statusBarHeight() {
      return this.$store.state.device.deviceInfo.statusBarHeight || 0
    },
  },
}
</script>

<style scoped>
/*.button-back {*/
/*  position: absolute;*/
/*  padding: 12px;*/
/*  left: 20px;*/
/*  bottom: 25px;*/
/*}*/
.icon-back {
  width: 16px;
  height: 16px;
}
.app-logo {
  z-index: 1;
  height: 64px;
}
.background-image {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #3d4fa4;
}
</style>
