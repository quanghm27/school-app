import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'
import pickBy from 'lodash/pickBy'
import get from 'lodash/get'
import assign from 'lodash/assign'
import debounce from 'lodash/debounce'
import sortBy from 'lodash/sortBy'
import truncate from 'lodash/truncate'

export default function({ isDev, app }, inject) {
  const lodash = {
    cloneDeep,
    isEmpty,
    first,
    pickBy,
    get,
    assign,
    debounce,
    sortBy,
    truncate,
  }

  if (isDev) {
    Vue.prototype.$lodash = lodash
    app.$lodash = lodash
  }

  inject('lodash', lodash)
}
