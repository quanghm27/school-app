<template>
  <ms-template :page-title="$t('menu_password_change')" default-header-left="back">
    <section class="myinfo">
      <form class="u-form" @submit.prevent="onSubmit">
        <div class="u-form-item">
          <label class="u-form-txt">{{ $t('text_password_new') }}<sup>*</sup></label>
          <div class="u-input">
            <input type="password" v-model="dataForm.NEW_PASSWORD" />
          </div>
          <p class="u-form-note">{{ $t('msg_password_guide') }}</p>
        </div>
        <div class="u-form-item">
          <label class="u-form-txt">{{ $t('text_password_new_confirm') }}<sup>*</sup></label>
          <div class="u-input">
            <input type="password" v-model="dataForm.CONFIRM_PASSWORD" />
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
        NEW_PASSWORD: null,
        CONFIRM_PASSWORD: null,
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
  methods: {
    async onSubmit() {
      if (!this.validateForm()) {
        return
      }

      const { RESULT } = await this.$api.setting.CHANGE_PASSWORD(this.dataForm)
      if (RESULT === 'SUCCESS') {
        this.changeSuccess = true
        this.$notify.show('pop_notify_complete_save')
      }
    },
    validateForm() {
      // Validate required fields
      if (!this.dataForm.NEW_PASSWORD || !this.dataForm.CONFIRM_PASSWORD) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }

      // Validate match confirm password
      if (this.dataForm.NEW_PASSWORD !== this.dataForm.CONFIRM_PASSWORD) {
        this.$notify.error('pop_error_different_new_password')
        return
      }
      return true
    },
  },
}
</script>
