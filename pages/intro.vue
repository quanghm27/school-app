<template>
  <div class="page">
    <div class="intro">
      <div class="u-middle">
        <div class="logo"><img src="~/assets/img/logo.svg" title="SCHOOLS.VN" /></div>
      </div>
      <div class="intro-footer">
        <div class="load">
          <div class="load-status">Installing updates... (11/20)</div>
          <div class="load-bar">
            <div class="bar bar-progress"></div>
          </div>
        </div>
        <div class="load">
          <div class="load-status">Checking for updates...</div>
          <div class="load-bar">
            <div class="bar bar-loading"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
}
</script>

<style>
#__nuxt,
#__layout {
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
  overflow-x: hidden;
  min-width: 300px;
  min-height: 230px;
  transition: transform 0.5s 0s ease;
}
</style>
