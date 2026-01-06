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
    work: '項目',
    todos: '任務清單',
    authentication: '驗證',
    blogs: '部落格',
    blog: '博客',
    test: '測試',
    computer: '使用電腦體驗最佳',
    click: '按下開始',
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