<template>
  <div v-if="loadingStore.isVisible" :class="['absolute flex row a-center j-center w-full h-full z-100']">
    <div ref="rect1" class="absolute w-full t-0 r-0.100 h-0.50 bg-primary">1</div>
    <div ref="rect2" class="absolute w-full b-0 l-0.100 h-0.50 bg-primary">2</div>
  </div>
</template>

<script lang="ts">
import { useLoadingStore } from "@/stores/loading.store";
import { defineComponent, watch, useTemplateRef } from "vue";

export default defineComponent({
  name: 'loading',
  setup() {
    const loadingStore = useLoadingStore();

    const rect1 = useTemplateRef<HTMLDivElement>('rect1');
    const rect2 = useTemplateRef<HTMLDivElement>('rect2');
    const keyframes1: Keyframe[] = [
      { right: '100%' },
      { right: '0' },
    ];
    const keyframes2: Keyframe[] = [
      { left: '100%' },
      { left: '0' },
    ];
    const options: KeyframeAnimationOptions = {
      duration: loadingStore.interval,
      easing: 'ease-out',
      fill: 'both',
    };

    function animate() {
      rect1.value?.animate(keyframes1, options);
      rect2.value?.animate(keyframes2, options);
    }

    watch(loadingStore, () => animate());

    return { loadingStore };
  },
});
</script>

<style lang="scss"></style>