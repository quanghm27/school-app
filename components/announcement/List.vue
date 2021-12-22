<template>
  <fragment>
    <!-- Search Info -->
    <div class="appTop-noti  " v-if="searchInfo">
      <a @click="clearSearch" class="icoApp-close"></a>

      <!-- Parent: Children Selected -->
      <span>{{ searchInfo.children.map(item => item.CHILD_NAME).join(', ') }}</span>

      <!-- Teacher: Receiver, Sent announcement -->
      <span class="search-name" v-if="isTeacher">{{
        searchInfo.isReceive ? $t('text_receive_announcement') : $t('text_sent_announcement')
      }}</span>

      <!-- Common: From, To, Title, Sender -->
      <span class="search-txt">
        {{ searchInfo.startDate | formatDates('DD/MMM/YYYY') }} -
        {{ searchInfo.endDate | formatDates('DD/MMM/YYYY') }}
        {{ searchInfo.announceTitle && ', ' + searchInfo.announceTitle }}
        {{ searchInfo.sender && ', ' + searchInfo.sender }}
      </span>
    </div>

    <!-- Content -->
    <template>
      <!-- Announcement List: No data -->
      <ms-announce-blank v-if="!announListShow.length" />

      <!-- Announcement List: Data -->
      <section class="announce" v-infinite-scroll="loadMore" v-if="announListShow.length">
        <!-- AMOUNT -->
        <div class="announcePay -mx-5 mb-[16px]" v-show="amount">
          <div class="flex announcePayBlock justify-between">
            <div class="flex-auto">
              <h2 class="pay-txt">{{ $t('text_amount_pay') }}</h2>
            </div>
            <div class="flex-auto text-right">
              <a href="#">
                <p class="pay-cost c-role">{{ amount | formatMoneyVND }}</p>
              </a>
            </div>
          </div>
        </div>

        <!-- Annouce List Item -->
        <div class="newsList">
          <template v-for="(announce, ind) in announListShow">
            <AnnouncementItem
              :key="ind"
              :announce="announce"
              :isReceiverAnnoun="isReceiverAnnoun"
              :isParent="isParent"
              :toggleLike="toggleLike"
              :markView="markView"
              :readMore="readMore"
              @onShowDetail="showDetailPopup"
            />
          </template>

          <!-- Guide announcement -->
          <div class="nodata" v-if="announListShow.length">
            <div class="nodataArea">
              <i class="icoApp-alert"></i>
              <p>{{ $t('text_guide_announcement_before') }}</p>
            </div>
          </div>
        </div>
      </section>
    </template>
  </fragment>
</template>

<script>
import { mapState } from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
import AnnouncementItem from '@/components/announcement/Item'
import { ROLE } from '@/constants'

const ANNOUNCE_TYPES = {
  ANNOUNCE: 1,
  PAYMENT: 2,
}

// Emit:
// @clearSearch

export default {
  name: 'AnnouncementList',
  components: {
    AnnouncementItem,
  },
  directives: { infiniteScroll },
  props: {
    isReceiverAnnoun: {
      type: Boolean,
      default: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    announList: {
      type: Array,
      default: () => [],
    },
    searchInfo: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {
      isSearch: false,
      pager: 0,
      announListShow: [],
      announceDetail: null,
    }
  },
  computed: {
    ...mapState(['userRole']),
    isParent() {
      return this.userRole === ROLE.PARENT
    },
    isTeacher() {
      return this.userRole === ROLE.TEACHER
    },
  },
  methods: {
    loadMore() {
      this.pager++
      const items = this.announList.slice(this.pager * 10, (this.pager + 1) * 10)
      this.announListShow.push(...items)
    },
    async toggleLike(announce) {
      if (!this.isReceiverAnnoun) {
        return
      }

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
    markView(announce) {
      if (announce.IS_READ || !this.isReceiverAnnoun) {
        return
      }

      this.$api.announce.MARK_VIEW({
        ID: announce.ID,
        REFER_ID: announce.REFER_ID,
        TYPE: announce.PAYMENT ? ANNOUNCE_TYPES.PAYMENT : ANNOUNCE_TYPES.ANNOUNCE,
        GROUP_TYPE: announce.GROUP_TYPE,
      })

      announce.IS_READ = true
      announce.VIEW_COUNT += 1
    },
    readMore(announce) {
      announce.readMore = false
    },
    clearSearch() {
      this.$emit('clearSearch')
    },
    showDetailPopup(announce) {
      if (!announce.PAYMENT) {
        this.$router.push({
          name: 'announcement-teacher-id',
          params: { id: announce.ID },
          query: { type: announce.GROUP_TYPE },
        })
      }
    },
  },
  watch: {
    announList: {
      handler(val) {
        this.announListShow = val.slice(0, 10)
        this.pager = 0
      },
      immediate: true,
    },
    searchInfo() {
      document.getElementById('main-scroll').scrollTop = 0
    },
  },
  mounted() {
    document.getElementById('main-scroll').scrollTop = 0
  },
}
</script>
