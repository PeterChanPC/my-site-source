<template>
  <div v-if="loadingStore.isVisible" :class="['absolute flex row a-center j-center w-full h-full z-100']">
    <div ref="rect1" class="absolute w-0.25 h-full t-0.100 l-0 bg-primary"></div>
    <div ref="rect2" class="absolute w-0.25 h-full t-0.100 l-0.25 bg-primary"></div>
    <div ref="rect3" class="absolute w-0.25 h-full t-0.100 l-0.50 bg-primary"></div>
    <div ref="rect4" class="absolute w-0.25 h-full t-0.100 l-0.75 bg-primary"></div>
  </div>
</template>

<script lang="ts">
import { useLoadingStore } from "@/stores/loading.store";
import { defineComponent, watch, useTemplateRef } from "vue";

export default defineComponent({
  name: 'loading',
  setup() {
    const loadingStore = useLoadingStore();
    const duration = loadingStore.interval * 0.25;

    const rect1 = useTemplateRef<HTMLDivElement>('rect1');
    const rect2 = useTemplateRef<HTMLDivElement>('rect2');
    const rect3 = useTemplateRef<HTMLDivElement>('rect3');
    const rect4 = useTemplateRef<HTMLDivElement>('rect4');
    const keyframes1: Keyframe[] = [
      { top: '100%' },
      { top: '0' },
    ];
    const keyframes2: Keyframe[] = [
      { top: '0' },
      { top: '100%' },
    ];

    function load(): void {
      rect1.value?.animate(keyframes1, {
        duration: duration,
        easing: 'ease',
        fill: 'both',
        delay: 0,
      });
      rect2.value?.animate(keyframes1, {
        duration: duration,
        easing: 'ease',
        fill: 'both',
        delay: duration,
      });
      rect3.value?.animate(keyframes1, {
        duration: duration,
        easing: 'ease',
        fill: 'both',
        delay: duration * 2,
      });
      rect4.value?.animate(keyframes1, {
        duration: duration,
        easing: 'ease',
        fill: 'both',
        delay: duration * 3,
      });
    };

    function done(): void {
      rect1.value?.animate(keyframes2, {
        duration: duration,
        easing: 'ease',
        fill: 'both',
        delay: 0,
      });
      rect2.value?.animate(keyframes2, {
        duration: duration,
        easing: 'ease',
        fill: 'both',
        delay: duration,
      });
      rect3.value?.animate(keyframes2, {
        duration: duration,
        easing: 'ease',
        fill: 'both',
        delay: duration * 2,
      });
      rect4.value?.animate(keyframes2, {
        duration: duration,
        easing: 'ease',
        fill: 'both',
        delay: duration * 3,
      });
    };

    function animate() {
      if (loadingStore.isLoading) {
        load();
      } else {
        load();
        setTimeout(() => {
          done();
        }, duration * 4);
      };
    };

    watch(loadingStore, () => animate());

    return { loadingStore };
  },
});
</script>

<style lang="scss"></style>