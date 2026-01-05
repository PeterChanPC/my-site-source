<template>
  <div>
    <span :class="[{ 'o-0': animation === 'fadeIn' }, { 'o-1': animation === 'fadeOut' }]" v-for="(char, i) in chars"
      :key="char + i" :ref="el => setCharRef(el, i)">
      {{ char }}<span v-if="char === ' '">&nbsp;</span>
    </span>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, defineComponent, onUpdated } from 'vue';
import type { ComponentPublicInstance } from 'vue';

export default defineComponent({
  name: 'animated-txt',
  props: {
    text: {
      type: String,
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
    animation: {
      type: String,
      default: 'fadeIn',
    }
  },
  setup(props, { expose }) {
    const chars = computed(() => { // process chars
      const text = props.text.split('');
      text[0] = text[0].toUpperCase(); // Capitalize
      for (let i = 0; i < props.text.length; i++) {  // check for white spaces and 'I'
        if (text[i - 1] === ' ' || text[i + 1] === "'" || text[i - 1] === ' ' && text[i] === 'i') {
          text[i] = text[i].toUpperCase();
        };
      };
      return text;
    });

    // process charRefs from ref + v-for
    const charRefs = ref<(HTMLElement | null)[]>([]); // charRefs for animations
    function setCharRef(el: Element | ComponentPublicInstance | null, i: number) {
      if (el instanceof HTMLElement) {
        charRefs.value[i] = el;
      } else {
        charRefs.value[i] = null;
      };
    };

    // fade in animation
    const keyframes: Keyframe[] = [
      { opacity: 0 },
      { opacity: 1 },
    ];

    function animate() {
      let direction: PlaybackDirection;
      if (props.animation === 'fadeIn') {
        direction = 'normal';
      } else if (props.animation === 'fadeOut') {
        direction = 'reverse';
      };

      setTimeout(() => {
        for (const [i, el] of charRefs.value.entries()) {
          if (!el) continue;
          el.animate(keyframes,
            {
              duration: props.duration,
              delay: i * props.stagger,
              fill: 'both',
              direction: direction,
              iterations: 1
            },
          );
        };
      }, props.delay);
    };

    // animate on load
    onMounted(() => animate());
    onUpdated(() => animate());

    expose();
    return { chars, setCharRef };
  },
});
</script>

<style lang="scss"></style>