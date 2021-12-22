<template>
  <v2-announcement-layout
    :announce-list="announceList"
    :is-delete.sync="isDelete"
    :selected-list.sync="selectedList"
    @remove="actionRemove"
    :is-loading="$fetchState.pending"
  >
  </v2-announcement-layout>
</template>

<script>
import { announceMixin } from '../../../mixins/announce'

export default {
  name: 'Index',
  mixins: [announceMixin],
  async fetch() {
    const { DATA } = await this.$api.announce.SEARCH_ANNOUNCE()
    this.announceList = DATA.ITEMS.filter(item => item.ADMIN)
  },
}
</script>

<style scoped></style>
