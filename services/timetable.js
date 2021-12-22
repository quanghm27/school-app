export default ({ $axios }) => ({
  GET_TIME_TABLE(params) {
    return $axios.$post('edu/GET_TIME_TABLE', { ...params })
  },
  GET_TIME_TABLE_DAYOFWEEK(params) {
    return $axios.$post('edu/GET_TIME_TABLE_DAYOFWEEK', { ...params })
  },
  GET_TIME_TABLE_CONFIG(params) {
    return $axios.$post('edu/GET_TTB_CONFIG_TIME_APP', { ...params })
  },
})
