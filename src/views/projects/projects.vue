<template>
  <div class="page">
    <div class="absolute t-0 l-0 w-full h-full">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import CameraController from '@/composable/CameraController';
import GameInput from '@/composable/GameInput';
import Physics from '@/composable/Physics';
import SceneController from '@/composable/ProjectScene';
import RendererController from '@/composable/RendererController';
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
  const cameraController = new CameraController(20);
  const sceneController = new SceneController(themeStore.theme);

  const camera = cameraController.getCamera;
  const scene = sceneController.getScene;

  sceneController.createScene();

  const collidables = scene.children;
  const physics = new Physics(collidables, camera);
  const gameInput = new GameInput(physics);
  const controls = new OrbitControls(camera, canvas.value);

  function update() {
    sceneController.changeTheme(themeStore.theme);
  };
  rendererController.setAnimation(update, scene, camera);

  gameInput.addInputListener();
  rendererController.addResizeListener();
  cameraController.addResizeListener();

  onUnmounted(() => {
    gameInput.removeInputListener();
    rendererController.removeResizeListener();
    cameraController.removeResizeListener();
  });
});
</script>

<style scoped lang="scss"></style>