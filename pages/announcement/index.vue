<template>
  <ms-template
    default-header-left="drawer"
    :show-bottom-nav="false"
    page-class="bg-gray-e5e5e5"
    :page-title="this.$t('menu_announcement')"
  >
    <template slot="headerLeft">
      <ms-back />
    </template>
    <template slot="headerRight">
      <a @click.prevent="isShowPopup = true" class="icoApp-search"></a>
    </template>
    <template slot="content">
      <ms-spinner v-if="isFetching" />
      <template v-else>
        <PopupSearch v-model="isShowPopup" @search="search" />
        <AnnouncementList
          :announList="announList"
          :amount="amount"
          :searchInfo="searchInfo"
          :isReceiverAnnoun="true"
          @clearSearch="clearSearch"
        />
      </template>
    </template>
  </ms-template>
</template>

<script>
import PopupSearch from '@/components/announcement/PopupSearch'
import AnnouncementList from '@/components/announcement/List'

export default {
  components: { PopupSearch, AnnouncementList },
  data() {
    return {
      isFetching: false,
      isShowPopup: false,
      announList: [],
      amount: 0,
      searchInfo: null,
    }
  },
  methods: {
    search(data) {
      this.searchInfo = data
      this.fetch(data)
    },
    clearSearch() {
      this.searchInfo = null
      this.fetch()
    },
    async fetch(data = {}) {
      this.isFetching = true
      const { formatInput } = this.$utils.datetime
      const { announceTitle, startDate, endDate, sender, children } = data

      const params = {
        ANNOUNCE_TITLE: announceTitle,
        SENDER: sender,
        STUDENT_IDS: children && children.map(el => el.CHILD_ID),
        CREATED_DATE: startDate && endDate && `${formatInput(startDate)}-${formatInput(endDate)}`,
      }

      const { DATA } = await this.$api.announce.SEARCH_ANNOUNCE(params)

      this.announList = DATA.ITEMS.map(item => ({
        ...item,
        readMore: item.CONTENT.length > 150,
      }))

      this.amount = DATA.AMOUNT

      this.isFetching = false
    },
  },
  created() {
    this.fetch()
  },
}
</script>
