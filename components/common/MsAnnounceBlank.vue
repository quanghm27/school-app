<template>
  <section class="notice">
    <div class="u-middle">
      <i class="icoNoti-noNoti empty-mailbox"></i>
      <!--      <p class="notice-empty notice-empty-title">{{ $t('msg_announcement_no_title') }}</p>-->
      <p class="notice-empty notice-empty-desc">
        {{ $t('msg_announcement_no') }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MSAnnounceBlank',
}
</script>

<style>
.empty-mailbox.icoNoti-noNoti {
  width: 203px;
  height: 203px;
  background: url('~/assets/img/announcement/empty_mailbox.svg') no-repeat;
}
.notice-empty {
  width: 311px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  line-height: 20px;
  font-size: 14px;
}
.notice-empty-title {
  font-size: 16px;
  color: #4f4f4f;
  font-weight: bold;
}
</style>
