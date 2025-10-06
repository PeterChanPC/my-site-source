<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import RendererController from '@/composable/RendererController';
import CameraController from '@/composable/CameraController';
import SceneController from '@/composable/SceneController';
import Physics from '@/composable/Physics';
import GameInput from '@/composable/GameInput';
import PlayerController from '@/composable/PlayerController';

export default defineComponent({
  name: 'homepage-background',
  setup(__, { expose }) {
    const canvas = useTemplateRef<HTMLCanvasElement | null>('canvas');
    const themeStore = useThemeStore();

    onMounted(() => {
      const rendererController = new RendererController(canvas.value);
      const cameraController = new CameraController();
      const sceneController = new SceneController(themeStore.theme);

      const camera = cameraController.getCamera;
      const scene = sceneController.getScene;
      const playerObject = sceneController.getPlayerObject;

      sceneController.createScene();

      const collidables = scene.children.filter(obj => obj !== playerObject);
      const physics = new Physics(collidables, camera);
      const gameInput = new GameInput(physics);
      const playerController = new PlayerController(playerObject, gameInput, physics);

      function update() {
        sceneController.changeTheme(themeStore.theme);
        playerController.applyMovement();
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

    expose();
    return { canvas };
  },
});
</script>

<style lang="scss" scoped></style>