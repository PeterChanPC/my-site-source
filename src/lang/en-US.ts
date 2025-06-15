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
    hello: 'hello, i am',
    home: 'home',
    work: 'work',
    intro: 'introduction',
    about_me: 'about me',
    about_me_details: 'Hi, I’m Peter Chan, a recent Physics graduate from HKUST. I’m passionate about coding and have experience in Python, C#, and Vue.js. I enjoy building projects and learning new technologies.',
    exp: 'experience',
    resume: 'get my resume',
    use: 'use',
    control: 'to control the ball',
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