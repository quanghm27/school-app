export const state = () => ({
  deviceInfo: {},
})

export const mutations = {
  setDeviceInfo(state, info) {
    state.deviceInfo = info || {}
  },
}
