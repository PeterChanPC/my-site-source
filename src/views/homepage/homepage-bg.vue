<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import RendererController from '@/three/RendererController';
import CameraController from '@/three/OrthographicCameraController';
import SceneController from '@/three/HomepageBgScene';
import Physics from '@/three/Physics';
import GameInput from '@/three/GameInput';
import PlayerController from '@/three/PlayerController';

export default defineComponent({
  name: 'homepage-background',
  setup(__, { expose }) {
    const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
    const themeStore = useThemeStore();

    onMounted(() => {
      if (!canvas.value) return;
      const rendererController = new RendererController(canvas.value);
      const cameraController = new CameraController(5);
      const sceneController = new SceneController(themeStore.theme);

      const camera = cameraController.getCamera;
      const scene = sceneController.getScene;
      const playerObject = sceneController.getPlayerObject;

      sceneController.createScene();
      cameraController.setCamera(0, 10, 50);

      const collidables = scene.children.filter(obj => obj !== playerObject);
      const physics = new Physics(collidables, camera);
      const gameInput = new GameInput();
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