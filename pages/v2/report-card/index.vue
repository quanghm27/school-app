<template>
  <v2-template :show-bottom-nav="false">
    <v2-header slot="header" title="Bảng điểm">
      <n-icon slot="left" icon="chevron-left" @click="$router.back()"></n-icon>
      <!-- TODO: fix header alignment and remove this shit -->
      <div slot="right" style="width: 32px" />
    </v2-header>
    <template slot="content">
      <div class="pr-4 pt-4">
        TODO
      </div>
    </template>
  </v2-template>
</template>

<script>
export default {}
</script>

<style scoped></style>
