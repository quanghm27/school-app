<template>
  <ms-template :page-title="$t('menu_inquiring')" :show-bottom-nav="false" :show-drawer="false">
    <section class="inquiry">
      <form class="u-form" @submit.prevent="onSubmit">
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
        <div class="u-form-item">
          <label class="u-form-txt">{{ $t('text_attachment') }}</label>
          <div class="u-fakeInput is-preCheck">
            <a href="#" class="btn-preCheck">
              {{ $t('btn_select_file') }}
              <input
                type="file"
                accept="image/png, image/jpeg"
                class="is-hidden"
                id="inputFile"
                @change="validateFile"
              />
            </a>
            <p class="u-fakeInput-val">{{ dataForm.FILE_NAME }}</p>
          </div>
          <p class="u-form-note">{{ $t('msg_file_upload_guide') }}</p>
        </div>
        <div class="hotline">
          <span>{{ $t('Số điện thoại hỗ trợ') }}:</span>
          <a :href="`tel:${$const.HOTLINE}`" class="social-item">{{ $const.HOTLINE }}</a>
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
const IMG_MAX_SIZE = 5 * 1024 * 1024 // 5MB
const IMG_TYPES = ['image/png', 'image/img']
const TITLE_MAX_LENGTH = 100
const CONTENT_MAX_LENGTH = 500

export default {
  layout: 'auth',
  data() {
    return {
      dataForm: {
        TITLE: '',
        QUESTION: '',
        FILE_NAME: '',
        FILE_URL: '',
      },
      imgFile: null,
      isLoading: false,
      CONTENT_MAX_LENGTH,
    }
  },
  methods: {
    async upload() {
      if (!this.imgFile) {
        return
      }

      const { name, path } = await this.$api.common.UPLOAD_FILE({
        file: this.imgFile,
        type: 'image',
        dir: 'accounts',
      })

      this.dataForm.FILE_NAME = name
      this.dataForm.FILE_URL = path
    },
    async onSubmit() {
      if (!this.validateForm() || this.isLoading) {
        return
      }

      this.isLoading = true

      await this.upload()

      const { RESULT } = await this.$api.inquiry.CREATE_INQUIRY(this.dataForm)

      if (RESULT === 'SUCCESS') {
        this.$notify.show('pop_notify_complete_save')
        this.$router.push({ name: 'inquiry' })
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
      const isRequireValid = this.dataForm.TITLE && this.dataForm.QUESTION
      const file = this.imgFile && this.imgFile[0]

      if (!isRequireValid) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }

      if (file && file.size > IMG_MAX_SIZE) {
        this.$notify.error('pop_error_over_image_size')
        return
      }

      if (file && !IMG_TYPES.includes(file.type)) {
        this.$notify.error('pop_error_not_match_image_format')
        return
      }

      return true
    },
    validateFile(e) {
      this.$utils.file.validateImage(e)
      const file = e.target.files[0]
      if (!file) {
        return
      }
      this.imgFile = file
      this.dataForm.FILE_NAME = file.name
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
