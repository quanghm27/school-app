export const announceMixin = {
  data() {
    return {
      isDelete: false,
      selectedList: [],
      announceList: [],
    }
  },
  provide() {
    return {
      router: this.router,
    }
  },
  computed: {
    router() {
      if (this.$route.name.split('v2-announcement-')[0] === 'v2-announcement') {
        return ''
      }
      return this.$route.name.split('v2-announcement-')[1]
    },
    userInfo() {
      return this.$store.get('userInfo')
    },
    role() {
      return this.$store.get('userRole')
    },
  },
  methods: {
    async actionRemove() {
      let message = ''
      if (this.announceList.length === this.selectedList.length) {
        message = 'Bạn có chắc chắn muốn xóa Tất cả thông báo?'
      } else {
        message = 'Bạn có chắc chắn muốn xóa thông báo này?'
      }
      await this.$notify.show(
        {
          title: 'Thông báo',
          message,
          cbConfirm: () => {
            setTimeout(() => this.remove(), 500)
          },
        },
        'v2-confirm',
      )
    },
    async remove() {
      let result = ''
      if (this.role === this.$const.ROLE.TEACHER && this.router === 'sent') {
        if (this.router === 'sent') {
          //Giáo viên đã gửi
          const { RESULT } = await this.$api.announce.DELETE_ANNOUNCE({ IDS: this.selectedList })
          result = RESULT
        } else {
          //Giáo viên đc gửi
          const { RESULT } = await this.$api.announce.DELETE_ANNOUNCE_OF_RECEIVER({ IDS: this.selectedList })
          result = RESULT
        }
      } else {
        //Phụ huynh, học sinh
        const { RESULT } = await this.$api.announce.DELETE_RECEIVER_ANNOUNCE({ IDS: this.selectedList })
        result = RESULT
      }

      if (result === 'SUCCESS') {
        await this.$notify.show({
          message: 'Xóa thông báo thành công',
        })
        await this.$fetch()
        this.selectedList = []
        this.isDelete = false
      }
    },
  },
}
