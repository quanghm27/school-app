<template>
  <ms-popup :show="show" :title="$t('text_comment')" :close-icon="true" type="custom" v-on="$listeners">
    <template>
      <div class="commentArea">
        <div class="comment-info">
          <ul class="u-tb">
            <li>{{ $t('text_school_year') }}</li>
            <i18n tag="li" :path="term === 0 ? 'text_myclass_info_overall' : 'text_myclass_info'">
              <span v-if="term > 0">{{ term }}</span>
              <span>{{ baseYear | formatSchoolYear }}</span>
            </i18n>
          </ul>
          <ul class="u-tb">
            <li>{{ $t('text_student') }}</li>
            <li>{{ studentName }}</li>
          </ul>
        </div>
        <div class="commentBox">
          <h3 class="comment-title">{{ subName }}</h3>
          <p>{{ comment }}</p>
        </div>
      </div>
    </template>
  </ms-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    term: {
      type: Number,
      required: true,
    },
    baseYear: {
      type: Number,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    subName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
