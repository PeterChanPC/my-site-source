const zhTW = {
  messages: {
    greet: '你好!',
    greetCap: '@.capitalize:greet',
  },
  dateTimeFormats: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
    }
  },
  numberFormats: {
    currency: {
      style: 'currency',
      currency: 'HKD',
      useGrouping: true,
      notation: 'standard'
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    },
    percent: {
      style: 'percent',
      useGrouping: true
    }
  }
}

export default zhTW