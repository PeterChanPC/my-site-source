<template>
  <div ref="background" class="homepage-bg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import homepageBg from '@/../public/homepage-bg.webp';
import texture from '@/../public/texture-1.webp';
import { defineComponent, onBeforeUnmount, onMounted, onUnmounted, Ref, ref, useTemplateRef } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import * as THREE from 'three';

export default defineComponent({
  name: 'homepage-background',
  setup(__, { expose }) {
    const canvas: Ref<HTMLCanvasElement | undefined> = ref(undefined);
    const background: Ref<HTMLDivElement | null> = useTemplateRef('background');
    const themeStore = useThemeStore();

    const isValid = (): Boolean => {
      if (canvas.value) return true;
      return false;
    }

    // setup movement vector
    const moveDir = new THREE.Vector3(0, 0, 0);
    let moveUp = false;
    let moveDown = false;
    let moveLeft = false;
    let moveRight = false;

    const handleMovementVector = () => {
      if (moveUp) {
        moveDir.z = -1;
        if (moveDown) moveDir.z = 0;
      } else if (moveDown) {
        moveDir.z = 1;
        if (moveUp) moveDir.z = 0;
      } else {
        moveDir.z = 0;
      };
      if (moveLeft) {
        moveDir.x = -1;
        if (moveRight) moveDir.x = 0;
      } else if (moveRight) {
        moveDir.x = 1;
        if (moveLeft) moveDir.x = 0;
      } else {
        moveDir.x = 0;
      };
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          moveUp = true;
          break;
        case 'ArrowDown':
          moveDown = true;
          break;
        case 'ArrowLeft':
          moveLeft = true;
          break;
        case 'ArrowRight':
          moveRight = true;
          break;
      };
      handleMovementVector();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          moveUp = false;
          break;
        case 'ArrowDown':
          moveDown = false;
          break;
        case 'ArrowLeft':
          moveLeft = false;
          break;
        case 'ArrowRight':
          moveRight = false;
          break;
      };
      handleMovementVector();
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
      const camera = new THREE.OrthographicCamera(-5, 5, 5 / aspect, -5 / aspect, -10, 100);
      camera.position.set(0, 1, 5);
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
      const wallGeometry = new THREE.PlaneGeometry(50, 50);
      const wall_1 = new THREE.Mesh(wallGeometry, material_2);
      const wall_2 = new THREE.Mesh(wallGeometry, material_3);
      const wall_3 = new THREE.Mesh(wallGeometry, material_3);
      const wall_4 = new THREE.Mesh(wallGeometry, material_3);
      wall_1.position.set(0, 0, -8);
      wall_1.receiveShadow = true;
      wall_2.rotation.set(0, Math.PI / 2, 0);
      wall_2.position.set(-5, 0, 0);
      wall_3.rotation.set(0, -Math.PI / 2, 0);
      wall_3.position.set(5, 0, 0);
      wall_4.rotation.set(0, Math.PI, 0);
      wall_4.position.set(0, 0, 9);
      wall_1.receiveShadow = true;

      // setup floor object
      const floorGeometry = new THREE.BoxGeometry(50, 20, 20);
      const floor = new THREE.Mesh(floorGeometry, material_2);
      floor.position.set(0, -11, 0);
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
      const sphere = new THREE.Object3D().add(sphereMesh);
      sphere.position.set(3, 0, -2);

      // setup raycaster
      const raycaster = new THREE.Raycaster();
      function raycast(dir: THREE.Vector3, maxDistance: number) {
        const collidables = scene.children.filter(obj => obj !== sphere);
        raycaster.set(sphere.position, dir);
        raycaster.far = maxDistance;
        return raycaster.intersectObjects(collidables);
      };

      // setup user movement controller
      let clock = new THREE.Clock();
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      function applyMovement() {
        const speed = 5;
        let delta = clock.getDelta();
        let distance = speed * delta;
        let canMove = raycast(moveDir, moveDir.clone().length()).length === 0;
        let velocity = moveDir.clone().normalize().multiplyScalar(distance);

        if (!canMove) {
          let moveDirX = new THREE.Vector3(moveDir.x, 0, 0);
          canMove = raycast(moveDirX, sphereRadius).length === 0;
          if (canMove) {
            velocity.set(moveDir.x * distance, 0, 0);
          } else {
          let moveDirZ = new THREE.Vector3(0, 0, moveDir.z);
          canMove = raycast(moveDirZ, sphereRadius).length === 0;
            if (canMove) {
              velocity.set(0, 0, moveDir.z * distance);
            };
          };
        };

        velocity.z *= 2; // vertical speed compensation
        if (canMove) sphere.position.add(velocity);
      };

      // apply elements to scene
      scene.add(sphere);
      scene.add(floor);
      scene.add(wall_1);
      scene.add(wall_2);
      scene.add(wall_3);
      scene.add(wall_4);
      scene.add(ambientLight);
      scene.add(spotLightPrimary);
      scene.add(spotLightSecondary);

      // setup update
      function update() {
        aspect = window.innerWidth / window.innerHeight;
        camera.top = 5 / aspect;
        camera.bottom = -5 / aspect;
        camera.updateProjectionMatrix();

        applyMovement();
        applySpotLight();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
      };
      renderer.setAnimationLoop(update);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    });

    expose();
    return { canvas };
  },
});
</script>

<style lang="scss">
.homepage-bg {
  width: 100%;
  height: 100%;
}
</style>