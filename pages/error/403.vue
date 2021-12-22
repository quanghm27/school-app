<template>
  <div class="notice">
    <div class="u-middle">
      <i class="icoNoti-invalid"></i>
      <!-- TODO -->
      <!-- <h2 class="notice-title">{{ $t('msg_invalid_usergroup') }}</h2>
      <p class="notice-txt">You have no access to this page.</p> -->
      <p class="notice-txt" v-html="$utils.common.nl2br($t('msg_invalid_usergroup'))" />
      <div class="main-action">
        <a href="#" @click.prevent="goBack" class="notice-link">{{ $t('btn_back') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Error403',
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
  },
}
</script>
