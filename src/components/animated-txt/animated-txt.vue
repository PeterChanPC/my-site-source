<template>
  <div
    :class="[
      'animated-txt',
      `flex-letters-${justify}`,
      `flex-${wrap}`,
    ]"
  >
    <span
      :class="[
        `animation-${animation}`,
        `font-size-${fontSize}`,
        `text-transform-${textTransform}`,
      ]"
      v-for="(char, id) in text"
      :key="id"
      :style="{
        animationDelay: `calc(${delay} + ${id} * ${stagger})`,
        animationDuration: duration,
      }"
    >
      {{ char }}
    </span>
  </div>
</template>

<script lang="ts">
import { PropType, CSSProperties, defineComponent } from 'vue';

type Animation = 'fadeIn' | 'fadeInLeft' | 'fadeInRight' | '';
type FontSize = 'sm' | 'md' | 'lg' | '';
type Justify = 'start' | 'center' | 'evenly' | '';
type Wrap = 'wrap' | 'nowrap' | '';
type TextTransform = 'cap' | 'uc' | 'lc' | '';
// capitalize supports single word only

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
      default: ''
    },
    justify: {
      type: String as PropType<Justify>,
      default: '',
    },
    wrap: {
      type: String as PropType<Wrap>,
      default: '',
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
      type: String as PropType<CSSProperties['animation-delay']>,
      default: '0ms',
    },
  },
});
</script>

<style scoped lang="scss">
@forward './animated-txt.scss';
</style>