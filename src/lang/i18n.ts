import { createI18n, type I18nOptions } from 'vue-i18n'
import enUS from './en-US'
import zhTW from './zh-TW'

const options: I18nOptions = {
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS.messages,
    'zh-TW': zhTW.messages,
  },
  datetimeFormats: {
    'en-US': enUS.dateTimeFormats,
    'zh-TW': zhTW.dateTimeFormats,
  },
  numberFormats: {
    'en-US': enUS.numberFormats,
    'zh-TW': zhTW.numberFormats,
  }
}

const i18n = createI18n<false, typeof options>(options);

export default i18n;