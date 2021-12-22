import { get } from 'vuex-pathify'

const BG_THEMES = {
  'role-parents': {
    header: 'header-parent.png',
    content: 'content-parent.png',
    avt: 'avt-parent.png',
  },
  'role-student': {
    header: 'header-student.png',
    content: 'content-student.png',
    avt: 'avt-student.png',
  },
  'role-teacher': {
    header: 'header-teacher.png',
    content: 'content-teacher.png',
    avt: 'avt-teacher.png',
  },
}

export const themeMixin = {
  computed: {
    ...get('login', ['themeClass']),
    headerBg() {
      return BG_THEMES[this.themeClass || 'role-student'].header
    },
    contentBg() {
      return BG_THEMES[this.themeClass || 'role-student'].content
    },
    avtImg() {
      return BG_THEMES[this.themeClass || 'role-student'].avt
    },
  },
  methods: {
    setThemeClass() {
      const themeClass = this.$cookiz.get('theme_class')

      this.$store.set('login/themeClass', themeClass || 'role-student')
    },
  },
}
