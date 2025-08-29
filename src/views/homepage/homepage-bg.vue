<template>
  <div ref="background" class="homepage-bg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import homepageBg from '@/assets/img/homepage-bg.webp';
import { defineComponent, onMounted, onUnmounted, Ref, ref, useTemplateRef } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import * as THREE from 'three';
import Player from '@/views/homepage/PlayerController';
import GameInput from '@/views/homepage/GameInput';
import Physics from '@/views/homepage/Physics';
import Scene from '@/views/homepage/Scene';

export default defineComponent({
  name: 'homepage-background',
  setup(__, { expose }) {
    const canvas: Ref<HTMLCanvasElement | undefined> = ref(undefined);
    const background: Ref<HTMLDivElement | null> = useTemplateRef('background');
    const themeStore = useThemeStore();

    const isValid = (): Boolean => {
      if (canvas.value) return true;
      return false;
    };

    onMounted(() => {
      if (!isValid() && background.value) {
        background.value.style.cssText = `
          background-position: center;
          background-size: cover;
          background-image: url(${homepageBg});
        `;
      };

      // setup renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas.value,
        antialias: true,
        alpha: true,
      });
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setClearColor(0x000000, 0);


      // setup camera
      let aspect = window.innerWidth / window.innerHeight;
      const camera = new THREE.OrthographicCamera(-5, 5, 5 / aspect, -5 / aspect, 0, 1000);
      camera.position.set(0, 10, 50);
      camera.lookAt(0, 0, 0);

      const scene = new Scene(themeStore.theme);
      scene.createScene();
      const playerObject = scene.getPlayer();

      const collidables = scene.getScene().children.filter(obj => obj !== playerObject);
      const physics = new Physics(collidables, camera);

      const gameInput = new GameInput(physics);
      gameInput.addInputListener();

      const player = new Player(playerObject, gameInput, physics);

      // update frame
      function update() {
        aspect = window.innerWidth / window.innerHeight;
        camera.top = 5 / aspect;
        camera.bottom = -5 / aspect;
        camera.updateProjectionMatrix();

        scene.changeTheme(themeStore.theme);
        player.applyMovement();

        if (background.value) renderer.setSize(background.value.offsetWidth, background.value.offsetHeight);
        renderer.render(scene.getScene(), camera);
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