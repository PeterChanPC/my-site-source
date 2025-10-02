<template>
  <div :class="[
    'animated-txt flex row a-center',
    `j-${justify}`,
    `flex-${wrap}`,
    `font-size-${fontSize}`,
  ]">
    <div :class="[
      'word flex row a-center',
      `line-height-${lineHeight}`,
      `letter-spacing-${letterSpacing}`,
      { 'whitespace': whiteSpace },
    ]" v-for="word in words" :key="key++">
      <span :class="[
        'char relative w-auto h-1em txt-a-start txt-shadow o-0',
        `text-transform-${textTransform}`,
        `${textTransform}`,
        `${animation}`,
      ]" v-for="char in word" :key="char" ref="chars">
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, watchEffect, onMounted, onUpdated } from 'vue';

type FontSize = 'md' | '4xl' | 'giant' | '';
type TextTransform = 'capitalize' | 'uppercase' | 'lowercase' | '';
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
      type: Number,
      default: 0,
    },
    delay: {
      type: Number,
      default: 0,
    },
    stagger: {
      type: Number,
      default: 0,
    },
    lang: {
      type: String,
      default: 'en-US',
    },
  },
  setup(props, { expose }) {
    const words = ref<String[]>([]);
    const chars = ref<HTMLSpanElement[]>([]);
    let key = 0;
    let stagger = 0;

    watchEffect(() => {
      if (props.lang === 'zh-TW') {
        words.value = props.text.split('');
      } else {
        words.value = props.text.split(' ');
      };
      stagger = 0;
    });

    onMounted(() => {
      chars.value.forEach(char => {
        char.animate([{
          opacity: 0,
        }, {
          opacity: 1,
        }], {
          duration: 1000,
          delay: stagger,
          fill: 'forwards',
          iterations: 1,
        });
        stagger += props.stagger;
      });
    });

    expose();
    return { words, chars, key };
  },
});
</script>

<style scoped lang="scss">
@use "@/styles/animated-txt";
</style>