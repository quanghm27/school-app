export default ({ $axios }) => ({
  CHANGE_EMAIL(params) {
    return $axios.$post('app/CHANGE_EMAIL', { ...params })
  },
  CHANGE_NICKNAME(params) {
    return $axios.$post('app/CHANGE_NICKNAME', { ...params })
  },
  CHANGE_PASSWORD(params) {
    return $axios.$post('app/CHANGE_PASSWORD', { ...params })
  },
  GET_MY_INFO(params) {
    return $axios.$post('app/GET_MY_INFO', { ...params })
  },
  GET_VERSION_INFO(params) {
    return $axios.$post('app/GET_VERSION_INFO', { ...params })
  },
  SEND_VERIFY_CODE(params) {
    return $axios.$post('app/SEND_VERIFY_CODE', { ...params })
  },
  GET_SETTING_INFO() {
    return $axios.$post('app/GET_SETTING_INFO')
  },
  RECEIVE_ADVERTISING(params) {
    return $axios.$post('app/RECEIVE_ADVERTISING', { ...params })
  },
  RECEIVE_INFO_SCHOOL(params) {
    return $axios.$post('app/RECEIVE_INFO_SCHOOL', { ...params })
  },
})
