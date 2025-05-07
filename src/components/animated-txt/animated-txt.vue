<template>
  <div
    :class="[
      'animated-txt',
      `text-${wrap}`,
      `justify-${justify}`,
    ]"
    :length="text.length"
  >
    <div
      :class="[
        'word',
        {'whitespace' : whiteSpace}
      ]"
      v-for="(word, wordId) in words"
      :key="wordId"
    >
      <span
        ref="char"
        :class="[
          'char',
          `animation-${animation}`,
          `font-size-${fontSize}`,
          `text-transform-${textTransform}`,
          `letter-spacing-${letterSpacing}`,
        ]"
        v-for="(char, charId) in word"
        :key="charId"
        :style="{
          animationDelay: `calc(${delay} + ${stepDelay += stagger}ms)`,
          animationDuration: duration,
        }"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, CSSProperties, defineComponent, ref, Ref, Prop } from 'vue';

type FontSize = 'md' | '4xl' | 'giant' | '';
type TextTransform = 'cap' | 'uc' | 'lc' | '';
type LetterSpacing = 'sm' | 'md' | 'lg' | '';
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
    const words: Ref<String[]> = ref(['']);
    words.value = props.text.split(' ');
    let stepDelay = 0;

    expose();
    return { words, stepDelay };
  },
});
</script>

<style scoped lang="scss">
@forward './animated-txt.scss';
</style>