export default ({ $axios }) => ({
  SEARCH_ANNOUNCE(params) {
    return $axios.$post('app/SEARCH_ANNOUNCE', { ...params })
  },
  SEARCH_ANNOUNCE_SENT(params) {
    return $axios.$post('app/SEARCH_ANNOUNCE_SENT', { ...params })
  },
  SEARCH_RECEIVER_GROUP_STUDENT(params) {
    return $axios.$post('receiver/SEARCH_RECEIVER_GROUP_STUDENT', params)
  },
  SEARCH_RECEIVER_GROUP_PARENT(params) {
    return $axios.$post('receiver/SEARCH_RECEIVER_GROUP_PARENT', params)
  },
  SEARCH_RECEIVER_GROUP_TEACHER(params) {
    return $axios.$post('receiver/SEARCH_RECEIVER_GROUP_TEACHER', params)
  },
  SEARCH_RECEIVER_STUDENT(params) {
    return $axios.$post('receiver/SEARCH_RECEIVER_STUDENT', params)
  },
  SEARCH_RECEIVER_PARENT(params) {
    return $axios.$post('receiver/SEARCH_RECEIVER_PARENT', params)
  },
  SEARCH_RECEIVER_TEACHER(params) {
    return $axios.$post('receiver/SEARCH_RECEIVER_TEACHER', params)
  },
  async NEW_ANNOUNCE(params) {
    return await $axios.$post('announce/NEW_ANNOUNCE', params)
  },
  async DELETE_ANNOUNCE(params) {
    return await $axios.$post('announce/DELETE_ANNOUNCE', params)
  },
  //Giáo viên và Admin
  async DELETE_ANNOUNCE_OF_RECEIVER(params) {
    return await $axios.$post('announce/DELETE_ANNOUNCE_OF_RECEIVER ', params)
  },
  async DELETE_RECEIVER_ANNOUNCE(params) {
    return await $axios.$post('announce/DELETE_RECEIVER_ANNOUNCE ', params)
  },
  MARK_LIKE(params) {
    return $axios.$post('app/MARK_LIKE', params)
  },
  MARK_VIEW(params) {
    return $axios.$post('app/MARK_VIEW', params)
  },
  GET_RECEIVER_READ(params) {
    return $axios.$post('app/GET_RECEIVER_READ', params)
  },
  GET_DETAIL_ANNOUNCE(params) {
    return $axios.$post('app/GET_DETAIL_ANNOUNCE', params)
  },
  GET_ANNOUNCE_COMMENT(params) {
    return $axios.$post('app/GET_ANNOUNCE_COMMENT', params)
  },
  ADD_ANNOUNCE_COMMENT(params) {
    return $axios.$post('app/ADD_ANNOUNCE_COMMENT', params)
  },
})
