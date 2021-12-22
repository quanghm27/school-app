<template>
  <ms-template :page-title="$t('menu_inquiry_history')">
    <template slot="headerRight">
      <a @click.prevent="showPopupSearch" class="icoApp-search"></a>
    </template>
    <template slot="content">
      <!-- Popup Seach -->
      <ms-popup
        :show="isShowSearch"
        :title="$t('text_search_inquiry_history')"
        :close-icon="true"
        @close="closePopupSearch"
        type="custom"
      >
        <div class="search">
          <form class="u-form" @submit.prevent="search">
            <div class="u-form-item">
              <div class="u-input-fromto">
                <div class="from">
                  <div class="u-fakeInput" data-click="0">
                    <label for="inputFrom" class="icoApp-calendar"></label>
                    <input type="date" class="is-hidden inputDate" id="inputFrom" v-model="date.from" />
                    <p v-if="date.from" class="u-fakeInput-val">{{ $utils.datetime.formatStandardDate(date.from) }}</p>
                    <p class="u-fakeInput-val placeholder" v-else>{{ $t('text_select_date') }}</p>
                  </div>
                </div>
                <i class="fromto">~</i>
                <div class="to">
                  <div class="u-fakeInput" data-click="0">
                    <label for="inputTo" class="icoApp-calendar"></label>
                    <input type="date" class="is-hidden inputDate" id="inputTo" v-model="date.to" />
                    <p v-if="date.to" class="u-fakeInput-val">
                      {{ date.to && $utils.datetime.formatStandardDate(date.to) }}
                    </p>
                    <p class="u-fakeInput-val placeholder" v-else>{{ $t('text_select_date') }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="u-form-item">
              <div class="u-select">
                <label for="inputSelect" class="arrow-D"></label>
                <select id="inputSelect" v-model="objSearch.CONDITIONS.STATUS">
                  <option :value="null">{{ $t('text_reply_all') }}</option>
                  <option v-for="(item, key) in options.status" :key="key" :value="item.id">
                    {{ item.value }}
                  </option>
                </select>
              </div>
            </div>
            <div class="u-form-item">
              <div class="u-input">
                <input type="text" :placeholder="$t('text_inquiry_title')" v-model="objSearch.CONDITIONS.TITLE" />
              </div>
            </div>
            <div class="search-reset">
              <a href="#" class="search-reset-link" @click.prevent="clearSeach">
                <i class="icoApp-reset"></i>
                {{ $t('btn_clear_filter') }}
              </a>
            </div>
            <div class="main-action">
              <a href="#" class="btn-default-S" @click.prevent="search">{{ $t('btn_search') }}</a>
            </div>
          </form>
        </div>
      </ms-popup>

      <ms-spinner v-if="$fetchState.pending" />

      <!-- Inquiry List -->
      <section class="inquiry" v-infinite-scroll="loadMore">
        <div class="inquiryList">
          <!-- No data -->
          <div class="u-box" v-if="!$fetchState.pending && !inquiryList.length">
            <div class="nodata">
              <div class="nodataArea">
                <i class="icoApp-alert"></i>
                <p v-html="$utils.common.nl2br($t('text_guide_inquiry_before'))" />
              </div>
            </div>
          </div>

          <!-- Show data with infinite scroll -->
          <template v-if="inquiryList">
            <div class="u-box" v-for="item in inquiryList" :key="item.ID">
              <a href="#" class="u-box-link" @click.prevent="redirect(item.ID)">
                <div class="inquiryList-item">
                  <div class="inquiry-status" :class="[getClassByStatus(item.STATUS)]">
                    <span>{{ $option.get('INQUIRY_STATUS', item.STATUS) }}</span>
                  </div>
                  <h2 class="inquiry-topic is-short">{{ item.TITLE }}</h2>
                  <div class="inquiry-from">
                    <span class="inquiry-date">
                      {{ $t('text_inquiry_date') }} {{ $utils.datetime.formatStandardDate(item.ASK_DATE) }}
                    </span>
                    <template v-if="checkRepliedStatus(item.STATUS)">
                      <i class="u-space"></i>
                      <span class="inquiry-date">
                        {{ $t('text_respond_date') }} {{ $utils.datetime.formatStandardDate(item.REPLY_DATE) }}
                      </span>
                    </template>
                  </div>
                </div>
              </a>
            </div>
          </template>
        </div>
      </section>
    </template>
  </ms-template>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import { INQUIRY_STATUS } from '@/constants'

const DEFAULT_PAGE = 0
const DEFAULT_UNIT = 10
const DEFAULT_CONDITIONS = {
  RECEIVED_DATE: null,
  STATUS: null,
  TITLE: null,
}
const DEFAULT_DATE_RANGE = {
  from: null,
  to: null,
}

export default {
  directives: { infiniteScroll },
  data() {
    return {
      inquiryList: [],
      searchCount: null,
      isShowSearch: false,
      options: {
        status,
      },
      date: {
        from: null,
        to: null,
      },
      objSearch: {
        SEARCH_PAGE: DEFAULT_PAGE,
        SEARCH_UNIT: DEFAULT_UNIT,
        CONDITIONS: { ...DEFAULT_CONDITIONS },
      },
    }
  },
  watch: {
    date: {
      handler() {
        const { from, to } = this.date

        if (!from || !to) {
          return
        }

        const { formatInput } = this.$utils.datetime

        this.objSearch.CONDITIONS.RECEIVED_DATE = [`${formatInput(from)}-${formatInput(to)}`]
      },
      deep: true,
    },
  },
  async fetch() {
    if (!this.options.status) {
      this.options.status = this.$option.get('INQUIRY_STATUS')
    }
    const { DATA } = await this.$api.inquiry.SEARCH_INQUIRY_HISTORY(this.objSearch)

    DATA && this.inquiryList.push(...DATA.ITEMS)
    this.searchCount = DATA ? DATA.SEARCH_COUNT : 0
  },
  computed: {
    hasMore() {
      return this.inquiryList.length < this.searchCount
    },
  },
  methods: {
    async search() {
      this.closePopupSearch()

      this.inquiryList = []
      this.objSearch.SEARCH_PAGE = DEFAULT_PAGE

      const { DATA } = await this.$api.inquiry.SEARCH_INQUIRY_HISTORY(this.objSearch)

      this.inquiryList = DATA ? [...DATA.ITEMS] : []
      this.searchCount = DATA ? DATA.SEARCH_COUNT : 0
    },
    clearSeach() {
      this.date = { ...DEFAULT_DATE_RANGE }
      this.objSearch = {
        SEARCH_PAGE: DEFAULT_PAGE,
        SEARCH_UNIT: DEFAULT_UNIT,
        CONDITIONS: { ...DEFAULT_CONDITIONS },
      }
    },
    loadMore() {
      if (this.hasMore) {
        this.objSearch.SEARCH_PAGE += 1

        this.$fetch()
      }
    },
    showPopupSearch() {
      this.isShowSearch = true
    },
    closePopupSearch() {
      this.isShowSearch = false
    },
    redirect(id) {
      this.$router.push({ name: 'inquiry-id', params: { id } })
    },
    checkRepliedStatus(status) {
      return [INQUIRY_STATUS.REPLIED, INQUIRY_STATUS.UNRESOLVABLE].includes(status)
    },
    getClassByStatus(status) {
      return this.checkRepliedStatus(status) ? 'is-complete' : ''
    },
  },
}
</script>
