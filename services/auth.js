export default ({ $axios }) => ({
  async LOGIN(params) {
    return await $axios.$post('auth/LOGIN', params)
  },
  async GET_YBM_TOKEN() {
    return await $axios.$post('app/external/GET_YBM_TOKEN')
  },
  async REGISTER_APP(params) {
    return await $axios.$post('auth/REGISTER_APP', params)
  },
  async RESET_PASSWORD_APP(params) {
    return await $axios.$post('auth/RESET_PASSWORD_APP', params)
  },
  async SEND_VERIFY_CODE(params) {
    return await $axios.$post('auth/SEND_VERIFY_CODE', params)
  },
  async LOGOUT(params) {
    return await $axios.$post('auth/LOGOUT')
  },
  async GET_EVENT_TOKEN() {
    return await $axios.$post('app/event/GET_EVENT_TOKEN')
  },
  PRE_LOGIN(params) {
    return $axios.$post('auth/PRE_LOGIN', params)
  },
  LOGIN_BY_SECRET_CODE(params) {
    return $axios.$post('auth/LOGIN_BY_SECRET_CODE', params)
  },
  CHECK_LOGIN_ID(params) {
    return $axios.$post('auth/CHECK_LOGIN_ID', params)
  },
  REGISTER_THEN_LOGIN(params) {
    return $axios.$post('auth/REGISTER_THEN_LOGIN', params)
  },
})
