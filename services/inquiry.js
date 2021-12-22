export default ({ $axios }) => ({
  CREATE_INQUIRY(params) {
    return $axios.$post('app/inquiry/CREATE_INQUIRY', params)
  },
  GET_DETAIL(params) {
    return $axios.$post('app/inquiry/GET_DETAIL', params)
  },
  SEARCH_INQUIRY_HISTORY(params) {
    return $axios.$post('app/inquiry/SEARCH_INQUIRY_HISTORY', params)
  },
  SEND_INQUIRY(params) {
    return $axios.$post('landing/SEND_INQUIRY', params)
  },
})
