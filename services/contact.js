export default ({ $axios }) => ({
  GET_FAVORITE_LIST(params) {
    return $axios.$post('app/GET_FAVORITE_LIST', { ...params })
  },
  GET_TEACHER_CONTACT_LIST() {
    return $axios.$post('app/contact/GET_TEACHER_CONTACT_LIST')
  },
  GET_STUDENT_CONTACT_LIST() {
    return $axios.$post('app/contact/GET_STUDENT_CONTACT_LIST')
  },
  SEARCH_TEACHER(params) {
    return $axios.$post('app/contact/SEARCH_TEACHER', params)
  },
  SEARCH_STUDENT(params) {
    return $axios.$post('app/contact/SEARCH_STUDENT', params)
  },
  EDIT_FAVORITE_CONTACT(params) {
    return $axios.$post('app/contact/EDIT_FAVORITE_CONTACT', params)
  },
  GET_STUDENT_INFO(params) {
    return $axios.$post('app/contact/GET_STUDENT_INFO', params)
  },
  GET_TEACHER_INFO(params) {
    return $axios.$post('app/contact/GET_TEACHER_INFO', params)
  },
  GET_SCHOOL_LIST() {
    return $axios.$post('GET_SCHOOL_LIST')
  },
})
