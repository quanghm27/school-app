import { JWT_TOKEN_MINIGAME, DEFAULT_LANGUAGE } from '../constants'

export default function({ $axios, store, redirect, app, error, $config, isDev }, inject) {
  let apiURL = $config.miniGameEndpoint

  const axios2 = $axios.create()

  axios2.setBaseURL(apiURL)

  axios2.onRequest(config => {
    // Ignore handle error on response by flag
    const configData = config.data || {}
    const { clientOptions } = configData
    if (clientOptions) {
      config.headers.common['Client-Error-Handler'] = clientOptions.errorHandler
      if (typeof clientOptions === 'object') {
        delete configData.clientOptions
      }
    }

    config.headers.Authorization = `JWT ${sessionStorage.getItem(JWT_TOKEN_MINIGAME)}`

    config.headers['Accept-Language'] = window.locale || DEFAULT_LANGUAGE

    return config
  })

  axios2.onResponse(response => {
    const { RESULT } = response.data
    const ERR_CODE = response.data.ERR_CODE || response.data.ERROR_CODE

    if (RESULT === 'FAIL' && ERR_CODE) {
      const errorHandler = response.config.headers['Client-Error-Handler']
      if (errorHandler !== false) {
        const { title, message } = app.$utils.trans.getByCode(ERR_CODE, true)
        app.$notify.error({ title, message })
      }

      // Require re-login
      if (app.$const.NEED_LOGOUT_CODES.includes(ERR_CODE)) {
        store.dispatch('logout')
      }

      if (ERR_CODE === 'D9999') {
        app.$notify.error({
          title: 'Request error',
          message: 'Required request body is missing!',
        })
      }
    }

    return response
  })

  axios2.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/error/400')
      console.log('Error 400')
    }
    if (code === 403) {
      // redirect('/error/403')
      console.log('Error 403')
    }
    if (code === 503) {
      // redirect('/error/503')
      console.log('Error 503')
    }
    if (code === 504) {
      // redirect('/error/504')
      console.log('Error 504')
    }
    console.log('Sorry error!')
    redirect('/error/sorry')
  })

  inject('axios2', axios2)
}
