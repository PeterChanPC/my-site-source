<template>
  <div class="page flex row a-center j-start">
    <div class="absolute t-0 l-0 w-full h-full">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="grid grid-cols-2 a-start w-auto pl-0.10 z-1">
      <AnimatedTxt class="col-span-2 hem-1 pb-10 font-size-md" :text="t('hello')" :duration="500" :stagger="50"
        :delay="getDelay()" />
      <AnimatedTxt class="sm:col-span-2 hem-1 font-size-4xl ls-0.5 txt-shadow uppercase" text="peter" :duration="1000"
        :stagger="100" :delay="getDelay()" />
      <AnimatedTxt class="hem-1 font-size-4xl ls-0.5 txt-shadow uppercase" text="chan" :duration="1000"
        :delay="500 + getDelay()" :stagger="100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedTxt from '@/components/animated-txt.vue';
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLoadingStore } from '@/stores/loading.store';
import { HomepageGame } from '@/three/d';

const { t } = useI18n();
const loadingStore = useLoadingStore();
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');

function getDelay(): number { // add delay for loading animation
  // fast forward for blending the animations tgt
  if (loadingStore.is1stLoad) {
    return loadingStore.firstLoadDuration - 300;
  } else if (loadingStore.isLoading) {
    return loadingStore.normalDuration - 200;
  };
  return 0;
};

onMounted(() => {
  if (!canvas.value) return;
  const game = new HomepageGame(canvas.value);
  game.start();

  onUnmounted(() => game.end());
});
</script>

<style scoped lang="scss"></style>