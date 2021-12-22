import parsePhoneNumber from 'libphonenumber-js'

/**
 * Detach string of grade (ex: 1:Tiểu học)
 * @param strGrade
 * @returns {Array|*|string[]}
 */
export const detachGrade = strGrade => {
  const arrGrade = strGrade.split(':')
  return {
    asNumber: `Cấp ${arrGrade[0]}`,
    asName: arrGrade[1],
  }
}

/**
 * Check is valid email
 * @param email
 * @returns {boolean}
 */
export const isValidEmail = email => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

/**
 * Transform data paginate
 * @param data
 * @returns {{total: *, count: *, pageSize: *, currentPage: *}}
 */
export const transformPaginate = data => {
  return {
    total: data.TOTAL_COUNT,
    currentPage: data.SEARCH_PAGE,
    pageSize: data.SEARCH_UNIT,
    count: data.SRCH_COUNT,
  }
}

export const formatTime = time => {
  let t
  if (time.toString().slice(0).length === 1) {
    t = '0' + time
  } else {
    return time
  }
  return t
}

export const nl2br = str => {
  if (!str) {
    return ''
  }

  return (str + '').replace(/(\r\n|\n\r|\r|\n)/g, '<br>' + '$1')
}

export const replaceAsteriskEmail = (email, showFirstCharacter = 1) => {
  if (!email) {
    return null
  }
  let a = email.split('@')
  let b = a[0]
  let newStr = ''
  for (let i in b) {
    if (i > showFirstCharacter - 1 && i < b.length) {
      newStr += '*'
    } else {
      newStr += b[i]
    }
  }
  return newStr + '@' + a[1]
}

export const ucfirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const stripTags = str => {
  return str.replace(/(<([^>]+)>)/gi, '')
}

export const countWords = str => {
  return str.split(' ').length
}

/* eslint-disable unicorn/number-literal-case */
export const getUTF8Length = s => {
  // bytes count
  if (!s) {
    return 0
  }

  let len = 0

  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i)
    if (code <= 0x7f) {
      len += 1
    } else if (code <= 0x7ff) {
      len += 2
    } else if (code >= 0xd800 && code <= 0xdfff) {
      // Surrogate pair: These take 4 bytes in UTF-8 and 2 chars in UCS-2
      // (Assume next char is the other [valid] half and just skip it)
      len += 4
      i++
    } else if (code < 0xffff) {
      len += 3
    } else {
      len += 4
    }
  }
  return len
}

export const calculateStartTime = ({
  START_TIME,
  LECTURE_COUNT,
  LECTURE_TIME,
  LONG_BREAK_START,
  LONG_BREAK_TIME,
  SHORT_BREAK_TIME,
}) => {
  const result = []
  let startTime = START_TIME

  for (let i = 0; i < LECTURE_COUNT; i++) {
    result.push(startTime)
    startTime += LECTURE_TIME
    startTime += i + 1 === LONG_BREAK_START ? LONG_BREAK_TIME : SHORT_BREAK_TIME
  }

  return result
}

export const getLessonStartTimes = ({ MORNING_SHIFT, AFTERNOON_SHIFT }) => {
  const result = []

  if (MORNING_SHIFT) result.push(...calculateStartTime(MORNING_SHIFT))

  if (AFTERNOON_SHIFT) result.push(...calculateStartTime(AFTERNOON_SHIFT))

  return result
}

export const getAfternoonStartTimes = ({ AFTERNOON_SHIFT }) => {
  if (!AFTERNOON_SHIFT || !AFTERNOON_SHIFT.START_TIME) {
    return 0
  }

  return AFTERNOON_SHIFT.START_TIME
}

export const getLessonFormat = ({ MORNING_SHIFT, AFTERNOON_SHIFT }) => {
  const result = []

  if (MORNING_SHIFT && MORNING_SHIFT.LECTURE_COUNT) {
    for (let i = 1; i <= MORNING_SHIFT.LECTURE_COUNT; i++) {
      result.push(i)
    }
  }

  if (AFTERNOON_SHIFT && AFTERNOON_SHIFT.LECTURE_COUNT) {
    for (let i = 1; i <= AFTERNOON_SHIFT.LECTURE_COUNT; i++) {
      result.push(i)
    }
  }

  return result
}

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
}

export function formatPhoneNumber(number, defaultCountry = 'VN') {
  const phoneNumber = parsePhoneNumber(number, defaultCountry)
  return phoneNumber.formatNational()
}

export function removePunctuation(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  return str
}
