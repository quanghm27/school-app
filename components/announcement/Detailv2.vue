<template>
  <fragment>
    <div class="announce flex-col">
      <div class="main-container bg-white">
        <div class="newsTop1">
          <div class="flex items-center">
            <div class="newsTop-img">
              <div
                class="u-pic"
                :style="`background-image: url(${announce.SCHOOL_IMG || '/img/default_school_s.jpg'})`"
              >
                <span class="icon-new" v-if="isReceiverAnnoun && !announce.IS_READ">{{ $t('text_new') }}</span>
              </div>
            </div>
            <div class="flex-1">
              <h4 class="news-writer c-role">{{ announce.SENDER }}</h4>
              <p class="news-parent" v-if="isParent">
                {{
                  announce.GROUP_TYPE === ANNOUNCE_RECEIVER.STUDENT
                    ? announce.STUDENT_NAME
                    : `${$t('text_parents')} ${announce.STUDENT_NAME}`
                }}
              </p>
              <p class="news-date">{{ announce.DATE || announce.ISSUE_DATE | formatDates('HH:mm DD/MMM/YYYY') }}</p>
            </div>
          </div>
        </div>
        <div class="newsList-item">
          <!-- Title -->
          <h3 class="news-topic">
            {{ `${announce.TITLE}` }}
            <!-- <i :class="{ 'icoApp-N': !announce.IS_READ }" v-if="isReceiverAnnoun"></i> -->
            <span class="icon-new" v-if="isReceiverAnnoun && !announce.IS_READ">{{ $t('text_new') }}</span>
          </h3>

          <!-- Content -->
          <div class="news-info" @click="handleImgClick" v-html="getAnnounceContent()"></div>

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
          <div v-if="announce.FILE && announce.FILE.length > 0" class="newsOther">
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
                  <a
                    :class="`news-attach-1 width-file1`"
                    :href="file.URL"
                    v-for="(file, fKey) in announce.FILE"
                    :key="fKey"
                  >
                    <i class="icoApp-chain"></i>
                    <span class="attach-name">{{ file.NAME }}</span>
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
          <div class="newsViewer">
            <a class="news-count newsLike" :class="announce.IS_LIKE && 'is-active'" @click="toggleLike(announce)">
              <i class="icoApp-like"></i>
              <span class="number">{{ announce.LIKE_COUNT }}</span>
            </a>
            <span class="news-count">
              <i class="icoApp-eye" />
              <span class="number">{{ announce.VIEW_COUNT }}</span>
            </span>
          </div>
        </div>
      </div>

      <div v-if="announce.CAN_COMMENT" class="main-container">
        <list-comments :comments="comments" />
      </div>
    </div>
  </fragment>
</template>
<script>
import ListComments from './Comments.vue'
export default {
  name: 'AnnouncementDetail',
  components: { ListComments },
  props: {
    announceId: {
      type: Number || String,
      require: true,
      default: 0,
    },
    isParent: {
      type: Boolean,
      default: true,
    },
    isReceiverAnnoun: {
      type: Boolean,
      default: true,
    },
    toggleLike: {
      type: Function,
      default: () => {},
    },
    announce: {
      type: Object,
      require: true,
      default: () => {},
    },
    comments: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data() {
    return {
      // announce: {},
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
    getAnnounceContent() {
      let str = this.announce.CONTENT
      // eslint-disable-next-line
      const regex = /<img.*?src="(.*?)"[^\>]+>/g
      if (!regex.test(str)) {
        return str
      }
      const src = this.$lodash.first(
        str.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1')),
      )
      const imageWrapper = `<div class="news-img-F" data-src="${src}" style="background-image: url(${src})"><p class="news-img-note">${this.$t(
        'text_whole_img',
      )}.</p></div>`
      str = str.replace(regex, imageWrapper)
      // str += imageWrapper
      return str
    },
    handleImgClick(e) {
      if (e.target.matches('.news-img-F')) {
        this.imgSrc = e.target.getAttribute('data-src')
        this.popupImgZIndex = '999'
        this.popupImage = true
      }
    },
  },
}
</script>
<style scoped>
.announce {
  background-color: #e5e5e5;
  min-height: 100%;
  margin-bottom: 0;
  padding-top: 16px;
}
.announce .newsTop1 {
  margin: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: none;
  height: auto;
}

.announce .newsTop1 .news-writer {
  /* color: #e0402a; */
  font-size: 14px;
  margin-bottom: 2px;
}

.announce .newsTop1 .news-date {
  color: #bdbdbd;
  font-size: 12px;
}

.announce .newsTop1 .newsTop-img {
  /* width: auto; */
}

.announce .newsTop1 .newsTop-img .u-pic {
  margin-right: 10px;
  width: 36px;
  height: 36px;
}

.announce .newsList-item {
  padding: 0;
}

.announce .newsList-item .news-topic {
  font-size: 16px;
}

.announce .newsList-item .news-info {
  font-weight: 400;
}

.announce .newsList-item .newsViewer {
  border: none;
  text-align: left;
  height: auto;
  padding-bottom: 20px;
}

.announce .newsList-item .newsViewer .news-count {
  font-size: 16px;
  line-height: 1.2;
}

.announce .newsList-item .newsViewer .news-count .number {
  font-size: 14px;
}

.announce .newsList-item .newsViewer .news-count:first-child {
  margin-left: 0;
}

.announce .newsList-item .newsViewer .news-count i {
  font-size: 16px;
}
</style>
