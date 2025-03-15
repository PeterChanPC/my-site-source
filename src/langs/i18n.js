import { createI18n } from 'vue-i18n'
import enUS from './en-US'
import zhTW from './zh-TW'

const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS.messages,
    'zh-TW': zhTW.messages
  },
  modifiers: {
    snakeCase: (str) => str.split(' ').join('_')
  },
  datetimeFormats: {
    'en-US': enUS.dateTimeFormats,
    'zh-TW': zhTW.dateTimeFormats
  },
  numberFormats: {
    'en-US': enUS.numberFormats,
    'zh-TW': zhTW.numberFormats
  }
})

export default i18n