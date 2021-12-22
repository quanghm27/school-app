module.exports = {
  mode: 'jit',
  corePlugins: {
    preflight: false,
  },
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      ssm: '360px',
    },
    extend: {
      colors: {
        student: 'var(--color-student)',
        parent: 'var(--color-parent)',
        parents: 'var(--color-parent)',
        teacher: 'var(--color-teacher)',
        primary: 'var(--color-primary)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',

        // NEW
        'yellow-0': '#F2C94C',
        'redor-0': '#EE493D',
        'red-teacher': '#EE493D',
        'blue-parent': '#396CFF',
        'green-student': '#159C3F',
        'teacher-FFE5E3': '#FFE5E3',

        'gray-1': '#333333',
        'gray-2': '#4F4F4F',
        'gray-3': '#828282',
        'gray-4': '#BDBDBD',
        'gray-5': '#E0E0E0',
        'gray-6': '#F2F2F2',
        'gray-v2-primary': '#2C2C2E',
        'gray-v2-secondary': '#636366',

        'blue-0': '#396CFF',

        'orange-EE493D': '#EE493D',
        'orange-FFA800': '#FFA800',
        'gray-E1E1E1': '#E1E1E1',
        'gray-AEAEB2': '#AEAEB2',
        'gray-FDFEFF': '#FDFEFF',
        'gray-D0D6E3': '#D0D6E3',
        'gray-F3F3F3': '#F3F3F3',
        'gray-F9F9F9': '#F9F9F9',
        'gray-8E8E93': '#8E8E93',
        'red-F7E5E5': '#F7E5E5',
        'red-D0A18F': '#D0A18F',
        'red-5C2D00': '#5C2D00',
        'green-6FCF97': '#6FCF97',
        'green-5FB760': '#5FB760',
        'green-27AE60': '#27AE60',
        'green-25AF0E': '#25AF0E',
        'gray-ACB4C3': '#ACB4C3',
        'yellow-FFE344': '#FFE344',
        'yellow-FCBD11': '#FCBD11',
        'yellow-FDECA8': '#FDECA8',
        'black-5C5C5C': '#5C5C5C',
        'black-333333': '#333333',
      },
      borderRadius: {
        nm: '2.5rem',
      },
      width: {
        18: '4.5rem',
      },
      boxShadow: {
        'card-home': '0px 4px 12px 2.29042px rgba(238, 73, 61, 0.02)',
      },
      backgroundColor: {
        parents: 'var(--color-parent)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/line-clamp'),
  ],
  variants: {
    extend: {
      textColor: ['disabled'],
    },
  },
}
