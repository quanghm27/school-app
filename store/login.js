import { make } from 'vuex-pathify'

export const state = () => ({
  type: '',
  qr: '',
  info: {},
  phone: [],
  loginPhone: '',
  oldLoginPhone: '',
  themeClass: '',
})

export const getters = {}

export const mutations = {
  ...make.mutations(state),
  reset(state) {
    state.type = ''
    state.qr = ''
    state.info = {}
    state.phone = ''
    state.loginPhone = ''
    state.themeClass = ''
  },
}

export const actions = {
  ...make.actions(state),
}
