export default ({ $axios }) => ({
  GET_USER_INFO(params) {
    return $axios.$post('app/GET_USER_INFO', { ...params })
  },
  ADD_SERVICE(params, segment) {
    if (segment === 'parent') {
      segment = 'parent'
    }
    return $axios.$post(`${segment}/ADD_SERVICE`, { ...params })
  },
  SWITCH_SERVICE(type) {
    return $axios.$post('auth/SWITCH_SERVICE', {
      USER_TYPE: type,
    })
  },
  GET_AVAIL_EXT_SERVICE(type) {
    return $axios.$post('app/GET_AVAIL_EXT_SERVICE')
  },
  REQUEST_OTP_ADD_CARD(params) {
    return $axios.$post('payment/REQUEST_OTP_ADD_CARD', params)
  },
  GET_CARD_INFO(studentID) {
    return $axios.$post('payment/GET_CARD_INFO', {
      STUDENT_ID: studentID,
    })
  },
})
