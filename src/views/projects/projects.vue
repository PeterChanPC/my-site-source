<template>
  <div class="page">
    <div class="absolute t-0 l-0 w-full h-full">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import CameraController from '@/three/CameraController';
import GameInput from '@/three/GameInput';
import Physics from '@/three/Physics';
import SceneController from '@/three/ProjectScene';
import RendererController from '@/three/RendererController';
import { useThemeStore } from '@/stores/theme.store';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
const themeStore = useThemeStore();

onMounted(() => {
  if (!canvas.value) return;
  const rendererController = new RendererController(canvas.value);
  const cameraController = new CameraController(10);
  const sceneController = new SceneController(themeStore.theme);

  const camera = cameraController.getCamera;
  const scene = sceneController.getScene;

  sceneController.createScene();
  cameraController.setCamera(0, 0, 0);

  const collidables = scene.children;
  const physics = new Physics(collidables, camera);
  const gameInput = new GameInput(physics);

  function update() {
    sceneController.changeTheme(themeStore.theme);
    sceneController.updateProps();
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