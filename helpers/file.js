import { MAX_IMAGE_SIZE } from '@/constants'

export default ({ notify, $moment }) => ({
  isValidSize(file) {
    if (file.size > MAX_IMAGE_SIZE) {
      notify.error('pop_error_over_image_size')
      return
    }
    return true
  },
  isImage(file) {
    if (!['jpg', 'png'].includes(this.getExt(file.name).toLowerCase())) {
      notify.error('pop_error_not_match_image_format')
      return
    }
    return true
  },
  isImageString(fileName) {
    return ['jpg', 'png'].includes(this.getExt(fileName).toLowerCase())
  },
  validateImage(e) {
    const fileDOM = e.target
    const file = fileDOM.files[0]
    if (!this.isImage(file) || !this.isValidSize(file)) {
      fileDOM.value = ''
      return
    }
    return true
  },
  getExt(fileName) {
    return fileName.split('.').pop()
  },
  getCustomFileName(fileName) {
    const nameWithoutExt = fileName.lastIndexOf('.')
    const customName = nameWithoutExt > 0 ? fileName.substring(0, nameWithoutExt) : fileName
    return `${customName}_${$moment().format('YYYYMMDDhhmmssSSS')}.${this.getExt(fileName)}`
  },
  shortImageName(fileName) {
    console.log(fileName)
    if (fileName.length > 14) {
      return fileName.substr(0, 15) + '...' + fileName.substr(-15)
    }
    return fileName
  },
})
