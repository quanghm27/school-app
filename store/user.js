export const state = () => ({
  service: null,
  loginInfo: {},
})

export const getters = {
  loginInfo: state => state.loginInfo,
}

export const mutations = {
  setService(state, service) {
    state.service = service
  },
  setLoginInfo(state, info) {
    state.loginInfo = info
  },
}
