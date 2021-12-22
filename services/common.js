export default ({ $axios, app }) => ({
  async GET_OPTIONAL_INFO($optionTypes) {
    const { data } = await $axios.post('GET_OPTIONAL_INFO', {
      OPTION_TYPE: $optionTypes,
    })
    return data
  },
  PRE_SIGNED_UPLOAD(params) {
    return $axios.$post('PRE_SIGNED_UPLOAD', params)
  },
  async UPLOAD_FILE({ file, type = 'file', dir = 'schools' }) {
    const fileName = app.$utils.file.getCustomFileName(file.name)
    let dirType
    if (type === 'file') {
      dirType = 'files'
    }
    if (type === 'image') {
      dirType = 'images'
    }
    const { DATA: uploadUrl } = await this.PRE_SIGNED_UPLOAD({
      FILE_NAME: `/${dirType}/${dir}/${fileName}`,
      SIZE_BODY: file.size,
      CONTENT_TYPE: file.type,
      CONTENT_LENGTH: file.size,
    })

    const api = $axios.create({
      headers: {
        'content-type': file.type,
      },
    })

    api.setBaseURL(uploadUrl)

    try {
      await api.$put('', file)

      return {
        name: file.name,
        path: uploadUrl.split('?')[0],
      }
    } catch (err) {
      app.$notify.error({
        title: 'Upload fail!',
        message: err,
      })
    }

    return {}
  },
  GET_CURRENT_SEMESTER(params) {
    return $axios.$post('semester/GET_CURRENT_SEMESTER', { ...params })
  },
  GET_SEMESTER_SCHEDULE(params) {
    return $axios.$post('semester/GET_SEMESTER_SCHEDULE', { ...params })
  },
  GET_LIST_MAIN_GRADE(params) {
    return $axios.$post('school/GET_LIST_MAIN_GRADE', { ...params })
  },
  GET_LIST_MAIN_CLASS(params) {
    return $axios.$post('school/GET_LIST_MAIN_CLASS', { ...params })
  },
})
