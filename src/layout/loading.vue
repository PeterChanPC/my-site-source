<template>
  <div ref="loading" :class="['absolute flex flex-col a-center j-center w--100 h--100 p-50 bg-primary font-size-xl',
    { 'o-0': !loadingStore.isLoading },
    { 'o-1 z-97': loadingStore.isLoading },
    { 'z--100': !loadingStore.isLoading && !loadingStore.is1stLoad },
    { 'tr-3-0': !loadingStore.is1stLoad },
    { 'z-97 tr-10-15': loadingStore.is1stLoad }
  ]">
    <h1 v-if="loadingStore.is1stLoad"
      :class="['lh-1.3em txt-a-center txt-wrap tr-8-3', { 'o-1': loadingStore.isLoading }, { 'o-0': !loadingStore.isLoading }]">
      Use Computer for the Best
      Experience</h1>
    <div ref="ball" v-if="!loadingStore.is1stLoad" class="absolute w-50 h-50 border-round bg-primary invert tr-0-0">
    </div>
  </div>
</template>

<script lang="ts">
import { useLoadingStore } from "@/stores/loading.store";
import { defineComponent, useTemplateRef, watch } from "vue";

export default defineComponent({
  name: 'loading',
  setup() {
    const loadingStore = useLoadingStore();
    const ball = useTemplateRef<HTMLDivElement>('ball');

    function animate(): void {
      ball.value?.animate([
        { transform: 'translateY(0px) scaleX(1) scaleY(1)' },
        { transform: 'translateY(5px) scaleX(0.9) scaleY(1.1)' },
        { transform: 'translateY(10px) scaleX(0.8) scaleY(1.2)' },
        { transform: 'translateY(15px) scaleX(0.9) scaleY(1.1)' },
        { transform: 'translateY(20px) scaleX(1) scaleY(1)' },
        { transform: 'translateY(15px) scaleX(1) scaleY(1)' },
        { transform: 'translateY(10px) scaleX(1) scaleY(1)' },
        { transform: 'translateY(5px) scaleX(1) scaleY(1)' },
        { transform: 'translateY(0px) scaleX(1.1) scaleY(0.9)' },
      ], {
        duration: 500,
        easing: 'ease-in-out',
        iterations: Infinity
      });
    };
    watch(loadingStore, () => requestAnimationFrame(animate));

    return { loadingStore };
  },
});
</script>

<style lang="scss"></style>