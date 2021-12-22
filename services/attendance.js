export default ({ $axios }) => ({
  CHECK_DAY_OFF(params) {
    return $axios.$post('app/teacher/CHECK_DAY_OFF', params)
  },
  GET_ATTEND_LECTURE_LIST(params) {
    return $axios.$post('app/teacher/GET_ATTEND_LECTURE_LIST', params)
  },
  GET_ATTEND_LECTURE(params) {
    return $axios.$post('app/teacher/GET_ATTEND_LECTURE', params)
  },
  EDIT_ATTEND_LECTURE_RECORD(params) {
    return $axios.$post('app/teacher/EDIT_ATTEND_LECTURE_RECORD', params)
  },
  GET_LIST_CLASS_DAILY_ATTENDANCE(params) {
    return $axios.$post('school/student/record/GET_LIST_CLASS_DAILY_ATTENDANCE', { ...params })
  },
  GET_CLASS_DAILY_ATTENDANCE_DETAIL(params) {
    return $axios.$post('school/student/record/GET_CLASS_DAILY_ATTENDANCE_DETAIL', { ...params })
  },
  EDIT_CLASS_DAILY_ATTENDANCE(params) {
    return $axios.$post('school/student/record/EDIT_CLASS_DAILY_ATTENDANCE', { ...params })
  },
  PUSH_CLASS_DAILY_ATTENDANCE(params) {
    return $axios.$post('school/student/record/PUSH_CLASS_DAILY_ATTENDANCE', { ...params })
  },
  GET_LIST_DAY_OFF_APPLICATION(params) {
    return $axios.$post('app/attend/GET_LIST_DAY_OFF_APPLICATION', { ...params })
  },
})
