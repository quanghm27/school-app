<template>
  <fragment>
    <div class="u-box u-box-v2 px-[16px] !mb-[16px] !rounded">
      <div class="newsTop !m-0" @click="showDetail(announce)">
        <ul class="u-tb">
          <li class="newsTop-img">
            <div
              class="u-pic"
              :style="{
                backgroundImage: `url(${announce.SCHOOL_IMG || require('~/assets/img/announcement/school.svg')})`,
              }"
            >
              <span class="icon-new icon-bg-red" v-if="isReceiverAnnoun && !announce.IS_READ">
                {{ $t('text_new') }}
              </span>
            </div>
          </li>
          <li class="pl-[16px]">
            <h4 class="news-writer">{{ announce.TITLE }}</h4>
            <div class="flex">
              <div class="flex-auto">
                <p class="news-parent c-role" v-if="isParent">
                  <template v-if="announce.GROUP_TYPE === ANNOUNCE_RECEIVER.STUDENT">
                    {{ announce.STUDENT_NAME }}
                  </template>
                  <template v-else>{{ $t('text_parents') }} {{ announce.STUDENT_NAME }}</template>
                </p>
              </div>
              <div class="flex-auto text-right whitespace-nowrap">
                <p class="news-date">{{ announce.DATE || announce.ISSUE_DATE | formatDates('DD/MM/YYYY') }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="newsList-item">
        <div @click="showDetail(announce)">
          <!-- Content -->
          <div class="news-info two-lines" style="-webkit-box-orient: vertical;" v-html="contentWithoutTags"></div>

          <!-- Link -->
          <a v-if="announce.LINK" :href="announce.LINK" target="_blank" class="u-link">{{ announce.LINK }}</a>

          <!-- Image -->
          <nuxt-link
            v-if="announce.IMAGE"
            class="news-img-F"
            :to="{ name: 'image', query: { image: announce.IMAGE } }"
            :style="`background-image: url(${announce.IMAGE})`"
          >
            <p class="news-img-note">{{ $t('text_whole_img') }}</p>
          </nuxt-link>

          <!-- File -->
          <div class="newsOther" v-if="announce.FILE && announce.FILE.length > 0">
            <ul class="u-tb">
              <li>
                <div :class="['news-attach', 'width-container', { 'is-multi': isMultiFile }]">
                  <!-- <a
                    v-for="(file, index) in announce.FILE"
                    :key="file.NAME"
                    :class="`news-attach-${index + 1} ${index === 0 ? 'width-file1' : 'width-file2'}`"
                  >
                    <i class="icoApp-chain"></i>
                    <a @click="$utils.app.dispatch({ type: 'DOWNLOAD_FILE', payload: file })">
                      <span class="attach-name">{{ file.NAME }}</span>
                    </a>
                  </a> -->
                  <a :class="`news-attach-1 width-file1`">
                    <i class="icoApp-chain"></i>
                    <a @click="$utils.app.dispatch({ type: 'DOWNLOAD_FILE', payload: announce.FILE[0] })">
                      <span class="attach-name">{{ announce.FILE[0].NAME }}</span>
                    </a>
                  </a>
                  <a
                    v-if="isMultiFile"
                    :class="`news-attach-2 width-file2`"
                    style="margin-left: -3.5em; line-height: 30px;"
                  >
                    + {{ announce.FILE.length - 1 }}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <!-- Payment -->
          <div class="newsPay" v-if="announce.PAYMENT">
            <div :class="['payBox', { 'is-disable': announce.PAYMENT.IS_PAID }]">
              <h2 class="pay-txt">{{ announce.PAYMENT.TITLE }}</h2>
              <p class="pay-cost">{{ announce.PAYMENT.AMOUNT | formatMoneyVND }}</p>
              <!-- TODO -->
              <!-- <nuxt-link :to="{ name: 'payment' }" :event="announce.PAYMENT.IS_PAID ? '' : 'click'" class="btn-pay">
                {{ announce.PAYMENT.IS_PAID ? $t('btn_payment_complete') : $t('btn_payment') }}
              </nuxt-link> -->
            </div>
          </div>

          <!-- Sent Announcement -->
          <div class="newsSend" v-if="!isReceiverAnnoun">
            <a href="#" v-if="announce.STATUS">
              <span>{{ $t('text_read') }}</span>
              <span class="c-role">{{ announce.STATUS.READ_COUNT }}</span>
              <i class="u-space"></i>
              <span>{{ $t('text_unread') }}</span>
              <span class="c-role">{{ announce.STATUS.RECEIVER_COUNT - announce.STATUS.READ_COUNT }}</span>
              <i class="u-space"></i>
              <span>{{ $t('text_all') }}</span>
              <span class="c-role">{{ announce.STATUS.RECEIVER_COUNT }}</span>
            </a>
            <nuxt-link
              :to="{ name: 'announcement-teacher-id', params: { id: announce.ID } }"
              class="icoApp-view"
            ></nuxt-link>
          </div>
        </div>
        <div class="newsViewer flex items-center">
          <a
            class="new-icon new-icon-like flex items-center text-sm"
            :class="announce.IS_LIKE && 'is-active'"
            @click="toggleLike(announce)"
          >
            {{ announce.LIKE_COUNT }}
          </a>
          <span class="new-icon new-icon-eye flex items-center text-sm">
            {{ announce.VIEW_COUNT }}
          </span>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import { ANNOUNCE_RECEIVER } from '@/constants'

export default {
  name: 'AnnouncementItem',
  props: {
    isParent: {
      type: Boolean,
      default: true,
    },
    isReceiverAnnoun: {
      type: Boolean,
      default: true,
    },
    announce: {
      type: Object,
      default: () => {},
    },
    toggleLike: {
      type: Function,
      default: () => {},
    },
    markView: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      ANNOUNCE_RECEIVER,
    }
  },
  computed: {
    isMultiFile() {
      return this.announce.FILE && this.announce.FILE.length > 1
    },
    contentWithoutTags() {
      let str = this.announce.CONTENT
      if (str === null || str === '') return false
      else str = str.toString()
      return str.replace(/(<([^>]+)>)/gi, '')
    },
  },
  methods: {
    showDetail(announce) {
      this.$emit('onShowDetail', announce)
      this.markView(announce)
    },
  },
}
</script>

<style>
.newsOther {
  margin-top: 15px;
  min-height: 34px;
}
.news-img-F {
  margin-top: 15px;
}
.news-img-F .news-img-note {
  line-height: 1.6;
}
.news-info {
  padding-top: 0;
  margin-top: 0;
}
.two-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 20px;
  max-height: 40px;
  opacity: 0.6;
  -webkit-line-clamp: 2;
}
.icon-bg-red.icon-new {
  padding: 0 8px;
  color: #ffffff;
  background-color: #ff4d4f;
  border-radius: 10px;
  text-align: center;
  font-size: 12px;
}
</style>
