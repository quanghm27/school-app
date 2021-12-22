<template>
  <fragment>
    <div class="comments">
      <comment-item v-for="(value, key) in comments" :key="key" :data="value" />
    </div>
  </fragment>
</template>
<script>
import CommentItem from './CommentItem.vue'
export default {
  name: 'ListComments',
  components: { CommentItem },
  props: {
    comments: {
      type: Array,
      require: true,
      default: () => {
        return []
      },
    },
  },
}
</script>
<style scoped>
.comments {
}
</style>
