<template>
  <portal to="popup">
    <div :class="['pop', { 'is-active !z-50': show }, { center }]">
      <div class="u-middle">
        <div v-if="type === 'v2-confirm'">
          <div class="popBox bg-white rounded-md">
            <div class="p-6">
              <div :class="{ popAlert: type === 'error' }" class="min-h-[60px] text-lg">
                <i class="icoApp-alert" v-if="type === 'error'" />
                <slot />
              </div>
            </div>
            <div class="p-6 text-right">
              <slot name="main-action">
                <template v-if="type === 'v2-confirm'">
                  <a href="#" @click.prevent="close" class="uppercase text-xl font-bold text-gray-2">{{
                    $t('Không')
                  }}</a>
                  <a href="#" @click.prevent="confirm" class="uppercase text-xl font-bold text-primary ml-2">{{
                    $t('Đồng ý')
                  }}</a>
                </template>
              </slot>
            </div>
          </div>
        </div>
        <div class="popBox" v-else>
          <div class="popTop" v-if="title">
            <h2 class="pop-title" v-text="title" />
            <a href="#" class="icoApp-popClose" v-if="closeIcon" @click.prevent="close"></a>
          </div>
          <div class="header-bottom">
            <slot name="header-bottom" />
          </div>
          <div class="popArea">
            <div :class="{ popAlert: type === 'error', popMsg: ['notify', 'confirm'].includes(type) }">
              <i class="icoApp-alert" v-if="type === 'error'" />
              <slot />
            </div>
          </div>
          <div class="main-action flex items-center justify-center">
            <slot name="main-action">
              <template v-if="type === 'confirm'">
                <a href="#" @click.prevent="close" class="btn-mini is-disable">{{ $t('btn_cancel') }}</a>
                <a href="#" @click.prevent="confirm" class="btn-mini">{{ $t('btn_confirmation') }}</a>
              </template>
              <template v-if="['notify', 'error'].includes(type)">
                <a href="#" @click.prevent="close" class="btn-mini">{{ $t('btn_close') }}</a>
              </template>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MsPopup',
  props: {
    type: {
      type: String,
      required: false,
      default: 'notify',
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
    closeIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    cbConfirm: {
      type: Function,
      required: false,
      default: () => {},
    },
    cbClose: {
      type: Function,
      required: false,
      default: () => {},
    },
    center: {
      type: Boolean,
    },
  },
  data() {
    return {
      confirming: false,
    }
  },
  computed: {
    ...mapState(['showPopup']),
  },
  methods: {
    close() {
      this.$emit('close')
      this.cbClose()
    },
    async confirm() {
      this.$emit('confirm')
      await this.cbConfirm()
      this.close()
    },
  },
  watch: {
    show(val) {
      this.$store.commit('setShowPopup', val)
    },
    showPopup(val) {
      if (!val && this.show) {
        this.close()
      }
    },
  },
}
</script>

<style scoped>
.popArea {
  max-height: 55vh;
}
.pop {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
.pop.is-active {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
.pop .u-middle {
  z-index: 0;
}
.pop.is-active .u-middle {
  z-index: 25;
}

.pop .main-action {
  padding: 1em 1.43em;
}

.pop .header-bottom {
  padding-left: 1.43em;
  padding-right: 1.43em;
}
</style>
