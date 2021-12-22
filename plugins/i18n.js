import Vue from 'vue'
import VueI18n from 'vue-i18n'
import 'moment/locale/ko'
import 'moment/locale/vi'
import { DEFAULT_LANGUAGE } from '../constants'

Vue.use(VueI18n)

// TODO Nuxt/i18n

export default async ({ app, store }) => {
  const cookieLang = window.locale || app.$cookiz.get('locale') || DEFAULT_LANGUAGE
  const mess = await import(`~/translation/${cookieLang}.json`)

  app.i18n = new VueI18n({
    locale: cookieLang,
    fallbackLocale: DEFAULT_LANGUAGE,
    silentTranslationWarn: true,
    formatter: new CustomFormatter(/* here the constructor options */),
    messages: {
      [cookieLang]: mess,
    },
  })
  app.$moment.updateLocale('vi', {
    relativeTime: {
      M: '1 tháng',
    },
  })
  app.$moment.locale(cookieLang)
}

class CustomFormatter {
  //
  // interpolate
  //
  // @param {string} message
  //   string of list or named format.
  //   e.g.
  //   - named formatting: 'Hi {name}'
  //   - list formatting: 'Hi {0}'
  //
  // @param {Object | Array} values
  //   values of `message` interpolation.
  //   passed values with `$t`, `$tc` and `i18n` functional component.
  //   e.g.
  //   - $t('hello', { name: 'kazupon' }) -> passed values: Object `{ name: 'kazupon' }`
  //   - $t('hello', ['kazupon']) -> passed values: Array `['kazupon']`
  //   - `i18n` functional component (component interpolation)
  //     <i18n path="hello">
  //       <p>kazupon</p>
  //       <p>how are you?</p>
  //     </i18n>
  //     -> passed values: Array (included VNode):
  //        `[VNode{ tag: 'p', text: 'kazupon', ...}, VNode{ tag: 'p', text: 'how are you?', ...}]`
  //
  // @return {Array<any>}
  //   interpolated values. you need to return the following:
  //   - array of string, when is using `$t` or `$tc`.
  //   - array included VNode object, when is using `i18n` functional component.
  //
  interpolate(message, value) {}
}
