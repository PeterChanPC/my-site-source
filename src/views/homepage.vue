<template>
  <div class="page flex row a-center j-start">
    <div class="absolute t-0 l-0 w-full h-full">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="grid grid-cols-2 a-start w-auto pl-0.10 z-1">
      <AnimatedTxt class="col-span-2 hem-1 pb-10 font-size-md" :text="t('hello')" :duration="500" :stagger="50" />
      <AnimatedTxt class="sm:col-span-2 hem-1 font-size-4xl ls-0.5 txt-shadow uppercase" text="peter" :duration="1000"
        :stagger="100" />
      <AnimatedTxt class="hem-1 font-size-4xl ls-0.5 txt-shadow uppercase" text="chan" :duration="1000" :delay="500"
        :stagger="100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedTxt from '@/components/animated-txt.vue';
import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import { useI18n } from 'vue-i18n';
import { SceneController } from '@/three/Scene/SceneController';

const { t } = useI18n();
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
const themeStore = useThemeStore();

onMounted(() => {
  if (!canvas.value) return;

  const sceneController = new SceneController(canvas.value, 'homepage', themeStore.theme);
  sceneController.startScene();

  watch(themeStore, () => sceneController.setTheme(themeStore.theme));

  onUnmounted(() => sceneController.endScene());
});
</script>

<style scoped lang="scss"></style>