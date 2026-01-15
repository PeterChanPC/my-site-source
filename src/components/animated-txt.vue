<template>
  <div>
    <span
      :class="[{ 'o-0': animation === Animation.FadeIn || animation === Animation.FadeInOut }, { 'o-1': animation === Animation.FadeOut }, 'user-select-none']"
      v-for="(char, i) in chars" :key="char + i" :ref="el => setCharRef(el, i)">
      {{ char }}
    </span>
  </div>
</template>

<script lang="ts">
import type { ComponentPublicInstance, PropType } from 'vue';
import { ref, computed, onMounted, defineComponent, onUpdated } from 'vue';
import { Mode, SupportedMode, Animation, SupportedAnimation } from './d'

export default defineComponent({
  name: 'animated-txt',
  props: {
    /**
     * The main text content of the component.
     * @type {String}
     * @default ''
     */
    text: {
      type: String,
      default: '',
    },

    /**
     * THe duration of each fading animation per character.
     * @type {Number}
     * @default 0
     */
    duration: {
      type: Number,
      default: 0,
    },

    /**
     * The delay before the start of the first animation.
     * @type {Number}
     * @default 0
     */
    delay: {
      type: Number,
      default: 0,
    },

    /**
     * The stagger between the start of each animation per character.
     * @type {Number}
     * @default 0
     */
    staggerIn: {
      type: Number,
      default: 0,
    },

    /**
     * This property is only used in Animation.FadeInOut for the stagger in its second animation.
     * 
     * The stagger between the start of each animation per character.
     * @type {Number}
     * @default 0
     */
    staggerOut: {
      type: Number,
      default: 0,
    },

    /**
     * This property is only used in Animation.FadeInOut for the delay between the first and second animation.
     * 
     * The stagger between the start of each animation per character.
     * @type {Number}
     * @default 0
     */
    pause: {
      type: Number,
      default: 0,
    },

    /**
     * The type of the animation.
     * 
     * Values:
     * - `'fadeIn'`: a fade in animation.
     * - `'fadeOut'`: a fade out animation.
     * - `'fadeInOut'`: start by a fade in animation, ends with a fade out animation, stagger in fade out animation is fixed to 20ms.
     * - `'fadeLoop'`: a loop animation of fade in and out.
     * 
     * @type {SupportedAnimation}
     * @default Animation.FadeIn (`'fadeIn'`)
     */
    animation: {
      type: String as PropType<SupportedAnimation>,
      default: Animation.FadeIn,
    },

    /**
     * The trigger mode of the animation.
     * 
     * Values:
     * - `'auto'`: automatically start the animations by onMounted and onUpdated.
     * - `'manual'`: users have to manually to start the animations, the `startAnimation()` method is exposed to parent and can be called via a component ref.
     * 
     * @type {SupportedMode}
     * @default Mode.Auto (`'auto'`)
     */
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

    // fade animations
    const fadeKeyframes: Keyframe[] = [
      { opacity: 0 },
      { opacity: 1 },
    ];

    const fadeLoopKeyframes: Keyframe[] = [
      { opacity: 0.6 },
      { opacity: 1 },
      { opacity: 0.6 },
    ];

    function wrapAnimate(keyframes: Keyframe[], duration: number, stagger: number, direction: PlaybackDirection, iterations: number, delay: number): void {
      setTimeout(() => {
        for (const [i, el] of charRefs.value.entries()) {
          if (!el) continue;
          el.animate(keyframes,
            {
              duration: duration,
              delay: i * stagger,
              fill: 'forwards',
              direction: direction,
              easing: 'linear',
              iterations: iterations
            },
          );
        };
      }, delay);
    };

    /**
     * Start the animation.
     * 
     * This function starts playing the animation.
     * 
     * @example
     * // In parent: childRef.value.startAnimation(); // start animation
     */
    function startAnimation() {
      let animation: SupportedAnimation = props.animation;
      let keyframes: Keyframe[] = fadeKeyframes;
      let duration: number = props.duration;
      let stagger: number = props.staggerIn;
      let direction: PlaybackDirection = 'normal';
      let iterations: number = 1;
      let delay: number = props.delay;

      if (animation === Animation.FadeOut) {
        direction = 'reverse';
      } else if (animation === Animation.FadeLoop) {
        keyframes = fadeLoopKeyframes;
        iterations = Infinity;
      };
      wrapAnimate(keyframes, duration, stagger, direction, iterations, delay);

      if (animation !== Animation.FadeInOut) return; // play fadeOut after fadeIn for fadeInOut
      stagger = props.staggerOut;
      direction = 'reverse';
      delay += stagger * props.text.length + props.pause;
      wrapAnimate(keyframes, duration, stagger, direction, iterations, delay);
    };

    expose({ startAnimation });

    // Start the animation if (props.mode === Mode.Auto (`'auto'`))
    onMounted(() => { if (props.mode === Mode.Auto) startAnimation() });
    onUpdated(() => { if (props.mode === Mode.Auto) startAnimation() });
    return { Animation, chars, setCharRef };
  },
});
</script>

<style lang="scss"></style>