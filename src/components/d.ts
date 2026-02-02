export const Mode = {
  Auto: 'auto',
  Manual: 'manual',
};
export type Mode = typeof Mode[keyof typeof Mode];

export const Animation = {
  FadeIn: 'fadeIn',
  FadeOut: 'fadeOut',
  FadeInOut: 'fadeInOut',
  FadeLoop: 'fadeLoop',
};
export type Animation = typeof Animation[keyof typeof Animation];

export const Target = {
  Self: '_self',
  Blank: '_blank',
};
export type Target = typeof Target[keyof typeof Target];

export const Shape = {
  Pill: 'pill',
  Round: 'round',
};
export type Shape = typeof Shape[keyof typeof Shape];

export const HoverEffect = {
  UnderlineFromLeft: 'underline-l',
  UnderlineFromMiddle: 'underline-m',
};
export type HoverEffect = typeof HoverEffect[keyof typeof HoverEffect];