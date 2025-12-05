<template>
  <div>
    <span :class="[{ 'o-0': animation === 'fadeIn' }]" v-for="(char, i) in chars" :key="i"
      :ref="el => setCharRef(el, i)">
      {{ char }}
    </span>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, defineComponent } from 'vue';
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
    },
  },
  setup(props, { expose }) {
    // process chars
    const chars = computed(() => {
      const text = props.text.split('');
      // Capitalize, check for white space and 'I'
      text[0] = text[0].toUpperCase();
      for (let i = 0; i < props.text.length; i++) {
        if (text[i - 1] === ' '
          || text[i + 1] === "'"
          || text[i - 1] === ' '
          && text[i] === 'i') {
          text[i] = text[i].toUpperCase();
        };
      };
      return text;
    });

    // process charRefs from ref + v-for
    const charRefs = ref<(HTMLElement | null)[]>([]);
    function setCharRef(el: Element | ComponentPublicInstance | null, i: number) {
      if (el instanceof HTMLElement) {
        charRefs.value[i] = el;
      } else {
        charRefs.value[i] = null;
      };
    };

    // fade in animation
    const fadeIn: Keyframe[] = [
      { opacity: 0 },
      { opacity: 1 },
    ];
    const fadeOut: Keyframe[] = [
      { opacity: 1 },
      { opacity: 0 },
    ];

    function animate() {
      let keyframes: Keyframe[];
      if (props.animation === 'fadeIn') {
        keyframes = fadeIn;
      } else if (props.animation === 'fadeOut') {
        keyframes = fadeOut;
      };

      setTimeout(() => {
        charRefs.value.forEach((el, i) => {
          el?.animate(keyframes,
            {
              duration: props.duration,
              delay: i * props.stagger,
              fill: 'both',
            },
          );
        });
      }, props.delay);
    };

    // animate on load
    onMounted(() => animate());

    // animate on update (e.g. language change)
    watch(chars, () => {
      charRefs.value = [];
      animate();
    });

    expose();
    return { chars, setCharRef };
  },
});
</script>

<style lang="scss"></style>