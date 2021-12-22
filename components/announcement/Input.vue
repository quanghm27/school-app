<template>
  <fragment>
    <div class="flex input items-center">
      <a href="javascript:;" class="file">
        <i class="icon-attach"></i>
        <input type="file" class="is-hidden" id="inputFile" @change="validateFile" />
      </a>
      <input v-model="comment" type="text" maxlength="300" class="custom-input flex-1" />
      <a href="javascript:;" class="send" @click="onSubmit">
        <i class="icon-send"></i>
      </a>
    </div>
  </fragment>
</template>
<script>
export default {
  name: 'CommentInput',
  data() {
    return {
      comment: '',
      file: null,
      filename: '',
      ATTACHED_FILES: [],
    }
  },
  methods: {
    reset() {
      this.comment = ''
      this.file = null
      this.filename = ''
    },
    onSubmit() {
      this.$emit(
        'submit',
        this.$lodash.assign(
          {
            ATTACHED_FILES: this.ATTACHED_FILES,
          },
          {
            CONTENT: this.comment,
          },
        ),
      )
      this.reset()
    },
    async validateFile(e) {
      this.$utils.file.validateImage(e)
      const file = e.target.files[0]
      if (!file) {
        return
      }
      const { name, path } = await this.$api.common.UPLOAD_FILE({
        file,
        type: 'image',
        dir: 'announcement',
      })
      this.ATTACHED_FILES.push({
        FILE_NAME: name,
        FILE_URL: path,
      })
      this.$emit(
        'submit',
        this.$lodash.assign(
          {
            ATTACHED_FILES: this.ATTACHED_FILES,
          },
          {
            CONTENT: this.comment,
          },
        ),
      )
    },
  },
}
</script>
<style scoped>
.input {
  /* height: 67; */
  padding: 0 1.43em;
  padding-top: 14px;
  padding-bottom: 14px;
}
.input .send {
  margin-left: 16px;
  display: flex;
  align-items: center;
}
.input .send i {
  display: block;
  width: 30px;
  height: 26px;
}
.input .file {
  margin-right: 16px;
  position: relative;
}
.input .file .is-hidden {
  width: 30px;
}
.input .file i {
  display: block;
  width: 25px;
  height: 15px;
}

.icon-send {
  background-size: contain;
  background-image: url('~assets/img/send.svg');
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
}

.icon-attach {
  background-size: contain;
  background-image: url('~assets/img/attachment.svg');
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
}

.input .custom-input {
  background: #e3e3e3;
  border-radius: 100px;
  height: 40px;
  outline: none;
  border: none;
  box-shadow: none;
  font-size: 14px;
  padding: 12px 19px;
}

.input .custom-input:focus,
.input .custom-input:active,
.input .custom-input:hover,
.input .custom-input:visited {
  outline: none;
  border: none;
  box-shadow: none;
}
</style>
