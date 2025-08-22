<template>
  <div ref="background" class="homepage-bg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import homepageBg from '@/assets/homepage-bg.webp';
import texture from '@/assets/texture-1.webp';
import { defineComponent, onMounted, onUnmounted, Ref, ref, useTemplateRef } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import * as THREE from 'three';
import Player from '@/views/homepage/PlayerController';
import GameInput from '@/views/homepage/GameInput';
import Physics from '@/views/homepage/Physics';

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

      // setup scene
      const scene = new THREE.Scene();

      // setup camera
      let aspect = window.innerWidth / window.innerHeight;
      const camera = new THREE.OrthographicCamera(-5, 5, 5 / aspect, -5 / aspect, 0, 1000);
      camera.position.set(0, 10, 50);
      camera.lookAt(0, 0, 0);

      // setup textures
      const texture_1 = new THREE.TextureLoader().load(texture);
      texture_1.wrapS = THREE.RepeatWrapping;
      texture_1.wrapT = THREE.RepeatWrapping;
      texture_1.repeat.set(3, 3);

      // setup materials
      const material_1 = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture_1 });
      const material_2 = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
      const material_3 = new THREE.MeshBasicMaterial({ transparent: true });

      // setup wall object
      const wallGeometry = new THREE.PlaneGeometry(20, 20);
      const wall_1 = new THREE.Mesh(wallGeometry, material_2);
      const wall_2 = new THREE.Mesh(wallGeometry, material_3);
      const wall_3 = new THREE.Mesh(wallGeometry, material_3);
      const wall_4 = new THREE.Mesh(wallGeometry, material_3);
      wall_1.position.set(0, 0, -10);
      wall_1.receiveShadow = true;
      wall_2.rotation.set(0, Math.PI / 2, 0);
      wall_2.position.set(-5, 0, 0);
      wall_3.rotation.set(0, -Math.PI / 2, 0);
      wall_3.position.set(5, 0, 0);
      wall_4.rotation.set(0, Math.PI, 0);
      wall_4.position.set(0, 0, 10);
      wall_1.receiveShadow = true;

      // setup floor object
      const floorGeometry = new THREE.PlaneGeometry(20, 100);
      const floor = new THREE.Mesh(floorGeometry, material_2);
      floor.position.set(0, -1, 0);
      floor.rotation.set(-Math.PI / 2, 0, 0);
      floor.receiveShadow = true;

      //setup lightings
      const ambientLight = new THREE.AmbientLight();
      ambientLight.color.set(0xcccccc);

      const spotLightPrimary = new THREE.SpotLight(0xffffff);
      spotLightPrimary.power = 50000;
      spotLightPrimary.penumbra = 0.8;
      spotLightPrimary.castShadow = true;
      spotLightPrimary.shadow.intensity = 0.8;

      const spotLightSecondary = new THREE.SpotLight(0xdddddd);
      spotLightSecondary.angle = 0.08;
      spotLightSecondary.penumbra = 0.8;
      spotLightSecondary.castShadow = true;
      spotLightSecondary.position.set(-50, 50, 50);
      spotLightSecondary.shadow.intensity = 0.8;

      if (themeStore.theme === 'light') {
        ambientLight.intensity = 1;
        spotLightPrimary.angle = 0.1;
        spotLightPrimary.position.set(50, 50, 50);
        spotLightSecondary.power = 0;
      } else {
        ambientLight.intensity = 0;
        spotLightPrimary.angle = 0.03;
        spotLightPrimary.position.set(-50, 50, 50);
        spotLightSecondary.power = 5000;
      };

      function applySpotLight() {
        if (themeStore.theme === 'light') {
          if (ambientLight.intensity < 1) ambientLight.intensity += 0.05;
          if (spotLightPrimary.angle < 0.1) spotLightPrimary.angle += 0.005;
          spotLightPrimary.position.lerp(new THREE.Vector3(50, 50, 50), 0.1);
          spotLightSecondary.power = 0;
        } else {
          if (ambientLight.intensity > 0) ambientLight.intensity -= 0.05;
          if (spotLightPrimary.angle > 0.03) spotLightPrimary.angle -= 0.005;
          spotLightPrimary.position.lerp(new THREE.Vector3(-50, 50, 50), 0.1);
          spotLightSecondary.power = 5000;
        };
      };

      // setup sphere object
      const sphereRadius = 1;
      const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
      const sphereMesh = new THREE.Mesh(sphereGeometry, material_1);
      sphereMesh.castShadow = true;
      sphereMesh.receiveShadow = true;
      const sphere = new THREE.Object3D().attach(sphereMesh);
      sphere.position.set(3, 0, -2);

      // apply elements to scene
      scene.add(sphere, floor, wall_1, wall_2, wall_3, wall_4, ambientLight, spotLightPrimary, spotLightSecondary);
      
      const collidables = scene.children.filter(obj => obj !== sphere);
      const physics = new Physics(collidables, camera);

      const gameInput = new GameInput(physics);
      gameInput.addInputListener();
      
      const player = new Player(sphere, gameInput, physics);

      // update frame
      function update() {
        aspect = window.innerWidth / window.innerHeight;
        camera.top = 5 / aspect;
        camera.bottom = -5 / aspect;
        camera.updateProjectionMatrix();

        applySpotLight();
        gameInput.handleMovementVector(sphere.position);
        player.applyMovement();

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