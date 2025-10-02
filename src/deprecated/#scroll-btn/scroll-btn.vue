<template>
  <button :class="['scroll-btn', theme, shape]" @click="scroll">
    <div class="icon">
      <i v-if="icon" :class="icon"></i>
    </div>
    <div class="text">
      <span v-if="text">{{ text }}</span>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'scroll-btn',
  props: {
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    to: {
      type: Object as PropType<HTMLElement | null>,
      default: null,
    },
    behavior: {
      type: String as PropType<ScrollBehavior>,
      default: 'smooth',
    },
    theme: {
      type: String,
      default: 'light',
    },
    shape: {
      type: String,
      default: 'pill',
    },
  },
  setup(props) {
    const scroll = () => {
      props.to?.scrollIntoView({
        behavior: props.behavior,
        block: 'center',
      });
    };

    return { scroll };
  },
});
</script>

<style scoped lang="scss">
@forward './scroll-btn.scss';
</style>