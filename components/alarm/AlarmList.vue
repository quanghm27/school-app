<template>
  <div class="newsList">
    <!-- Loading -->
    <ms-spinner v-if="loading" />
    <!-- Show data with infinite scroll -->
    <template>
      <div class="u-box" v-for="(item, index) in data" :key="index">
        <a @click.prevent="handlerClickAlarmItem(item)" class="u-box-link">
          <div :class="['newsList-item', { 'is-showImg-R': item.IMG_URL && imgSize === 'thumb' }]">
            <div
              class="news-showImg-R"
              v-if="item.IMG_URL && imgSize === 'thumb'"
              :style="`background-image: url(${item.IMG_URL})`"
            ></div>
            <h3 class="news-topic">
              {{ item.NAME }}
              <!-- <i v-if="!item.IS_READ" class="icoApp-N"></i> -->
              <span class="icon-new" v-if="!item.IS_READ">{{ $t('text_new') }}</span>
            </h3>
            <div class="news-from">
              <template v-if="item.RECEIVER_NAME">
                <span class="news-writer">{{ item.RECEIVER_NAME }}</span>
                <i class="u-space"></i>
              </template>
              <span class="news-date">{{ $utils.datetime.format(item.RECEIVER_DATE) }}</span>
            </div>
            <div class="news-info is-short">{{ item.DETAIL }}</div>
            <div
              class="news-img-F"
              v-if="item.IMG_URL && imgSize === 'full'"
              :style="`background-image: url(${item.IMG_URL})`"
            ></div>
          </div>
        </a>
      </div>
      <ms-spinner v-if="loading && infiniteLoading" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'AlarmList',
  props: {
    data: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    imgSize: {
      type: String,
      required: false,
      default: 'full',
    },
    infiniteLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    async handlerClickAlarmItem(item) {
      this.$utils.app.dispatch({ type: 'CLEAR_NOTIFICATION', payload: item.ID })
      if (!item.IS_READ) {
        const { RESULT } = await this.$api.alarm.MARK_READ_ALARM({
          ID: item.ID,
        })

        if (RESULT === 'SUCCESS') {
          item.IS_READ = true
        }
      }

      if (this.$route.name !== 'alarm') {
        this.$router.push({ name: 'alarm' })
      }
    },
  },
}
</script>
