const DATE_FORMAT = 'YYYYMMDD'

export default ({ $moment }) => ({
  format(str) {
    return $moment(str).format('HH:mm DD/MMM/YYYY')
  },
  formatStandardDate(str) {
    return $moment(str).format('DD/MMM/YYYY')
  },
  formatToInput(str) {
    return $moment(str).format('YYYY-MM-DD')
  },
  formatInput(str) {
    return $moment(str).format(DATE_FORMAT)
  },
})
