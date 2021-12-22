<template>
  <ms-template
    default-header-left="drawer"
    :page-title="$t('menu_announcement')"
    page-class="bg-gray-e5e5e5 is-showTab"
  >
    <template slot="headerRight">
      <a @click.prevent="isShowPopup = true" class="icoApp-search"></a>
    </template>
    <template slot="headerBottom">
      <!-- Tabs -->
      <ms-tabs v-model="currentTab" tab-name="announce" @input="updateQuery">
        <ms-tab v-for="(tab, key) in tabs" :key="key" :name="tab" />
      </ms-tabs>
    </template>
    <template slot="content">
      <!-- Popup Search -->
      <PopupSearch v-model="isShowPopup" @search="search" ref="popupSearch" />

      <!-- Announcement List -->
      <AnnouncementList
        key="receiver"
        v-if="isReceiverAnnoun"
        :announList="announList"
        :isReceiverAnnoun="isReceiverAnnoun"
        :amount="amount"
        :searchInfo="searchInfo"
        @clearSearch="clearSearch"
      />
      <AnnouncementList
        key="sent"
        v-else
        :announList="sentAnnounList"
        :isReceiverAnnoun="isReceiverAnnoun"
        :amount="amount"
        :searchInfo="searchInfo"
        @clearSearch="clearSearch"
      />
    </template>
  </ms-template>
</template>

<script>
import AnnouncementList from '@/components/announcement/List'
import PopupSearch from '@/components/announcement/PopupSearch'

export default {
  components: { PopupSearch, AnnouncementList },
  data() {
    return {
      currentTab: Number(this.$route.query.tab) || 0,
      tabs: [this.$t('btn_receive_announcement'), this.$t('btn_sent_announcement')],
      isShowPopup: false,
      isFetching: false,
      announList: [],
      sentAnnounList: [],
      amount: 0,
      searchInfo: null,
    }
  },
  methods: {
    search(data) {
      const newTab = data.isReceive ? 0 : 1

      if (this.currentTab !== newTab) {
        this.currentTab = newTab
        this.updateQuery(this.currentTab)
      }

      this.searchInfo = data
      this.fetch(data)
    },
    clearSearch() {
      this.searchInfo = null
      this.$refs.popupSearch.resetSearch()
      this.fetch()
    },
    async fetch(data = {}, isFetchAll = false) {
      this.isFetching = true
      const { formatInput } = this.$utils.datetime
      const { announceTitle, startDate, endDate, sender, children } = data

      const params = {
        ANNOUNCE_TITLE: announceTitle,
        SENDER: sender,
        STUDENT_IDS: children && children.map(el => el.CHILD_ID),
        CREATED_DATE: startDate && endDate && `${formatInput(startDate)}-${formatInput(endDate)}`,
      }

      if (isFetchAll) {
        const [announList, sentAnnounList] = await Promise.all([
          this.$api.announce.SEARCH_ANNOUNCE(params),
          this.$api.announce.SEARCH_ANNOUNCE_SENT(params),
        ])

        this.announList = this.mappingReadMoreData(announList.DATA)
        this.sentAnnounList = this.mappingReadMoreData(sentAnnounList.DATA)
        this.amount = announList.DATA.AMOUNT
        this.isFetching = false
        return
      }

      const isReceive = typeof data.isReceive === 'boolean' ? data.isReceive : this.currentTab === 0
      if (isReceive) {
        const { DATA } = await this.$api.announce.SEARCH_ANNOUNCE(params)
        this.announList = this.mappingReadMoreData(DATA)
        this.amount = DATA.AMOUNT
      } else {
        const { DATA } = await this.$api.announce.SEARCH_ANNOUNCE_SENT(params)
        this.sentAnnounList = this.mappingReadMoreData(DATA)
      }
    },

    mappingReadMoreData(data) {
      return data.ITEMS.map(item => ({
        ...item,
        readMore: item.CONTENT.length > 150,
      }))
    },

    updateQuery(tab) {
      if (tab) {
        this.$router.replace({ name: 'announcement-teacher', query: { tab } })
      } else {
        this.$router.replace({ name: 'announcement-teacher' })
      }
    },
  },
  computed: {
    isReceiverAnnoun() {
      return this.currentTab === 0
    },
  },
  created() {
    this.fetch({}, true)
  },
  watch: {
    '$route.query.tab'(tab) {
      if (this.currentTab !== tab) {
        this.currentTab = Number(tab) || 0
      }
    },
  },
}
</script>
