export default ({ $axios }) => ({
  GET_CHILD_LIST(params) {
    return $axios.$post('app/parent/GET_CHILD_LIST', { ...params })
  },
  DELETE_CHILD(params) {
    return $axios.$post('app/parent/DELETE_CHILD', { ...params })
  },
  ADD_CHILD_BY_QR(params) {
    return $axios.$post('app/parent/ADD_CHILD_BY_QR', { ...params })
  },
})
