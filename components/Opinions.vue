<template>
  <section class="report">
    <div class="reportList">
      <div class="u-box">
        <div class="reportList-item">
          <h3 class="report-topic">
            {{ opinions.COMMENT_TITLE }}
            <!-- <i class="icoApp-up" v-if="opinions.IS_CLOSE_TASK && opinions.UPDATE_AT - lastSeen > 0" /> -->
            <span class="icon-up" v-if="opinions.IS_CLOSE_TASK && opinions.UPDATE_AT - lastSeen > 0">
              Updated
            </span>
          </h3>
          <div class="report-info">
            {{ opinions.COMMENT_TERM }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Opinions',
  props: {
    opinions: {
      type: Object,
      required: true,
    },
    lastSeen: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style scoped></style>
