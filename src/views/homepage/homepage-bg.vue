<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import { Clock } from 'three';
import { SceneController } from '@/three/SceneController';
import { CameraController } from '@/three/CameraController';
import RendererController from '@/three/RendererController';
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
      const sceneController = new SceneController('homepage');
      const cameraController = new CameraController('orthographic', 5);

      const scene = sceneController.getScene;
      const playerObject = sceneController.getPlayer;
      const camera = cameraController.getCamera;

      cameraController.setCamera(0, 10, 50);
      sceneController.createScene();

      const collidables = scene.children.filter(obj => obj !== playerObject);
      const physics = new Physics(collidables, camera);
      const gameInput = new GameInput();
      const playerController = new PlayerController(playerObject, gameInput, physics);
      const clock = new Clock();

      function update() {
        const dt = clock.getDelta();
        sceneController.updateTheme(themeStore.theme);
        playerController.applyMovement(dt);
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