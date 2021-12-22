import pathify from 'vuex-pathify'
import { ROLES, OPTION_TYPE, ACCESS_TOKEN, JWT_TOKEN_MINIGAME, SHOW_BANNER } from '../constants'

export const plugins = [pathify.plugin]

export const state = () => ({
  initialized: false,
  userRole: null,
  isMainTeacher: false,
  isSchoolAdmin: false,
  userInfo: null,
  showPopup: false, // any popup show
  commonOptions: null,
  lessonStartTimes: [],
  lessonAfternoonStartTimes: 0,
  lessonFormat: [],
  currentTerm: null,
  currentYear: null,
  rangeTerm: {},
  popupInfo: {
    // notify popup
    title: null,
    visible: false,
    errors: null,
    message: null,
    cbConfirm: () => {},
    cbClose: () => {},
  },
})

export const getters = {
  getOptionByKey: state => (key, id) => {
    const result = state.commonOptions.find(item => item.key === key)
    const options = result ? result.options : null
    if (typeof id === 'undefined') {
      return options
    }
    if (options && id) {
      const option = options.find(e => e.id === id)
      return option ? option.value : null
    }
    return null
  },
}

export const mutations = {
  setInitialized(state, initialized) {
    state.initialized = initialized
  },
  setShowPopup(state, showPopup) {
    state.showPopup = showPopup
  },
  setUserRole(state, roleName) {
    state.userRole = roleName
  },
  setUserInfo(state, user) {
    state.userInfo = user
  },
  setMainTeacher(state, payload) {
    state.isMainTeacher = payload
  },
  setSchoolAdmin(state, payload) {
    state.isSchoolAdmin = payload
  },
  setPopupInfo(state, { title, visible, errors, message, type, cbConfirm, cbClose }) {
    state.popupInfo = {
      cbConfirm: cbConfirm || (() => {}),
      cbClose: cbClose || (() => {}),
      title: title || null,
      visible: visible || false,
      errors: errors || null,
      message: message || null,
      type: type || 'notify',
    }
  },
  setCommonOptions(state, options) {
    state.commonOptions = options
  },
  setLessonStartTimes(state, startTimes) {
    state.lessonStartTimes = startTimes
  },
  setLessonAfternoonStartTimes(state, startTimes) {
    state.lessonAfternoonStartTimes = startTimes
  },
  setLessonFormat(state, format) {
    state.lessonFormat = format
  },
  setCurrentTermYear(state, termInfo) {
    if (!termInfo) return

    state.currentTerm = termInfo.TERM
    state.currentYear = termInfo.BASE_YEAR
    state.rangeTerm = {
      start: termInfo.CLASS_START_DATE,
      end: termInfo.CLASS_END_DATE,
    }
  },
}

export const actions = {
  async nuxtClientInit({ app, commit, state }) {
    if (!state.initialized) {
      this.$utils.app.on('NAVIGATE', route => this.$router.push(route))
      this.$utils.app.on('BACK', () => {
        const { name } = this.$router.currentRoute
        if (state.showPopup) {
          commit('setShowPopup', false)
        } else if (name === 'index' || name === 'auth-login-select-role') {
          this.$utils.app.dispatch({ type: 'EXIT' })
        } else {
          this.$router.back()
        }
      })
    }

    commit('setInitialized', true)

    if (!this.$cookiz.get(ACCESS_TOKEN) && !sessionStorage.getItem(ACCESS_TOKEN)) {
      return
    }

    const api = this.$api
    let [userResponse, optionResponse] = await Promise.all([api.user.GET_USER_INFO(), api.common.GET_OPTIONAL_INFO()])

    if (userResponse.RESULT === 'SUCCESS' && userResponse.DATA) {
      const data = userResponse.DATA

      this.$utils.app.dispatch({ type: 'GET_USER_INFO_SUCCESS', payload: data })

      commit('setMainTeacher', data.IS_MAIN_TEACHER)
      commit('setSchoolAdmin', data.IS_SCHOOL_ADMIN)
      commit('setUserInfo', data)

      if (!data?.CURRENT_ROLE) {
        commit('setUserRole', null)
      } else {
        const role = ROLES.find(e => e.id === parseInt(data.CURRENT_ROLE))
        commit('setUserRole', role.name)

        const { DATA, RESULT } = await api.common.GET_CURRENT_SEMESTER()
        if (RESULT === 'SUCCESS') {
          commit('setCurrentTermYear', DATA)
        }
      }
    }
    if (optionResponse.RESULT === 'SUCCESS') {
      let commonOptions = optionResponse.DATA.ITEMS.map(item => {
        let optionKey = Object.keys(OPTION_TYPE).find(key => OPTION_TYPE[key] === item.OPT_TYPE)
        if (optionKey) {
          return {
            key: optionKey,
            options: item.OPT_INFO.map(info => {
              return {
                id: info.ID,
                value: info.VALUE,
              }
            }),
          }
        }
      })

      commonOptions = commonOptions.filter(e => e)
      commit('setCommonOptions', commonOptions)
    }
  },
  switchUserRole({ commit }, role) {
    commit('setUserRole', role)
  },
  async logout({ commit, state }) {
    // Call api invalid token here
    const { RESULT } = await this.$api.auth.LOGOUT()
    if (RESULT === 'SUCCESS') {
      this.$utils.app.dispatch({ type: 'LOGOUT', payload: state.userInfo })
      commit('setUserInfo', null)
      this.$cookiz.remove(ACCESS_TOKEN)
      this.$utils.app.dispatch({ type: 'FLUSH_COOKIES' })
      sessionStorage.removeItem(ACCESS_TOKEN)
      sessionStorage.removeItem(JWT_TOKEN_MINIGAME)
      sessionStorage.removeItem(SHOW_BANNER)
      this.$router.push('/auth/login/select-role', () => {
        commit('setUserRole', null)
      })
    }
  },
}
