<template>
  <div :class="[
    'animated-txt',
    `text-${wrap}`,
    `justify-${justify}`,
    `font-size-${fontSize}`,
  ]">
    <div :class="[
      'word',
      { 'whitespace': whiteSpace },
      `letter-spacing-${letterSpacing}`,
      `line-height-${lineHeight}`,
    ]" v-for="(word) in text.split(' ')" :key="word">
      <span :class="[
        'char',
        `animation-${animation}`,
        `text-transform-${textTransform}`,
      ]" v-for="(char) in word" :key="char" :style="{
        animationDelay: `calc(${delay} + ${getStepDelay()}ms)`,
        animationDuration: duration,
      }">
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, CSSProperties, defineComponent, Ref, watch, useTemplateRef } from 'vue';

type FontSize = 'md' | '4xl' | 'giant' | '';
type TextTransform = 'cap' | 'uc' | 'lc' | '';
type LetterSpacing = 'sm' | 'md' | 'lg' | '';
type lineHeight = 'sm' | 'md' | 'lg' | 'xl';
type Justify = 'start' | 'center' | 'evenly' | '';
type Wrap = 'wrap' | 'nowrap' | '';
type Animation = 'fadeIn' | 'fadeInLeft' | 'fadeInRight' | '';

export default defineComponent({
  name: 'animated-txt',
  props: {
    text: {
      type: String,
      default: '',
    },
    fontSize: {
      type: String as PropType<FontSize>,
      default: '',
    },
    textTransform: {
      type: String as PropType<TextTransform>,
      default: '',
    },
    letterSpacing: {
      type: String as PropType<LetterSpacing>,
      default: '',
    },
    lineHeight: {
      type: String as PropType<lineHeight>,
      default: 'sm',
    },
    justify: {
      type: String as PropType<Justify>,
      default: '',
    },
    wrap: {
      type: String as PropType<Wrap>,
      default: 'nowrap',
    },
    whiteSpace: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: String as PropType<Animation>,
      default: '',
    },
    duration: {
      type: String as PropType<CSSProperties['animation-duration']>,
      default: '0ms',
    },
    delay: {
      type: String as PropType<CSSProperties['animation-delay']>,
      default: '0ms',
    },
    stagger: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { expose }) {
    let stepDelay = 0;
    watch(props, () => {
      stepDelay = 0;
    });

    const getStepDelay = () => {
      return stepDelay += props.stagger;
    }

    expose();
    return { getStepDelay };
  },
});
</script>

<style scoped lang="scss">
@forward './animated-txt.scss';
</style>