<template>
  <div class="notice">
    <div class="u-middle">
      <i class="icoNoti-err400"></i>
      <!-- TODO -->
      <!-- <h2 class="notice-title">The webpage cannot be found</h2>
      <p class="notice-txt">The request is invalid due to malformed <br>Syntax or invalid date.</p> -->
      <p class="notice-txt" v-html="$utils.common.nl2br($t('msg_notfound_webpage'))" />
      <div class="main-action">
        <a @click.prevent="goBack" class="notice-link">{{ $t('btn_back') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
  layout: 'error',
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
