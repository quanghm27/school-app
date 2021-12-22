export default ({ $axios }) => ({
  GET_ALARM_UNREAD_TOTAL() {
    return $axios.$post('app/GET_ALARM_UNREAD_TOTAL')
  },
  GET_ALARM_LIST(params) {
    return $axios.$post('app/GET_ALARM_LIST' + (params.SEARCH_PAGE > 1 ? '?page=' + params.SEARCH_PAGE : ''), {
      ...params,
    })
  },
  MARK_READ_ALARM(params) {
    return $axios.$post('app/MARK_READ_ALARM', { ...params })
  },
})
