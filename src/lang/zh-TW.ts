import {
  DefineLocaleMessage,
  DefineDateTimeFormat,
  DefineNumberFormat,
} from 'vue-i18n';

const zhTW: {
  messages: DefineLocaleMessage;
  dateTimeFormats: DefineDateTimeFormat;
  numberFormats: DefineNumberFormat;
} = {
  messages: {
    hello: '你好, 我是',
    home: '主頁',
    work: '經驗',
    intro: '介紹',
    about_me: '關於我',
    about_me_details: '嗨！我係PeterChan，香港科技大學物理學系2024屆畢業生，喜歡編程和學習新知識，有Python、C#、Vue.js等等的使用經驗。',
    exp: '經驗',
    resume: '我的簡歷',
    use: '用',
    control: '來控制畫面中的球',
  },
  dateTimeFormats: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric',
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true,
    },
  },
  numberFormats: {
    currency: {
      style: 'currency',
      currency: 'HKD',
      useGrouping: true,
      notation: 'standard',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
    percent: {
      style: 'percent',
      useGrouping: true,
    },
  },
};

export default zhTW;