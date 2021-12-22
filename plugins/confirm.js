// class Confirm
import Vue from 'vue'
import NConfirm from '../components/common/NConfirm.vue'
import { isVNode } from '~/helpers/utils'
const ConfirmConstructor = Vue.extend(NConfirm)

export default function({ app, store, $lodash, isDev }, inject) {
  const confirm = {
    confirm(options) {
      options = $lodash.assign({ isPrompt: false, title: '', message: '', htmlFormat: false }, options)

      const id = 'confirm_' + Math.random(1, 10)

      const instance = new ConfirmConstructor({
        data: options,
      })

      if (isVNode(options.message)) {
        instance.$slots.default = [options.message]
        options.message = 'REPLACED_BY_VNODE'
      }

      instance.id = id
      instance.$mount()
      document.body.appendChild(instance.$el)
      Vue.nextTick(() => {
        instance.visible = true
      })
      return instance
    },
  }

  if (isDev) {
    Vue.prototype.$confirm = confirm
    app.$confirm = confirm
    store.$confirm = confirm
  }

  inject('confirm', confirm)
}
