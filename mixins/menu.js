import { mapState } from 'vuex'
import { ROLE } from '~/constants'

const SUPPER_TEACHER = 'SUPPER_TEACHER'

export const menuMixin = {
  data() {
    return {
      services: {
        parents: ['on-leave', 'homework', 'timetable', 'contact', 'online-learning', 'elearning'],
        student: ['on-leave', 'homework', 'timetable', 'contact', 'online-learning', 'elearning'],
        teacher: ['mission', 'send-noti', 'timetable', 'input-score'],
        SUPPER_TEACHER: ['mission', 'send-noti', 'timetable', 'input-score'],
      },
      utilities: {
        student: ['sos', 'personality', 'quiz', 'school-stationery', 'study-document', 'entertain', 'ybm'],
        parents: ['sos', 'personality', 'quiz', 'school-stationery', 'study-document', 'entertain', 'ybm'],
        teacher: [
          'contact',
          'on-leave',
          'bic',
          'school-stationery',
          'document-teacher',
          'quiz',
          'ybm',
          'kyna',
          'lesson',
          'homework',
          'elearning',
          'online-learning',
        ],
      },
      utilityLinks: [
        {
          key: 'contact',
          title: this.$t('Liên lạc'),
          path: '/contact',
          icon: 'contact',
          isShow: true,
        },
        {
          key: 'on-leave',
          title: this.$t('Nghỉ phép'),
          path: '',
          icon: 'on-leave',
          isShow: true,
        },
        {
          key: 'spend-manager',
          title: this.$t('Quản lý chi tiêu'),
          path: '',
          icon: 'spend-manager',
          isShow: true,
        },
        {
          key: 'entertain',
          title: this.$t('Giải trí'),
          path: '',
          icon: 'entertain',
          isShow: true,
        },
        {
          key: 'school-stationery',
          title: this.$t('Đồ dùng học tập'),
          path: '',
          icon: 'school-stationery',
          isShow: true,
        },
        {
          key: 'document-teacher',
          title: this.$t('Tài liệu'),
          path: '',
          icon: 'document',
          isShow: true,
        },
        {
          key: 'lesson',
          title: this.$t('Bài giảng'),
          path: '',
          icon: 'lesson',
          isShow: true,
        },
        {
          key: 'homework',
          title: this.$t('Bài tập về nhà'),
          path: '',
          icon: 'homework',
          isShow: true,
        },
        {
          key: 'elearning',
          title: this.$t('Elearning'),
          path: '',
          icon: 'elearning-utility',
          isShow: true,
        },
        {
          key: 'online-learning',
          title: this.$t('Học trực tuyến'),
          path: '',
          icon: 'online-learning',
          isShow: true,
        },
        {
          key: 'sos',
          title: this.$t('Gọi khẩn cấp'),
          path: '',
          icon: 'sos',
          isShow: true,
        },
        {
          key: 'personality',
          title: this.$t('Kiểm tra tính cách'),
          path: '',
          icon: 'personality',
          isShow: true,
        },
        {
          key: 'quiz',
          title: this.$t('Quiz'),
          path: '',
          icon: 'quiz',
          isShow: true,
        },
        {
          key: 'ybm',
          title: this.$t('YBM'),
          path: this.$config.ybmSite,
          icon: 'ybm',
          img: true,
          isShow: false,
        },
        {
          key: 'kyna',
          title: this.$t('KYNA'),
          path: '',
          icon: 'kyna',
          img: true,
          isShow: true,
        },
        {
          key: 'bic',
          title: this.$t('BIC'),
          path: '',
          icon: 'bic',
          img: true,
          isShow: true,
        },
        {
          key: 'study-document',
          title: this.$t('Tài liệu học tập'),
          path: '',
          icon: 'document',
          isShow: true,
        },
      ],
      serviceLinks: [
        {
          key: 'on-leave',
          title: this.$t('Nghỉ phép'),
          path: '',
          icon: 'on-leave',
        },
        {
          key: 'homework',
          title: this.$t('Bài tập về nhà'),
          path: '',
          icon: 'homework',
        },
        {
          key: 'timetable',
          title: this.$t('btn_timetable'),
          path: '/timetable',
          icon: 'timetable',
        },
        {
          key: 'input-score',
          title: this.$t('Nhập điểm'),
          path: '/v2/score-input',
          icon: 'input-score',
        },
        {
          key: 'contact',
          title: this.$t('Liên lạc'),
          path: '/contact',
          icon: 'contact',
        },
        {
          key: 'elearning',
          title: this.$t('Elearning'),
          path: '',
          icon: 'elearning-utility',
        },
        {
          key: 'online-learning',
          title: this.$t('Học trực tuyến'),
          path: '',
          icon: 'online-learning',
        },
        {
          key: 'scoreboard_teacher',
          title: this.$t('Sổ điểm'),
          path: '/v2/scoreboard/teacher',
          icon: 'gradebook',
        },
        {
          key: 'absence-letter',
          title: this.$t('Tạo đơn nghỉ học'),
          path: '',
          icon: 'absence-letter',
        },
        {
          key: 'lecture-content',
          title: this.$t('Nội dung bài giàng'),
          path: '',
          icon: 'mission',
        },
        {
          key: 'study-document',
          title: this.$t('Tài liệu học tập'),
          path: '',
          icon: 'document',
        },
        {
          key: 'send-noti',
          title: this.$t('Gửi thông báo'),
          path: '/announcement/teacher/new',
          icon: 'send-noti',
        },
        {
          key: 'document',
          title: this.$t('Tài liệu'),
          path: '',
          icon: 'document',
        },
        {
          key: 'mission',
          title: this.$t('Nhiệm vụ'),
          path: '',
          icon: 'mission',
        },
      ],
      managementLinks: [
        { name: this.$t('btn_children_management'), path: '/setting/manage-children' },
        { name: this.$t('btn_personal_information'), path: '/setting/my-information' },
        { name: this.$t('btn_payment_management'), path: '/setting/payment' },
      ],
      navigations: {
        parents: ['home', 'attendance', 'timetable', 'announcement', 'scoreboard', 'settings'],
        student: ['home', 'attendance', 'timetable', 'announcement', 'scoreboard', 'settings'],
        teacher: ['home', 'attendance', 'attendance_lecture', 'receive_notice', 'scoreboard_teacher', 'settings'],
        SUPPER_TEACHER: ['home', 'attendance', 'receive_notice', 'scoreboard_teacher', 'settings'],
      },
      bottomNavs: [
        { key: 'home', name: this.$t('btn_home'), icon: 'home', path: '/v2/home' },
        { key: 'attendance', name: this.$t('btn_attendance'), icon: 'attendance', path: '/v2/attendance' },
        { key: 'scoreboard_teacher', name: this.$t('Sổ điểm'), icon: 'gradebook', path: '/v2/scoreboard/teacher' },
        { key: 'scoreboard', name: this.$t('Bảng điểm'), icon: 'gradebook', path: '/v2/scoreboard' },
        { key: 'settings', name: this.$t('btn_setting'), icon: 'settings', path: '/setting' },
      ],
    }
  },
  computed: {
    ...mapState(['userRole', 'isMainTeacher', 'isSchoolAdmin']),
    listServices() {
      const option = this.isSchoolAdmin || this.isMainTeacher ? SUPPER_TEACHER : this.userRole
      const servicesByRole = this.services[option]

      return this.serviceLinks
        .filter(e => servicesByRole.includes(e.key))
        .sort((a, b) => servicesByRole.indexOf(a.key) - servicesByRole.indexOf(b.key))
    },
    listUtilities() {
      const utilityByRole = this.utilities[this.userRole]

      return this.utilityLinks
        .filter(e => utilityByRole.includes(e.key))
        .sort((a, b) => utilityByRole.indexOf(a.key) - utilityByRole.indexOf(b.key))
    },
    listNavigations() {
      const role = this.isSchoolAdmin || this.isMainTeacher ? SUPPER_TEACHER : this.userRole

      return this.bottomNavs.filter(e => this.navigations[role].includes(e.key))
    },
    listManagements() {
      this.managementLinks.filter(e => {
        if (this.userRole === ROLE.PARENT) {
          return e.path !== '/setting/my-information'
        }

        return e.path !== '/setting/manage-children'
      })
    },
  },
}
