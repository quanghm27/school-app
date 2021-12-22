<template>
  <v2-template :show-bottom-nav="false" class-content="pr-4">
    <v2-header slot="header" title="Chi tiết thông báo">
      <template slot="left">
        <n-icon icon="chevron-left" @click="$router.back()"></n-icon>
      </template>
      <template slot="right">
        <n-icon icon="trash" class="w-5 h-5" @click="removeAnnounce"></n-icon>
      </template>
    </v2-header>
    <div slot="content" v-if="!$fetchState.pending">
      <div class="px-4 py-2 mb-4 bg-orange-FFA800 rounded-md flex justify-between items-center" v-if="isOpenNotify">
        <p>Bạn không được bình luận ở thông báo này</p>
        <n-icon icon="close" class="w-5 h-5" @click="isOpenNotify = false"></n-icon>
      </div>
      <div class="bg-white rounded-md p-4 mb-4">
        <div class="flex justify-between mb-4">
          <div class="flex items-center justify-center">
            <img src="~/assets/img/avatar-announce-teacher.png" class="w-12 h-12 mr-2" alt="" />
            <div>
              <p class="text-[16px] font-medium text-black leading-5 mb-1 line-clamp-1">{{ detail.SENDER }}</p>
              <div class="text-xs text-gray-4">{{ $moment(detail.DATE).format('DD/MM/YYYY HH:mm') }}</div>
            </div>
          </div>
          <n-icon icon="more" class="w-1 h-4 ml-4"></n-icon>
        </div>
        <p class="text-black mb-2">{{ detail.TITLE }}</p>
        <p class="text-gray-3" v-html="detail.CONTENT" />
      </div>
      <div class="mb-[70px]">
        <div class="flex items-center justify-between relative mb-2">
          <div class="flex items-center">
            <div class="flex items-center mr-4" @click="toggleLike(detail)">
              <n-icon :icon="detail.IS_LIKE ? 'heart' : 'heart-outline'" class="w-4 h-4 mr-1"></n-icon>
              <span class="text-sm">{{ detail.LIKE_COUNT }}</span>
            </div>
            <!--            <div class="flex items-center mr-4">-->
            <!--              <n-icon icon="message" class="w-4 h-4 mr-1"></n-icon>-->
            <!--              <span class="text-sm">{{ detail.COMMENT_COUNT }}</span>-->
            <!--            </div>-->
          </div>
          <div class="text-[16px] text-gray-2">Bình luận {{ comments ? `(${comments.length})` : null }}</div>
        </div>
        <div v-if="comments">
          <div
            v-for="(cmt, index) in comments"
            :key="cmt.ID"
            class="py-4 border-0"
            :class="[{ 'border-b border-solid border-gray-5': index !== comments.length - 1 }]"
          >
            <div class="flex justify-between mb-3">
              <div class="flex items-center justify-center">
                <img
                  :src="
                    cmt.IMG_URL_FULL ||
                      require(`~/assets/img/avatar-announce-${
                        cmt.USER_TYPE === $const.USER_TYPE.PARENT
                          ? 'parents'
                          : cmt.USER_TYPE === $const.USER_TYPE.TEACHER
                          ? 'teacher'
                          : 'student'
                      }.png`)
                  "
                  class="w-[30px] h-[30px] mr-2"
                  alt=""
                />
                <div>
                  <p class="text-[16px] font-medium text-black leading-5 mb-1 line-clamp-1">
                    {{ cmt.NAME_DESCRIPTION }}
                  </p>
                  <div class="text-xs text-gray-4">
                    {{ $moment(cmt.CREATED_AT, 'YYYYMMDDTHH:mm:ss').format('DD/MM/YYYY HH:mm') }}
                  </div>
                </div>
              </div>
              <n-icon icon="more" class="w-1 h-4 ml-4"></n-icon>
            </div>
            <div class="ml-[38px]">
              <template v-for="f in cmt.ATTACHED_FILES">
                <div class="flex max-w-[100%]" :key="f.ID" v-if="f.FILE_NAME">
                  <a class="max-h-[200px]" v-if="$utils.file.isImageString(f.FILE_NAME)" :href="f.FILE_URL" download>
                    <img class="h-full bg-cover" :src="f.FILE_URL" alt="" />
                  </a>
                  <a v-else class="py-2 px-4 bg-gray-5 rounded-full mb-2 line-clamp-1" :href="f.FILE_URL" download>
                    {{ shortFile(f.FILE_NAME) }}
                  </a>
                </div>
              </template>
              <p class="text-gray-2 line-clamp-3">{{ cmt.CONTENT }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-16 bg-white absolute bottom-0 left-0 p-4 flex items-center" v-if="detail.CAN_COMMENT">
        <div @change="uploadFile" class="relative">
          <input type="file" id="inputFile" class="is-hidden absolute w-full h-full" />
          <n-icon icon="attach-file" class="w-5 h-5"></n-icon>
        </div>
        <div class="flex-1 py-3 px-5 bg-gray-5 rounded-full flex items-center mx-4">
          <input
            maxlength="100"
            v-model.trim="formData.content"
            placeholder="Nhập bình luận..."
            class="w-full bg-transparent"
            @keyup.enter="createComment"
            :disabled="isComment"
            ref="inputComment"
          />
        </div>
        <n-icon :icon="`send-${role}`" class="w-6" @click="createComment"></n-icon>
      </div>
    </div>
  </v2-template>
</template>

<script>
export default {
  name: 'Id',
  data() {
    return {
      detail: null,
      comments: null,
      formData: {
        content: '',
        files: [],
      },
      file: null,
      isComment: false,
      isOpenNotify: true,
    }
  },
  computed: {
    role() {
      return this.$store.get('userRole')
    },
  },
  async fetch() {
    const params = {
      CONDITIONS: {
        ANNOUNCE_ID: this.$route.params.id,
      },
      SEARCH_PAGE: 0,
      SEARCH_UNIT: 9999,
    }
    const [resDetail] = await Promise.all([
      this.$api.announce.GET_DETAIL_ANNOUNCE({ ANNOUNCE_ID: this.$route.params.id }),
      this.fetchComments(params),
    ])
    this.detail = resDetail.DATA
    this.isOpenNotify = !resDetail.DATA.CAN_COMMENT
  },
  methods: {
    async fetchComments(params) {
      const { DATA } = await this.$api.announce.GET_ANNOUNCE_COMMENT(params)
      this.comments = DATA.ITEMS
    },
    async createComment() {
      if (this.isComment) return
      this.isComment = true
      if (!this.formData.content && this.$lodash.isEmpty(this.formData.files)) {
        this.isComment = false
        this.$refs.inputComment.focus()
        return
      }
      try {
        const { RESULT } = await this.$api.announce.ADD_ANNOUNCE_COMMENT({
          ANNOUNCE_ID: this.$route.params.id,
          CONTENT: this.formData.content,
          ATTACHED_FILES: this.formData.files,
          PARENT_ID: 0,
        })
        this.formData.content = ''
        this.formData.files = []
        if (RESULT === 'SUCCESS') {
          const params = {
            CONDITIONS: {
              ANNOUNCE_ID: this.$route.params.id,
            },
            SEARCH_PAGE: 0,
            SEARCH_UNIT: 9999,
          }
          await this.fetchComments(params)
        }
        this.isComment = false
      } catch (e) {
        console.log(e)
        this.isComment = false
      }
      setTimeout(() => {
        this.isComment = false
      }, 1000)
    },
    toggleLike(currentLike) {
      const params = {
        ID: currentLike.ID,
        REFER_ID: currentLike.REFER_ID,
        TYPE: currentLike?.PAYMENT ? this.$const.ANNOUNCE_TYPES.PAYMENT : this.$const.ANNOUNCE_TYPES.ANNOUNCE,
        GROUP_TYPE: currentLike.GROUP_TYPE,
      }
      if (!currentLike.IS_LIKE) {
        currentLike.LIKE_COUNT = currentLike.LIKE_COUNT + 1
        currentLike.IS_LIKE = true
      } else {
        currentLike.LIKE_COUNT = currentLike.LIKE_COUNT - 1
        currentLike.IS_LIKE = false
      }
      this.$api.announce.MARK_LIKE(params)
    },
    async uploadFile(e) {
      // this.$utils.file.validateImage(e)
      const file = e.target.files[0]
      if (!file) {
        return
      }

      let files = []
      const { name, path } = await this.$api.common.UPLOAD_FILE({
        file,
        dir: 'announcement',
      })
      files.push({
        FILE_NAME: name,
        FILE_URL: path,
      })
      this.formData.files = files
      await this.createComment()
    },
    removeFile(index) {
      const remove = require('lodash/remove')
      const removeFile = remove(this.formData.files, (_, i) => i !== index)

      const fileElement = document.getElementById('inputFile').files
      fileElement[index].value = null

      this.formData.files = removeFile
    },
    shortFile(fileName) {
      return this.$utils.file.shortImageName(fileName)
    },
    removeAnnounce() {
      this.$notify.show(
        {
          title: 'Thông báo',
          message: 'Bạn có chắc chắn muốn xóa thông báo này?',
          cbConfirm: async () => {
            const { RESULT } = await this.$api.announce.DELETE_ANNOUNCE({ IDS: [this.$route.params.id] })
            if (RESULT === 'SUCCESS') {
              this.$router.back()
            }
          },
        },
        'v2-confirm',
      )
    },
  },
}
</script>

<style scoped></style>
