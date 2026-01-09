export enum Mode {
  Auto = 'auto',
  Manual = 'manual',
};
export type SupportedMode = 'auto' | 'manual';

export enum Animation {
  FadeIn = 'fadeIn',
  FadeOut = 'fadeOut',
  FadeLoop = 'fadeLoop',
};
export type SupportedAnimation = 'fadeIn' | 'fadeOut' | 'fadeLoop';

export enum Target {
  Self = '_self',
  Blank = '_blank',
}
export type SupportedTarget = '_self' | '_blank';

export enum Shape {
  Pill = 'pill',
  Round = 'round',
}
export type SupportedShape = 'pill' | 'round';

export enum HoverEffect {
  UnderlineFromLeft = 'underline-l',
  UnderlineFromMiddle = 'underline-m',
}
export type SupportedHoverEffect = 'underline-l' | 'underline-m';