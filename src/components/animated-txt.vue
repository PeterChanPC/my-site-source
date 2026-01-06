<template>
  <div>
    <span :class="[{ 'o-0': animation === Animation.FadeIn }, { 'o-1': animation === Animation.FadeOut }, 'user-select-none']"
      v-for="(char, i) in chars" :key="char + i" :ref="el => setCharRef(el, i)">
      {{ char }}
    </span>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, defineComponent, onUpdated } from 'vue';
import type { ComponentPublicInstance, PropType } from 'vue';
import { Mode, SupportedMode, Animation, SupportedAnimation } from './d'

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
      type: String as PropType<SupportedAnimation>,
      default: Animation.FadeIn,
    },
    mode: {
      type: String as PropType<SupportedMode>,
      default: Mode.Auto,
    },
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

    // fade animation
    const fadeKeyframes: Keyframe[] = [
      { opacity: 0 },
      { opacity: 1 },
    ];

    const fadeLoopKeyframes: Keyframe[] = [
      { opacity: 0.6 },
      { opacity: 1 },
      { opacity: 0.6 },
    ];

    function startAnimation() {
      let direction: PlaybackDirection;
      let keyframes: Keyframe[];
      let iterations: number = 1;
      if (props.animation === Animation.FadeIn) {
        keyframes = fadeKeyframes;
        direction = 'normal';
      } else if (props.animation === Animation.FadeOut) {
        keyframes = fadeKeyframes;
        direction = 'reverse';
      } else if (props.animation === Animation.FadeLoop) {
        keyframes = fadeLoopKeyframes;
        iterations = Infinity;
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
              easing: 'linear',
              iterations: iterations
            },
          );
        };
      }, props.delay);
    };

    // animate on load
    onMounted(() => { if (props.mode === Mode.Auto) startAnimation() });
    onUpdated(() => { if (props.mode === Mode.Auto) startAnimation() });

    expose({ startAnimation });
    return { Animation, chars, setCharRef };
  },
});
</script>

<style lang="scss"></style>