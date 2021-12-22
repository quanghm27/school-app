<template>
  <ms-template :page-title="$t('menu_nickname_setting')" default-header-left="back">
    <section class="myinfo">
      <form class="u-form" @submit.prevent="onSubmit">
        <div class="u-form-item">
          <label class="u-form-txt">{{ $t('text_nickname') }}<sup>*</sup></label>
          <div class="u-input">
            <input type="text" v-model="dataForm.NICKNAME" maxlength="20" />
          </div>
        </div>
        <div class="main-action">
          <a href="#" @click.prevent="onSubmit" class="btn-default">{{ $t('btn_save') }}</a>
        </div>
      </form>
    </section>
  </ms-template>
</template>

<script>
export default {
  data() {
    return {
      dataForm: {
        NICKNAME: null,
      },
      changeSuccess: false,
    }
  },
  computed: {
    notifyVisible() {
      return this.$store.state.popupInfo.visible
    },
  },
  watch: {
    notifyVisible(val) {
      if (!val && this.changeSuccess) {
        this.$router.push({ name: 'setting' })
      }
    },
  },
  async fetch() {
    const { DATA } = await this.$api.setting.GET_MY_INFO()
    this.dataForm.NICKNAME = (DATA && DATA.NICK_NAME) || ''
  },
  methods: {
    async onSubmit() {
      if (!this.dataForm.NICKNAME) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      const { RESULT } = await this.$api.setting.CHANGE_NICKNAME(this.dataForm)
      if (RESULT === 'SUCCESS') {
        this.changeSuccess = true
        this.$notify.show('pop_notify_complete_save')
      }
    },
  },
}
</script>
