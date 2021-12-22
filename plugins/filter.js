import Vue from 'vue'
import moment from 'moment'

Vue.filter('uppercase', val => val.toUpperCase())
Vue.filter('lowercase', val => val.toLowerCase())
Vue.filter('capitalized', val => {
  return val.charAt(0).toUpperCase() + val.slice(1)
})
Vue.filter('withDefault', val => {
  return val || 'N/A'
})

Vue.filter('formatBirthday', val => {
  return val ? moment(val).format('L') : null
})

Vue.filter('weekday', val => {
  return moment(moment().days(val + 1)).format('ddd')
})

Vue.filter('formatDates', (val, format) => {
  return moment(val).format(format)
})

Vue.filter('formatMoneyVND', (val, lastFix = true) => {
  return val ? val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + (lastFix ? 'VND' : '') : ''
})

Vue.filter('timeAgo', (val, format) => {
  if (format) {
    return val ? moment(val, format).fromNow() : null
  }
  return val ? moment(val).fromNow() : null
})

Vue.filter('formatSchoolYear', val => {
  if (!val) {
    return ''
  }

  return `${val}~${Number(val) + 1}`
})

Vue.filter('formatLectureName', val => {
  if (!val) {
    return ''
  }

  if (val.length > 9) {
    return val.slice(0, 9) + '...'
  }

  return val
})

Vue.filter('formatTeacherName', val => {
  if (!val) {
    return ''
  }

  const arr = val.split(' ')

  if (arr.length === 1) {
    return val
  }

  const fName = arr.pop()
  const mName = arr.pop()

  if ((fName + mName).length > 9) {
    return fName
  }

  return mName + ' ' + fName
})

Vue.filter('formatGrade', val => {
  if (!val) {
    return ''
  }
  return Math.floor(val * 10) / 10 // TODO: add param to customize number length
})

Vue.filter('formatLessonIndex', val => {
  if (val < 0) {
    return ''
  }
  return `Tiết ${(val % 5) + 1} - ${val < 5 ? 'Sáng' : 'Chiều'}`
})

// Add new filter here...
