<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import { CameraController } from '@/three/CameraController';
import RendererController from '@/three/RendererController';
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
      const sceneController = new SceneController(themeStore.theme);
      const cameraController = new CameraController('orthographic', 5);
      
      const scene = sceneController.getScene;
      const playerObject = sceneController.getPlayerObject;
      const camera = cameraController.getCamera;

      cameraController.setCamera(0, 10, 50);
      sceneController.createScene();

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