/* eslint-disable */
export default {
  isLoginID(str) {
    const regex = /^[a-z0-9._]{6,30}$/
    return regex.test(str)
  },
  isEmail (str) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(str)
  },
  isHumanName (str) {
    const regex = /[0-9`~!@#$%^&*()\-_=+[{\]};:'",<\.>\/?\\|]/
    return regex.test(str)
  },
  isPassword (str) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
    return regex.test(str)
  },
  isNumber (str) {
    const regex = /^\d+$/
    return regex.test(str)
  },
  isPhone(phoneNum) {
    const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
    return regex.test(phoneNum)
  },
}
