<template>
  <fragment>
    <div class="comment-item">
      <div class="flex items-center sender">
        <div class="sender-ava">
          <div class="u-pic" :style="`background-image: url(${data.SCHOOL_IMG || '/img/default_school_s.jpg'})`"></div>
        </div>
        <div class="flex-1 sender-info">
          <div class="name c-role">{{ data.NAME_DESCRIPTION }}</div>
          <div class="time">{{ data.CREATED_AT | timeAgo('YYYYMMDDTHH:mm:ss') }}</div>
        </div>
      </div>
      <div class="content">
        <span>{{ truncateContent }}</span>
        <span v-if="contentLength > 100 && !showAll" class="text-blue-600 cursor-pointer" @click="showAll = true">
          {{ $t('btn_more') }}
        </span>
      </div>
      <div class="files">
        <div class="attach" :href="file.FILE_URL" v-for="(file, fKey) in data.ATTACHED_FILES" :key="fKey">
          <a class="a-tag">
            <i class="icoApp-chain"></i>
            <span class="attach-name">{{ file.FILE_NAME }}</span>
          </a>
        </div>
      </div>
    </div>
  </fragment>
</template>
<script>
export default {
  name: 'CommentItem',
  props: {
    data: {
      type: Object,
      require: true,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      showAll: false,
    }
  },
  computed: {
    truncateContent() {
      if (this.showAll) {
        return this.data.CONTENT
      }
      return this.$lodash.truncate(this.data.CONTENT, {
        length: 100,
        separator: ' ',
      })
    },
    contentLength() {
      return this.data.CONTENT.length
    },
  },
}
</script>
<style scoped>
.comment-item {
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9e9e9;
}
.comment-item:last-child {
  border-bottom: none;
}
.sender {
  margin-bottom: 8px;
}

.sender .sender-ava .u-pic {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
.sender .sender-info .name {
  /* color: #e0402a; */
  font-weight: 700;
  font-size: 14px;
  line-height: 1.3;
  margin-bottom: 3px;
}

.sender .sender-info .time {
  font-weight: 400;
  color: #bdbdbd;
  font-size: 12px;
}
.content {
  font-size: 14px;
}

.files .attach {
  margin-top: 10px;
}
.files .attach .a-tag {
  position: relative;
  padding: 7px 14px 7px 35px;
  background-color: #e0e0e0;
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
}

.files .attach .a-tag .attach-name {
  padding: 0;
}

.files .attach .icoApp-chain {
  background-position: 31.518% 36.081%;
  left: 1.07em;
  top: 8px;
}
</style>
