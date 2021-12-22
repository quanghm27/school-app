<template>
  <ms-template :page-title="$t('menu_add_card')" default-header-left="">
    <ms-close :to="{ name: 'setting-payment' }" slot="headerRight" />
    <section class="notice">
      <div class="u-middle">
        <i class="icoNoti-cardSuc"></i>
        <h2 class="notice-title">Your card has been registered.</h2>
        <p class="notice-txt">Try to pay with a registered card.</p>
      </div>
    </section>
  </ms-template>
</template>

<script>
export default {}
</script>
