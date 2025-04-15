import {
  DefineLocaleMessage,
  DefineDateTimeFormat,
  DefineNumberFormat,
} from 'vue-i18n';

const enUS: {
  messages: DefineLocaleMessage;
  dateTimeFormats: DefineDateTimeFormat;
  numberFormats: DefineNumberFormat;
} = {
  messages: {
    hello: 'hello i am',
  },
  dateTimeFormats: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric',
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric',
    },
  },
  numberFormats: {
    currency: {
      style: 'currency',
      currency: 'USD',
      useGrouping: false,
      notation: 'standard',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
  },
};

export default enUS;