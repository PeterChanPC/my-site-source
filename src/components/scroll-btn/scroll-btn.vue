<template>
  <button :class="['scroll-btn', `scroll-btn-${theme}`]" @click="scroll">
    <i v-if="icon" :class="icon"></i>
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface To {
  top: number;
  left: number;
};

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
      type: Object as PropType<To>,
      default: {
        top: 0,
        left: 0,
      },
    },
    behavior: {
      type: String as PropType<ScrollBehavior>,
      default: 'smooth',
    },
    theme: {
      type: String,
      default: 'light',
    }
  },
  setup(props) {
    const scroll = () => {
      window.scrollTo({
        top: props.to.top,
        left: props.to.left,
        behavior: props.behavior,
      });
    };

    return { scroll };
  },
});
</script>

<style scoped lang="scss">
@forward './scroll-btn.scss';
</style>