<template>
  <ms-template
    :page-title="$t('menu_announcement_sent_details')"
    :showBottomNav="false"
    page-class="custom-announcement-page"
  >
    <template slot="headerLeft">
      <ms-back />
    </template>
    <template slot="content">
      <!-- <portal-target name="destination" /> -->
      <ms-spinner v-if="isFetching" />
      <announcement-detail
        v-else
        :announceId="announceId"
        :announce="announce"
        :isParent="false"
        :isReceiverAnnoun="true"
        :comments="sortComments"
        :toggleLike="toggleLike"
      />
    </template>
    <template slot="bottom">
      <comment-input v-if="announce && announce.CAN_COMMENT" @submit="sendComment" />
    </template>
  </ms-template>
</template>

<script>
import { ROLE } from '~/constants'
import AnnouncementDetail from '@/components/announcement/Detailv2.vue'
import CommentInput from '@/components/announcement/Input.vue'

const ROLES = [
  { id: 'U', name: ROLE.STUDENT }, //
  { id: 'T', name: ROLE.TEACHER },
  { id: 'P', name: ROLE.PARENT },
]

const ANNOUNCE_TYPES = {
  ANNOUNCE: 1,
  PAYMENT: 2,
}

export default {
  name: 'Receiver',
  components: { AnnouncementDetail, CommentInput },
  data() {
    return {
      tabs: [this.$t('text_unread'), this.$t('text_read')],
      currentTab: 0,
      receiver: {},
      announceId: parseInt(this.$route.params.id),
      announce: {},
      isFetching: false,
      comments: [],
    }
  },
  computed: {
    sortComments() {
      return this.$lodash.sortBy(this.comments, value => {
        return this.$moment(value.CREATED_AT, 'YYYYMMDDTHH:mm:ss').valueOf()
      })
    },
  },
  async fetch() {
    // TODO
    // infinite scroll
    this.isFetching = true
    const ANNOUNCE_ID = this.$route.params.id
    const params = {
      CONDITIONS: {
        ANNOUNCE_ID,
      },
      SEARCH_PAGE: 0,
      SEARCH_UNIT: 9999,
    }
    const data = await Promise.all([
      this.$api.announce.DETAIL_ANNOUNCE({
        ANNOUNCE_ID,
      }),
      this.$api.announce.GET_ANNOUNCE_COMMENT(params),
    ])
    this.announce = data[0].DATA || {}
    this.comments = data[1]?.DATA?.ITEMS || []
    this.isFetching = false
  },
  watch: {
    // currentTab() {
    //   this.$fetch()
    // },
  },
  methods: {
    getRoleText(role) {
      const r = ROLES.find(item => item.id === role)
      return (r && r.name) || ''
    },
    sendComment(data) {
      this.$api.announce
        .ADD_ANNOUNCE_COMMENT({
          ANNOUNCE_ID: this.announceId,
          CONTENT: data.CONTENT,
          ATTACHED_FILES: data.ATTACHED_FILES.length > 0 ? data.ATTACHED_FILES : [],
          PARENT_ID: 0,
        })
        .then(response => {
          console.log('data', response)
          this.$api.announce
            .GET_ANNOUNCE_COMMENT({
              CONDITIONS: {
                ANNOUNCE_ID: this.$route.params.id,
              },
              SEARCH_PAGE: 0,
              SEARCH_UNIT: 9999,
            })
            .then(response => {
              const { DATA } = response
              this.comments = DATA.ITEMS || []
              setTimeout(() => {
                this.scrollToBottom()
              }, 100)
            })
        })
    },
    scrollToBottom() {
      const a = document.getElementById('main-scroll')
      if (a) {
        a.scrollTop = a.clientHeight
      }
    },
    async toggleLike(announce) {
      const params = {
        ID: announce.ID,
        REFER_ID: announce.REFER_ID,
        TYPE: announce.PAYMENT ? ANNOUNCE_TYPES.PAYMENT : ANNOUNCE_TYPES.ANNOUNCE,
        GROUP_TYPE: announce.GROUP_TYPE,
      }

      await this.$api.announce.MARK_LIKE(params)

      announce.IS_LIKE = !announce.IS_LIKE
      announce.IS_LIKE ? (announce.LIKE_COUNT += 1) : (announce.LIKE_COUNT -= 1)
    },
  },
}
</script>
<style>
.custom-announcement-page > .main-container {
  padding: 0;
}
</style>
