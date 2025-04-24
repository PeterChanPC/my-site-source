<template>
  <div
    :class="[
      'animated-txt',
      `flex-letters-${justify}`,
    ]"
  >
    <span
      :class="[
        `font-size-${fontSize}`,
        `animation-${animation}`,
        `text-transform-${textTransform}`,
      ]"
      v-for="(char, id) in text"
      :key="id"
      :style="{
        animationDelay: `calc(${delay} + ${id} * 200ms)`,
      }"
    >
      {{ char }}
    </span>
  </div>
</template>

<script lang="ts">
import { PropType, CSSProperties, defineComponent } from 'vue';

type FontSize = 'small' | 'medium' | 'large';
type Justify = 'center' | 'evenly';
type Animation = 'fade-in' | 'fade-in-left' | 'fade-in-right';
type TextTransform = 'capitalize' | 'uppercase' | 'lowercase';
// capitalize supports 1 word only

export default defineComponent({
  name: 'animated-txt',
  props: {
    text: {
      type: String,
      default: '',
    },
    fontSize: {
      type: String as PropType<FontSize>,
      default: '16px',
    },
    textTransform: {
      type: String as PropType<TextTransform>,
      default: 'none'
    },
    justify: {
      type: String as PropType<Justify>,
      default: '',
    },
    animation: {
      type: String as PropType<Animation>,
      default: '',
    },
    delay: {
      type: String as PropType<CSSProperties['animationDelay']>,
      default: '0ms',
    },
  },
});
</script>

<style scoped lang="scss">
@forward './animated-txt.scss';
</style>