<template>
  <div ref="background" class="homepage-bg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import homepageBg from '@/assets/img/homepage-bg.webp';
import { defineComponent, onMounted, onUnmounted, Ref, ref, render, useTemplateRef } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import RendererController from '@/views/homepage/RendererController';
import CameraController from '@/views/homepage/CameraController';
import SceneController from '@/views/homepage/SceneController';
import Physics from '@/views/homepage/Physics';
import GameInput from '@/views/homepage/GameInput';
import PlayerController from '@/views/homepage/PlayerController';

export default defineComponent({
  name: 'homepage-background',
  setup(__, { expose }) {
    const canvas: Ref<HTMLCanvasElement | null> = useTemplateRef('canvas');
    const background: Ref<HTMLDivElement | null> = useTemplateRef('background');
    const themeStore = useThemeStore();

    onMounted(() => {
      // fallback background
      if (!canvas.value && background.value) {
        background.value.style.cssText = `
          background-position: center;
          background-size: cover;
          background-image: url(${homepageBg});
        `;
      };

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

<style lang="scss" scoped>
.homepage-bg {
  width: 100dvw;
  height: 100dvh;
}
</style>