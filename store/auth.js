import { replaceAsteriskEmail } from '../helpers/utils'

export const state = () => ({
  userCheckedInfo: null,
  emailTemp: null,
})

export const getters = {
  getAsteriskEmail: state => {
    return replaceAsteriskEmail(state.emailTemp)
  },
}

export const mutations = {
  setUserChecked(state, { FULL_NAME, BIRTHDAY, MY_NUMBER }) {
    BIRTHDAY = this.$moment(BIRTHDAY).format('YYYYMMDD')
    state.userCheckedInfo = {
      FULL_NAME,
      BIRTHDAY,
      MY_NUMBER,
    }
  },
  setEmailTemp(state, email) {
    state.emailTemp = email
  },
}
