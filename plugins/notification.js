// class Notification
import Vue from 'vue'
import NMessageBox from '../components/common/NMessageBox.vue'
import { isVNode } from '~/helpers/utils'
const NotificationConstructor = Vue.extend(NMessageBox)

export default function({ app, store, $lodash, isDev }, inject) {
  const message = {
    message(options) {
      options = $lodash.assign(
        { visible: true, type: 'error', buttonText: 'Đóng', title: '', message: '', htmlFormat: false },
        options,
      )

      const id = 'notification_' + Math.random(1, 10)

      const instance = new NotificationConstructor({
        data: options,
      })

      if (isVNode(options.message)) {
        instance.$slots.default = [options.message]
        options.message = 'REPLACED_BY_VNODE'
      }

      instance.id = id
      instance.$mount()
      document.body.appendChild(instance.$el)
    },
  }

  if (isDev) {
    Vue.prototype.$messageBox = message
    app.$messageBox = message
    store.$messageBox = message
  }

  inject('messageBox', message)
}
