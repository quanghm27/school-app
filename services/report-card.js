export default ({ $axios }) => ({
  GET_LIST_TERM(params) {
    return $axios.$post('app/report/GET_LIST_TERM', { ...params })
  },
  GET_REPORT_CARD(params) {
    return $axios.$post('app/report/GET_REPORT_CARD', { ...params })
  },
  UPDATE_LAST_SEEN_REPORT_CARD(params) {
    return $axios.$post('app/report/UPDATE_LAST_SEEN_REPORT_CARD', { ...params })
  },
})
