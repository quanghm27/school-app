<template>
  <ms-template page-type="submain" page-title="Payment" default-header-left="none">
    <template slot="content">
      <ComingSoon />
    </template>
  </ms-template>
</template>

<script>
import ComingSoon from '~/components/ComingSoon'

export default {
  name: 'SettingPayment',
  components: { ComingSoon },
}
</script>

<style scoped></style>
