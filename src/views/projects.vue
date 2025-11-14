<template>
  <div class="page">
    <div class="absolute t-0 l-0 w-full h-full">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme.store';
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { SceneController } from '@/three/Scene/SceneController';

const { t } = useI18n();
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
const themeStore = useThemeStore();

onMounted(() => {
  if (!canvas.value) return;
  const sceneController = new SceneController(canvas.value, 'project', themeStore.theme);

  sceneController.startScene();

  watch(themeStore, () => sceneController.setTheme(themeStore.theme));

  onUnmounted(() => {
    sceneController.endScene();
  });
});
</script>

<style scoped lang="scss"></style>