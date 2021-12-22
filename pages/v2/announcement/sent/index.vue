<template>
  <v2-announcement-layout
    :announce-list="announceList"
    :is-delete.sync="isDelete"
    :selected-list.sync="selectedList"
    @remove="actionRemove"
    :is-loading="$fetchState.pending"
    @refetch-alarm="$fetch()"
  >
  </v2-announcement-layout>
</template>

<script>
import { announceMixin } from '../../../../mixins/announce'

export default {
  name: 'Index',
  mixins: [announceMixin],
  provide() {
    return {
      refetch: () => this.$fetch(),
    }
  },
  async fetch() {
    await this.fetchAnnouncesSent()
  },
  methods: {
    async fetchAnnouncesSent() {
      const { DATA } = await this.$api.announce.SEARCH_ANNOUNCE_SENT()
      this.announceList = DATA.ITEMS
    },
  },
}
</script>

<style scoped></style>
