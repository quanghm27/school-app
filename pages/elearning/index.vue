<template>
  <ms-template page-type="submain" :page-title="$t('btn_elearning')" default-header-left="none">
    <template slot="content">
      <ComingSoon />
    </template>
  </ms-template>
</template>

<script>
import ComingSoon from '~/components/ComingSoon'

export default {
  name: 'Elearning',
  components: { ComingSoon },
}
</script>

<style scoped></style>
