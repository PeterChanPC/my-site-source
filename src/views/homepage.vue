<template>
  <div class="page flex a-center j-start" @click="hideIntro()">
    <div class="absolute t-0 w-dvw h-dvh">
      <canvas ref="canvas"></canvas>
    </div>
    <AnimatedTxt v-if="!isStarted && !loadingStore.isLoading"
      class="hem-10 pl-1/10 pr-1/10 font-size-xl lsem-0.5 txt-center txt-shadow z-1" :text="t('click')" :duration="3000"
      animation="fadeLoop" />
    <div v-if="isStarted" class="grid grid-cols-2 pl-1/10 pr-1/10 z-1">
      <AnimatedTxt class="col-span-2 hem-10 pb-10 font-size-md lsem-0.1" :text="t('hello')" :duration="500" :stagger="50" />
      <AnimatedTxt class="sm:col-span-2 hem-10 font-size-4xl lsem-0.5 txt-shadow uppercase" text="peter" :duration="1000"
        :stagger="100" />
      <AnimatedTxt class="sm:col-span-2 hem-10 font-size-4xl lsem-0.5 txt-shadow uppercase" text="chan" :duration="1000" :delay="500"
        :stagger="100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedTxt from '@/components/animated-txt.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLoadingStore } from '@/stores/loading.store';
import { HomepageGame } from '@/three/d';

const { t } = useI18n();
const loadingStore = useLoadingStore();
const canvas = ref<HTMLCanvasElement | null>(null);
const isStarted = ref<boolean>(false);

function hideIntro(): void {
  isStarted.value = true;
};

onMounted(() => {
  if (!canvas.value) return;
  const game = new HomepageGame(canvas.value);
  game.start();

  onUnmounted(() => game.end());
});
</script>

<style scoped lang="scss"></style>