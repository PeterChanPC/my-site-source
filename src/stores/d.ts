export const Theme = {
  Light: 'light',
  Dark: 'dark'
};
export type Theme = typeof Theme[keyof typeof Theme];

export const Language = {
  EnUS: 'en-US',
  ZhTW: 'zh-TW'
};
export type Language = typeof Language[keyof typeof Language];