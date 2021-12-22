import * as utils from '../helpers/utils'

export const schoolService = {
  methods: {
    searchSchool(params) {
      return this.$axios.$post('school/SEARCH_SCHOOL', params).then(data => {
        if (data) {
          const list = data.ITEMS.map(item => {
            return {
              id: item.SCHOOL_ID,
              name: item.SCHOOL_NAME,
              grade: utils.detachGrade(item.GRADE),
              city: item.ADDR_CITY,
              district: item.ADDR_GU,
              phone: item.TEL,
            }
          })
          const pagination = utils.transformPaginate(data)
          return { list, pagination }
        }
        return null
      })
    },
    searchTeacher(params) {
      return this.$axios.$post('teacher/SEARCH_TEACHER', params).then(data => {
        if (data) {
          const list = data.ITEMS.map(item => {
            return {
              id: item.TEACHER_ID,
              name: item.TEACHER_NAME,
              birthday: item.BIRTHDAY,
              sex: item.SEX,
            }
          })
          const pagination = utils.transformPaginate(data)
          return { list, pagination }
        }
        return null
      })
    },
  },
}
