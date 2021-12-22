export default ({ $axios }) => ({
  GET_TEACHER_CARD_NUMBER() {
    return $axios.$get('/app/garbage/faculty/card-number')
  },
  GET_STUDENT_CARD_NUMBER() {
    return $axios.$get('/app/garbage/student/card-number')
  },
  GET_USER_INFO(params) {
    return $axios.$post('/app/garbage/user-info', params)
  },
})
