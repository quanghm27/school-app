import Vue from 'vue'
import * as utilsHelper from '../helpers/utils'
import validateHelper from '../helpers/validate'
import datetimeHelper from '../helpers/datetime'
import optionHelper from '../helpers/option'
import fileHelper from '../helpers/file'
import appHelper from '../helpers/app'
import errorCode from '../constants/error'
import * as constants from '../constants'

export default function({ store, app, isDev }, inject) {
  const notify = {
    /**
     * Support show by lang of key
     * ex1: this.$notify.show('pop_error_different_password')
     * ex2: this.$notify.show({
     *   title: this.$t('pop_error_different_password_title'),
     *   message: this.$t('pop_error_different_password_msg')
     * })
     * @param params
     * @param type
     */
    show(params, type = 'notify') {
      let { title, message, errors, cbConfirm, cbClose } = params
      if (!title && !message && typeof params === 'string') {
        const lang = utils.trans.getByKey(params)
        title = lang.title
        message = lang.message
      }

      store.commit('setPopupInfo', {
        title,
        type,
        message,
        errors,
        cbConfirm,
        cbClose,
        visible: true,
      })
    },
    /**
     * Support show by lang of key
     * ex1: this.$notify.error('pop_error_different_password')
     * ex2: this.$notify.error({
     *   title: this.$t('pop_error_different_password_title'),
     *   message: this.$t('pop_error_different_password_msg')
     * })
     * @param params
     */
    error(params) {
      this.show(params, 'error')
    },
    hide() {
      store.commit('setPopupInfo', {
        visible: false,
      })
    },
  }

  const { i18n, $moment } = app
  const utils = {
    common: utilsHelper,
    app: appHelper(),
    validate: validateHelper,
    file: fileHelper({ notify, $moment }),
    trans: {
      getByCode(code, pop = false) {
        const keyOfLang = errorCode[code]
        return pop ? this.getByKey(keyOfLang) : i18n.t(keyOfLang)
      },
      getByKey(keyOfLang) {
        return {
          title: i18n.t(`${keyOfLang}_title`),
          message: i18n.t(`${keyOfLang}_msg`),
        }
      },
    },
    datetime: datetimeHelper({ $moment }),
  }

  const option = optionHelper({ store })

  if (isDev) {
    app.$const = constants
    Vue.prototype.$const = constants

    app.$utils = utils
    Vue.prototype.$utils = utils
    store.$utils = utils

    app.$option = option
    Vue.prototype.$option = option

    app.$notify = notify
    Vue.prototype.$notify = notify

    app.$appVersion = window.appVersion || '1.0.0'
    Vue.prototype.$appVersion = window.appVersion || '1.0.0'
  }

  inject('utils', utils)
  inject('const', constants)
  inject('option', option)
  inject('notify', notify)
  inject('appVersion', window.appVersion || '1.0.0')

  window.onNuxtReady(() => {
    // Nuxt.js is ready and mounted
    store.commit('device/setDeviceInfo', window.deviceInfo)
    utils.app.dispatch({ type: 'APP_LOADED' })
  })
}
