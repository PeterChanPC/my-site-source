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
    const canvas: Ref<HTMLCanvasElement | undefined> = ref(undefined);
    const background: Ref<HTMLDivElement | null> = useTemplateRef('background');
    const themeStore = useThemeStore();

    onMounted(() => {
      if (!canvas.value && background.value) {
        background.value.style.cssText = `
          background-position: center;
          background-size: cover;
          background-image: url(${homepageBg});
        `;
      };

      const rendererController = new RendererController(canvas.value);
      const renderer = rendererController.getRenderer;

      const cameraController = new CameraController();
      const camera = cameraController.getCamera;

      const sceneController = new SceneController(themeStore.theme);
      sceneController.createScene();
      const playerObject = sceneController.getPlayerObject;
      const scene = sceneController.getScene;
      const collidables = scene.children.filter(obj => obj !== playerObject);

      const physics = new Physics(collidables, camera);
      const gameInput = new GameInput(physics);
      const playerController = new PlayerController(playerObject, gameInput, physics);

      gameInput.addInputListener();

      // update frame
      function update() {
        cameraController.updateCamera();
        sceneController.changeTheme(themeStore.theme);
        playerController.applyMovement();

        if (background.value) renderer.setSize(background.value.offsetWidth, background.value.offsetHeight);
        renderer.render(scene, camera);
      };
      renderer.setAnimationLoop(update);

      onUnmounted(() => {
        gameInput.removeInputListener();
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