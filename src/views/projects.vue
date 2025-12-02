<template>
  <div class="page">
    <div class="absolute t-0 l-0 w-full h-full">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { ProjectGame } from '@/three/d';

const { t } = useI18n();
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');

onMounted(() => {
  if (!canvas.value) return;
  const game = new ProjectGame(canvas.value);
  game.start();

  onUnmounted(() => game.end());
});
</script>

<style scoped lang="scss"></style>