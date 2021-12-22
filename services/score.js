export default ({ $axios }) => ({
  GET_SCHOOL_YEAR_LIST(params) {
    return $axios.$post('school/GET_SCHOOL_YEAR_LIST', { ...params })
  },
  GET_LIST_TEACH_GRADE(params) {
    return $axios.$post('school/GET_LIST_TEACH_GRADE', { ...params })
  },
  GET_LIST_TEACH_SUBJECT(params) {
    return $axios.$post('school/GET_LIST_TEACH_SUBJECT', { ...params })
  },
  GET_LIST_TEACH_CLASS(params) {
    return $axios.$post('school/GET_LIST_TEACH_CLASS', { ...params })
  },
  SAVE_STD_SCOREBOARD(params) {
    return $axios.$post('school/score/SAVE_STD_SCOREBOARD', { ...params })
  },
  GET_STD_SCOREBOARD(params) {
    return $axios.$post('school/score/GET_STD_SCOREBOARD', { ...params })
  },
  GET_WHOLE_SCOREBOARD(params) {
    return $axios.$post('school/score/GET_WHOLE_SCOREBOARD', { ...params })
  },
})
