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
    todos: '待辦清單',
    authentication: '登錄系統',
    blogs: '部落格',
    blog: '部落格',
    test: '測試頁',
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