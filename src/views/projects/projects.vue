<template>
  <div class="page">
    <div class="absolute t-0 l-0 w-full h-full">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme.store';
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Clock } from 'three';
import { SceneController } from '@/three/SceneController';
import { CameraController } from '@/three/CameraController';
import GameInput from '@/three/GameInput';
import Physics from '@/three/Physics';
import RendererController from '@/three/RendererController';

const { t } = useI18n();
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
const themeStore = useThemeStore();

onMounted(() => {
  if (!canvas.value) return;
  const rendererController = new RendererController(canvas.value);
  const cameraController = new CameraController('perspective');
  const sceneController = new SceneController('project');

  const camera = cameraController.getCamera;
  const scene = sceneController.getScene;
  const player = sceneController.getPlayer;

  sceneController.createScene();
  cameraController.setCamera(0, 0, -15);

  const collidables = scene.children;
  const physics = new Physics(collidables, camera);
  const gameInput = new GameInput();
  const clock = new Clock();

  function update() {
    const elapsedTime = clock.getElapsedTime();
    sceneController.updateTheme(themeStore.theme);
    sceneController.updateScene(elapsedTime);
  };
  rendererController.setAnimation(update, scene, camera);

  rendererController.addResizeListener();
  cameraController.addResizeListener();
  gameInput.addInputListener();

  onUnmounted(() => {
    rendererController.removeResizeListener();
    cameraController.removeResizeListener();
    gameInput.removeInputListener();
  });
});
</script>

<style scoped lang="scss"></style>