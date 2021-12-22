<template>
  <section class="addChild scan-screen">
    <!-- Form Input -->
    <form class="u-form" @submit.prevent="submit">
      <!-- Secret key -->
      <div class="u-form-item">
        <label class="u-form-txt">
          {{ $t('Mã bí mật') }}
          <sup>*</sup>
        </label>
        <div class="u-input">
          <input type="text" v-model="formData.SECRET_KEY" />
        </div>
        <p class="u-form-note">{{ $t('Vui lòng nhập Mã bí mật') }}</p>
      </div>

      <div class="main-action">
        <button type="submit" style="display: none"></button>
        <a href="#" class="btn-default" @click.prevent="submit">{{ $t('btn_register') }}</a>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'AddChildInput',
  data() {
    return {
      formData: {
        SECRET_KEY: '',
      },
    }
  },
  methods: {
    async submit() {
      if (!this.formData.SECRET_KEY) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }

      const { RESULT } = await this.$api.parent.ADD_CHILD_BY_QR({
        SECRET_KEY: this.formData.SECRET_KEY,
      })
      if (RESULT === 'SUCCESS') {
        this.$notify.show('pop_notify_complete_add_service')
        this.$router.back()
      }
    },
  },
}
</script>
