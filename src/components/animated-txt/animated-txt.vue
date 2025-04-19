<template>
  <div class="animated-txt">
    <span v-for="(char, id) in text" :key="id" :style="{
      fontSize: fontSize,
      textTransform: textTransform,
      animationDelay: `calc(${delay} + ${id} * 200ms)`,
    }">
      {{ char }}
    </span>
  </div>
</template>

<script lang="ts">
import { PropType, CSSProperties, type Ref, StyleValue, defineComponent, ref } from 'vue';


export default defineComponent({
  name: 'animated-txt',
  props: {
    text: {
      type: String,
      default: '',
    },
    fontSize: {
      type: String as PropType<CSSProperties['fontSize']>,
      default: '16px',
    },
    textTransform: {
      type: String as PropType<CSSProperties['textTransform']>,
      default: 'none'
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