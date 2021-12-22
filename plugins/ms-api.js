import Vue from 'vue'
import common from '../services/common'
import auth from '../services/auth'
import user from '../services/user'
import alarm from '../services/alarm'
import timetable from '../services/timetable'
import attendance from '../services/attendance'
import announce from '../services/announcement'
import report from '../services/report-card'
import contact from '../services/contact'
import parent from '../services/parent'
import inquiry from '../services/inquiry'
import setting from '../services/setting'
import garbage from '../services/garbage'
import miniGame from '@/services/miniGame'
import score from '@/services/score'

export default function({ $axios, app, store, $axios2, isDev }, inject) {
  const api = {
    common: common({ $axios, app }),
    auth: auth({ $axios }),
    user: user({ $axios }),
    alarm: alarm({ $axios }),
    timetable: timetable({ $axios }),
    attendance: attendance({ $axios }),
    announce: announce({ $axios }),
    report: report({ $axios }),
    contact: contact({ $axios }),
    parent: parent({ $axios }),
    inquiry: inquiry({ $axios }),
    setting: setting({ $axios }),
    garbage: garbage({ $axios }),
    miniGame: miniGame({ $axios2 }),
    score: score({ $axios }),
  }

  if (isDev) {
    app.$api = api
    Vue.prototype.$api = api
    store.$api = api
  }

  inject('api', api)
}
