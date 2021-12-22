<template>
  <ms-template
    :page-title="$t('menu_children_add')"
    page-type="subpage"
    :show-drawer="false"
    :show-bottom-nav="false"
    :content-srollable="deviceInfo.os !== 'ios'"
  >
    <!-- Tab temporary -->
    <template #headerBottom>
      <div class="tab">
        <ul class="u-tb">
          <li
            :class="['tab-item', { 'is-active': currentTab === 'AddChildQr' }]"
            @click.prevent="currentTab = 'AddChildQr'"
          >
            <a href="#" class="tab-link">{{ $t('text_register_qr') }}</a>
          </li>
          <li
            :class="['tab-item', { 'is-active': currentTab === 'AddChildInput' }]"
            @click.prevent="currentTab = 'AddChildInput'"
          >
            <a href="#" class="tab-link">{{ $t('text_enter_information_directly') }}</a>
          </li>
        </ul>
      </div>
    </template>
    <component :is="currentTab" />
  </ms-template>
</template>

<script>
import AddChildQr from '~/components/setting/AddChildQr'
import AddChildInput from '~/components/setting/AddChildInput'

export default {
  name: 'AddChild',
  components: {
    AddChildQr,
    AddChildInput,
  },
  data() {
    return {
      currentTab: 'AddChildQr',
    }
  },
  computed: {
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    },
  },
}
</script>
