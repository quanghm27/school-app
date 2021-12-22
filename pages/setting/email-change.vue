<template>
  <ms-template :page-title="$t('menu_email_change')" default-header-left="back">
    <section class="myinfo">
      <form class="u-form" @submit.prevent="onSubmit">
        <div class="u-form-item">
          <label class="u-form-txt">
            {{ $t('text_email') }}
            <sup>*</sup>
          </label>
          <div class="u-input is-preCheck">
            <input type="email" v-model="dataForm.EMAIL" />
            <a href="#" class="btn-preCheck" @click.prevent="sendVerifyCode">{{
              $t('btn_forward_authentication_key')
            }}</a>
          </div>
        </div>
        <div class="u-form-item" v-show="showVerifyArea">
          <label class="u-form-txt">
            {{ $t('text_authentication_key') }}
            <sup>*</sup>
          </label>
          <div class="u-input">
            <input type="text" v-model="dataForm.VERIFY_CODE" />
          </div>
        </div>
        <div class="main-action">
          <a href="#" class="btn-default" @click.prevent="onSubmit">{{ $t('btn_save') }}</a>
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
        EMAIL: null,
        VERIFY_CODE: null,
      },
      showVerifyArea: false,
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
  methods: {
    async sendVerifyCode() {
      if (!this.validateEmail()) {
        return
      }
      const { RESULT } = await this.$api.setting.SEND_VERIFY_CODE({
        EMAIL: this.dataForm.EMAIL,
        LOGIN_ID: this.$store.state.userInfo.LOGIN_ID,
      })
      if (RESULT === 'SUCCESS') {
        this.$notify.show('pop_notify_complete_send_varification_code')
        this.showVerifyArea = true
      }
    },
    async onSubmit() {
      if (!this.validateEmail()) {
        return
      }
      if (!this.dataForm.VERIFY_CODE) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      const { RESULT } = await this.$api.setting.CHANGE_EMAIL(this.dataForm)
      if (RESULT === 'SUCCESS') {
        this.changeSuccess = true
        this.$notify.show('pop_notify_complete_save')
      }
    },
    validateEmail() {
      // Validate required fields
      if (!this.dataForm.EMAIL && !this.showVerifyArea) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      if (!this.$utils.validate.isEmail(this.dataForm.EMAIL)) {
        this.$notify.error('pop_error_invalid_email')
        return
      }
      return true
    },
  },
}
</script>
