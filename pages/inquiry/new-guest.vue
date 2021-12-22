<template>
  <ms-template :page-title="$t('menu_inquiring')" :show-bottom-nav="false" :show-drawer="false">
    <section class="inquiry">
      <form class="u-form" @submit.prevent="onSubmit">
        <div class="u-form-item">
          <label class="u-form-txt">
            {{ $t('text_name') }}
            <sup>*</sup>
          </label>
          <div class="u-input">
            <input type="text" v-model="dataForm.INQUIRER_NAME" />
          </div>
        </div>

        <div class="u-form-item">
          <label class="u-form-txt">
            {{ $t('text_contact_inquiry_content_school') }}
            <sup>*</sup>
          </label>
          <div class="u-input">
            <input type="text" v-model="dataForm.ORGANIZATION" />
          </div>
        </div>

        <div class="u-form-item">
          <label class="u-form-txt">
            {{ $t('text_email') }}
            <sup>*</sup>
          </label>
          <div class="u-input">
            <input type="text" v-model="dataForm.INQUIRER_EMAIL" />
          </div>
        </div>

        <div class="u-form-item">
          <label class="u-form-txt">
            {{ $t('text_contact_inquiry_content_phone') }}
            <sup>*</sup>
          </label>
          <div class="u-input">
            <input type="text" v-model="dataForm.INQUIRER_PHONE" />
          </div>
        </div>

        <div class="u-form-item">
          <label class="u-form-txt">
            {{ $t('text_title') }}
            <sup>*</sup>
          </label>
          <div class="u-input">
            <input type="text" v-model="dataForm.TITLE" @input="validateLength" />
          </div>
        </div>

        <div class="u-form-item">
          <label class="u-form-txt">
            {{ $t('text_contact_inquiry_content_type') }}
            <sup>*</sup>
          </label>
          <div class="u-input">
            <select v-model="dataForm.CATEGORY">
              <option v-for="item in CATEGORY_TYPES" :key="item.id" :value="item.id">
                {{ item.value }}
              </option>
            </select>
          </div>
        </div>

        <div class="u-form-item">
          <label class="u-form-txt">
            {{ $t('text_contents') }}
            <sup>*</sup>
          </label>
          <div class="u-input">
            <textarea id="inputTextarea" v-model="dataForm.QUESTION" @input="validateLength" />
          </div>
          <p class="u-form-PS">
            {{ dataForm.QUESTION.length }} {{ $t('text_count_character') }}/{{ CONTENT_MAX_LENGTH }}
            {{ $t('text_count_character') }}
          </p>
        </div>
        <div class="hotline">
          <span>{{ $t('Số điện thoại hỗ trợ') }}:</span>
          <a :href="`tel:${$const.HOTLINE}`">{{ $const.HOTLINE }}</a>
          <span>hoặc</span>
          <a @click="$utils.app.dispatch({ type: 'OPEN_APP_LINK', payload: { url: 'https://zalo.me/0968334227' } })">
            <span>{{ $t('Zalo') }}</span>
          </a>
        </div>
        <div class="main-action">
          <a href="#" class="btn-default-S" @click.prevent="onSubmit">
            {{ $t('btn_register') }}
          </a>
        </div>
      </form>
    </section>
  </ms-template>
</template>

<script>
const TITLE_MAX_LENGTH = 100
const CONTENT_MAX_LENGTH = 500

export default {
  layout: 'auth',
  data() {
    return {
      dataForm: {
        INQUIRER_NAME: '',
        ORGANIZATION: '',
        INQUIRER_EMAIL: '',
        INQUIRER_PHONE: '',
        CATEGORY: '1',
        TITLE: '',
        QUESTION: '',
      },
      isLoading: false,
      CONTENT_MAX_LENGTH,
      CATEGORY_TYPES: [
        { id: 1, value: this.$t('text_contact_inquiry_content_type_guide') },
        { id: 2, value: this.$t('text_contact_inquiry_content_type_account') },
        { id: 3, value: this.$t('text_contact_inquiry_content_type_install') },
        { id: 4, value: this.$t('text_contact_inquiry_content_type_fix') },
        { id: 5, value: this.$t('text_contact_inquiry_content_type_other') },
      ],
    }
  },
  methods: {
    async onSubmit() {
      if (!this.validateForm() || this.isLoading) {
        return
      }

      this.isLoading = true

      const { RESULT } = await this.$api.inquiry.SEND_INQUIRY(this.dataForm)

      if (RESULT === 'SUCCESS') {
        this.$notify.show('pop_notify_complete_save')
        this.$router.push({ name: 'index' })
      }

      this.isLoading = false
    },
    validateLength() {
      const { TITLE, QUESTION } = this.dataForm

      if (TITLE.length > TITLE_MAX_LENGTH) {
        alert(this.$t('msg_count_title_over'))
        this.dataForm.TITLE = TITLE.slice(0, TITLE_MAX_LENGTH)
      }

      if (QUESTION.length > CONTENT_MAX_LENGTH) {
        alert(this.$t('msg_count_msg_over'))
        this.dataForm.QUESTION = QUESTION.slice(0, CONTENT_MAX_LENGTH)
      }
    },
    validateForm() {
      const { TITLE, QUESTION, INQUIRER_NAME, ORGANIZATION, INQUIRER_EMAIL, INQUIRER_PHONE } = this.dataForm
      const isRequireValid = TITLE && QUESTION && INQUIRER_NAME && ORGANIZATION && INQUIRER_EMAIL && INQUIRER_PHONE
      const validPhone = this.$utils.validate.isPhone(INQUIRER_PHONE)
      const validEmail = this.$utils.validate.isEmail(INQUIRER_EMAIL)

      if (!validPhone) {
        this.$notify.error('pop_error_invalid_phone_number')
        return
      }

      if (!validEmail) {
        this.$notify.error('pop_error_invalid_email')
        return
      }

      if (!isRequireValid) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }

      return true
    },
  },
}
</script>

<style scoped>
.hotline a {
  text-decoration: underline;
  color: #0000ff;
}
</style>
