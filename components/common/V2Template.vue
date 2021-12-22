<template>
  <div
    class="flex flex-col h-full bg-top bg-contain bg-no-repeat bg-primary text-gray-v2-primary text-sm"
    :style="{ backgroundImage: `url(${require(`~/assets/img/login/${headerBg}`)})`, fontFamily: 'Roboto, sans-serif' }"
  >
    <slot name="header" />
    <div class="bg-gray-F9F9F9 flex-1 pl-4 pt-4 overflow-y-auto" :class="classContent">
      <slot name="content" />
      <slot />
      <portal-target name="v2-rating" multiple />
      <portal-target name="popup" multiple />
    </div>
    <ms-bottom v-if="showBottomNav" />
    <ms-popup
      :title="popupInfo.title"
      :show="popupInfo.visible"
      :z-index="51"
      @close="closePopup"
      :cbConfirm="popupInfo.cbConfirm"
      :cbClose="popupInfo.cbClose"
      :type="popupInfo.errors ? 'error' : popupInfo.type"
    >
      <p
        :class="[{ 'pop-note': popupInfo.type === 'error' }]"
        v-if="popupInfo.message"
        v-html="$utils.common.nl2br(popupInfo.message)"
      />
      <p class="pop-note" v-if="popupInfo.errors">
        <template v-for="(err, errKey) in popupInfo.errors">
          <span :key="errKey">
            {{ err }}
            <br />
          </span>
        </template>
      </p>
    </ms-popup>
    <portal-target name="popup" multiple />
    <portal-target name="popup-full" multiple />
    <portal-target name="banner" multiple />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { themeMixin } from '../../mixins'

export default {
  name: 'V2Template',
  props: {
    showBottomNav: {
      type: Boolean,
      required: false,
      default: true,
    },
    classContent: {
      type: String,
      default: '',
    },
  },
  mixins: [themeMixin],
  computed: {
    ...mapState(['popupInfo', 'showPopup']),
  },
  methods: {
    closePopup() {
      this.$notify.hide()
    },
  },
}
</script>
<style>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
