<template>
  <div class="notice">
    <div class="u-middle">
      <i class="icoNoti-err500"></i>
      <h2 class="notice-title">{{ $t('text_error_500_title') }}</h2>
      <p class="notice-txt">{{ $t('text_error_504_sub') }}</p>
      <div class="main-action">
        <a href="#" @click.prevent="goBack" class="notice-link">{{ $t('btn_back') }}</a>
      </div>
      <div class="main-action">
        <a href="#" @click.prevent="goHome" class="notice-link">{{ $t('btn_home') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ServerErrorPage',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>
