<template>
  <div class="page">
    <div class="absolute t-0 w-dvw h-dvh">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import { ProjectGame } from '@/three/d';

const canvas = useTemplateRef<HTMLCanvasElement>('canvas');

onMounted(() => {
  if (!canvas.value) return;
  const game = new ProjectGame(canvas.value);
  game.start();

  onUnmounted(() => game.end());
});
</script>

<style scoped lang="scss"></style>