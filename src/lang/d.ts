import {
  DefineLocaleMessage,
  DefineDateTimeFormat,
  DefineNumberFormat
} from 'vue-i18n';

declare module 'vue-i18n' {
  // define the locale messages schemav
  export interface DefineLocaleMessage {
    hello: string,
  }

  // define the datetime format schema
  export interface DefineDateTimeFormat {
    short: {
      year?: 'numeric',
      month?: 'short',
      day?: 'numeric',
      hour?: 'numeric',
      minute?: 'numeric',
      second?: 'numeric',
      timeZoneName?: 'short',
      timezone?: string,
    },
    long: {
      year?: 'numeric',
      month?: 'short',
      day?: 'numeric',
      weekday?: 'short',
      hour?: 'numeric',
      minute?: 'numeric',
      second?: 'numeric',
      timeZoneName?: 'short',
      timezone?: string,
      hour12?: boolean,
    },
  }

  // define the number format schema
  export interface DefineNumberFormat {
    currency: {
      style: 'currency',
      currencyDisplay?: 'symbol',
      currency?: string,
      useGrouping?: boolean,
      notation?: 'standard',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits?: number,
      maximumFractionDigits?: number,
    },
    percent: {
      style: 'percent',
      useGrouping?: boolean,
    }
  }
}