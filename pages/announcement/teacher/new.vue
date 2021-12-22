<template>
  <ms-template :page-title="$t('Gửi thông báo')" page-class="is-showSem" :showBottomNav="false">
    <template slot="headerLeft">
      <ms-back />
    </template>
    <template slot="content">
      <div class="content">
        <div>
          <div>{{ $t('Tiêu đề thông báo') }}</div>
          <input class="inp" :placeholder="$t('Nhập tiêu đề thông báo')" v-model.trim="formAnnounce.title" />
          <div class="mt-5">{{ $t('Nội dung thông báo') }}</div>
          <div class="relative">
            <textarea :placeholder="$t('Nhập tiêu đề thông báo')" v-model.trim="formAnnounce.content" />
            <div class="absolute bottom-1.5 left-2 bg-white w-[96%]">
              <input
                type="file"
                class="is-hidden"
                id="inputFile"
                @change="uploadFile"
                multiple
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/*"
              />
              <n-icon icon="attach_file" class-name="icon-check" />
            </div>
          </div>
          <div class="mt-4" v-if="!$lodash.isEmpty(files)">
            <div
              v-for="(file, index) of files"
              :key="`${file.fileName}-${index}`"
              class="px-2 bg-gray-E1E1E1 flex items-center justify-between mb-1"
            >
              <span class="truncate flex items-center">
                <n-icon icon="image" class-name="icon_check text-black" color="#828282" />
                {{ file.fileName }}
              </span>
              <n-icon icon="close" class-name="icon_check" @click="removeFile(index)" />
            </div>
          </div>
        </div>
        <div>
          <div class="flex items-center mt-4">
            <div @click="formAnnounce.allowComment = !formAnnounce.allowComment" class="flex items-center">
              <n-icon v-if="formAnnounce.allowComment" icon="check_rec.svg" class="w-6 h-6 mr-2" />
              <n-icon v-else icon="check_rec_outline.svg" class="w-6 h-6 mr-2" />
              <label>Cho phép bình luận thông báo</label>
            </div>
          </div>
          <div class="flex items-center justify-between mt-8 mb-2">
            <div class="font-bold">{{ $t('Đối tượng đã chọn') }}</div>
            <n-icon class="w-6 h-6" icon="plus" @click="showSelectReceiverPopup = true" />
          </div>
          <div>
            <template v-for="tag in selected">
              <div :key="JSON.stringify(tag.GROUP_ID)" class="tag">
                <span v-if="tag.GROUP_ID.TYPE_GROUP === 1">
                  <span>{{ tag.STUDENT_NAME || tag.GROUP_NAME }}</span>
                </span>
                <span v-else-if="tag.GROUP_ID.TYPE_GROUP === 3">
                  <span>{{ tag.STUDENT_NAME ? `(P/H) ${tag.STUDENT_NAME}` : `(P/H) ${tag.GROUP_NAME}` }} </span>
                </span>
                <span v-else>
                  <span>{{ tag.TEACHER_NAME ? `(GV) ${tag.TEACHER_NAME}` : `(GV) ${tag.GROUP_NAME}` }}</span>
                </span>
                <n-icon class="tag-clear" icon="clear" @click="removeTag(tag)" />
              </div>
            </template>
          </div>
        </div>
        <div class="footer">
          <button class="submit-btn" @click="onSubmitForm">{{ $t('Gửi') }}</button>
        </div>
        <SelectReceiverPopup v-model="showSelectReceiverPopup" :selected.sync="selected" />
        <ms-popup :show="modalConfirmVisible" :title="$t('pop_confirm_send_title')">
          {{ sendPopupMessage }}
          <template slot="main-action">
            <a href="#" @click.prevent="modalConfirmVisible = false" class="btn-mini is-disable">{{
              $t('btn_cancel')
            }}</a>
            <a href="#" @click.prevent="sendAnnounce" :class="['btn-mini', { disabled: sending }]">{{
              $t('btn_confirmation')
            }}</a>
          </template>
        </ms-popup>
      </div>
    </template>
  </ms-template>
</template>

<script>
import MsPopup from '@/components/common/MsPopup'
import SelectReceiverPopup from '@/components/announcement/SelectReceiverPopup'

export default {
  name: 'NewAnnouncement',
  components: { MsPopup, SelectReceiverPopup },
  data() {
    return {
      formAnnounce: {
        title: '',
        content: '',
        allowComment: true,
      },
      showSelectReceiverPopup: false,
      selected: [],
      files: [],
      notify: '',
      modalConfirmVisible: false,
      sending: false,
      sendPopupMessage: this.$t('pop_confirm_send_msg'),
    }
  },
  watch: {
    notify(value) {
      if (value) {
        setTimeout(() => {
          this.$notify.show(value)
        }, 500)
      }
    },
  },
  methods: {
    removeTag(tag) {
      const remove = require('lodash/remove')
      this.selected = remove(this.selected, t => JSON.stringify(t.GROUP_ID) !== JSON.stringify(tag.GROUP_ID))
    },
    async uploadFile(e) {
      const files = e.target.files
      const f = []
      for (let file of files) {
        f.push(
          await this.$api.common.UPLOAD_FILE({
            file,
            dir: 'announcement',
          }),
        )
      }

      Promise.all(f).then(response => {
        console.log('updaload file', response)
      })
    },
    removeFile(index) {
      const remove = require('lodash/remove')
      const removeFile = remove(this.files, (_, i) => i !== index)

      const fileElement = document.getElementById('inputFile').files
      fileElement[index].value = null

      this.files = removeFile
    },
    onSubmitForm() {
      const { title, content } = this.formAnnounce
      if (!title || !content || this.$lodash.isEmpty(this.selected)) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      this.modalConfirmVisible = true
    },
    async sendAnnounce() {
      if (this.sending) {
        return
      }
      this.sending = true
      const { title, content, allowComment } = this.formAnnounce
      const params = {
        ATTACHMENTS: this.files.map(file => ({
          FILE_NAME: file.fileName,
          FILE_URL: file.fileUrl,
        })),
        TITLE: title,
        CONTENTS: content,
        // DEPARTMENT_ID: this.sender === SENDER.DEPARTMENT ? this.departmentSelect : null,
        IS_SEND: true,
        COMMENTABLE: allowComment,
        RECEIVERS: this.selected,
      }
      try {
        const { RESULT } = await this.$api.announce.NEW_ANNOUNCE(params)
        if (RESULT === 'SUCCESS') {
          this.modalConfirmVisible = false
          this.formAnnounce = {
            title: '',
            content: '',
            allowComment: false,
          }
          this.selected = []
          this.sending = false
          this.notify = 'pop_notify_complete_send'
          this.$router.push('/v2/announcement/sent')
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style>
.main-container {
  padding: 18px 20px;
  background-color: #f3f3f3;
}
</style>

<style scoped>
a.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
.content {
  padding-bottom: 100px;
}
.inp {
  margin-top: 10px;
  height: 50px;
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}
input[type='checkbox'] {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-shadow: none;
}
textarea {
  margin-top: 10px;
  height: 200px;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}
.tag {
  display: inline-block;
  align-items: center;
  background-color: #fff;
  padding: 5px 28px 5px 10px;
  border-radius: 14px;
  margin-top: 10px;
  margin-right: 4px;
  position: relative;
}
.tag-clear {
  position: absolute;
  right: 2px;
  top: 3px;
  width: 24px;
  height: 24px;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
}
.submit-btn {
  height: 50px;
  width: 100%;
  color: #fff;
  border-radius: 100px;
  background-color: #e0402a;
}
</style>
