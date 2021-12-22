<template>
  <ms-template :page-title="$t('menu_inquiry_details')">
    <!-- Loading -->
    <ms-spinner v-if="$fetchState.pending" />

    <section class="inquiry" v-else>
      <div class="inquiryTop">
        <div class="inquiry-status" :class="getClassByStatus(inquiryDetail.STATUS)">
          <span>{{ $option.get('INQUIRY_STATUS', inquiryDetail.STATUS) }}</span>
        </div>
        <h2 class="inquiry-topic">{{ inquiryDetail.TITLE }}</h2>
        <div class="inquiry-from">
          <span class="inquiry-date">
            {{ $t('text_inquiry_date') }} {{ $utils.datetime.formatStandardDate(inquiryDetail.ASK_DATE) }}
          </span>
          <template v-if="checkRepliedStatus(inquiryDetail.STATUS)">
            <i class="u-space"></i>
            <span class="inquiry-date">
              {{ $t('text_respond_date') }} {{ $utils.datetime.formatStandardDate(inquiryDetail.REPLY_DATE) }}
            </span>
          </template>
        </div>
      </div>
      <div class="inquiryView">
        <div class="inquiry-ask">
          <h4 class="inquiry-type">{{ $t('text_inquiry_contents') }}</h4>
          <p>{{ $utils.common.nl2br(inquiryDetail.QUESTION) }}</p>
        </div>
        <div class="inquiry-ans">
          <h4 class="inquiry-type">{{ $t('text_reply_contents') }}</h4>
          <p>{{ $utils.common.nl2br(inquiryDetail.ANSWER) }}</p>
        </div>
      </div>
    </section>
  </ms-template>
</template>

<script>
import { INQUIRY_STATUS } from '@/constants'

export default {
  data() {
    return {
      inquiryDetail: {
        ID: null,
        TITLE: null,
        ASK_DATE: null,
        REPLY_DATE: null,
        QUESTION: null,
        ANSWER: null,
      },
    }
  },
  async fetch() {
    const { DATA } = await this.$api.inquiry.GET_DETAIL({ ID: this.$route.params.id })

    this.inquiryDetail = DATA || {}
  },
  methods: {
    checkRepliedStatus(status) {
      return [INQUIRY_STATUS.REPLIED, INQUIRY_STATUS.UNRESOLVABLE].includes(status)
    },
    getClassByStatus(status) {
      return this.checkRepliedStatus(status) ? 'is-complete' : ''
    },
  },
}
</script>

<style scoped>
.inquiryView {
  overflow-wrap: break-word;
}
</style>
