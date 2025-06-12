<template>
  <div class="homepage-bg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, Ref, ref } from 'vue';
import * as THREE from 'three';

export default defineComponent({
  name: 'homepage-background',
  setup() {
    const canvas: Ref<HTMLCanvasElement | THREE.OffscreenCanvas | undefined> = ref(undefined);

    const moveDir = new THREE.Vector3(0, 0, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          moveDir.set(0, 0, -1);
          break;
        case 'ArrowDown':
          moveDir.set(0, 0, 1);
          break;
        case 'ArrowLeft':
          moveDir.set(-1, 0, 0);
          break;
        case 'ArrowRight':
          moveDir.set(1, 0, 0);
          break;
        default:
          moveDir.set(0, 0, 0);
      };
    };

    onMounted(() => {
      // setup renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas.value,
        antialias: true,
      });
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // setup scene
      const scene = new THREE.Scene();

      // setup camera
      let aspect = window.innerWidth / window.innerHeight;
      const camera = new THREE.OrthographicCamera(-5, 5, 5 / aspect, -5 / aspect, -10, 100);
      camera.position.set(0, 1, 5);
      camera.lookAt(0, 0, 0);

      // setup materials
      const material_1 = new THREE.MeshPhongMaterial({ color: 0xffffff });
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
      wall_4.position.set(0, 0, 10);
      wall_1.receiveShadow = true;

      // setup floor object
      const floorGeometry = new THREE.BoxGeometry(50, 20, 20);
      const floor = new THREE.Mesh(floorGeometry, material_2);
      floor.position.set(0, -11, 0);
      floor.rotation.set(-Math.PI / 2, 0, 0);
      floor.receiveShadow = true;

      //setup lightings
      const ambientLight = new THREE.AmbientLight(0xdddddd);

      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.power = 50000;
      spotLight.angle = 0.1;
      spotLight.penumbra = 0.8;
      spotLight.castShadow = true;
      spotLight.position.set(50, 50, 50);

      // setup sphere object
      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const sphere = new THREE.Mesh(sphereGeometry, material_1);
      sphere.position.set(2, 0, -2);
      sphere.castShadow = true;
      sphere.receiveShadow = true;

      // setup raycaster
      const raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), 0, 1);

      function rayCast() {
        raycaster.set(sphere.position, moveDir);
      };

      // setup user movement controller
      window.addEventListener('keydown', handleKeyDown);

      function moveObject() {
        const speed = 0.2;
        sphere.position.add(moveDir.multiplyScalar(speed));
      };

      // apply elements to scene
      scene.add(sphere);
      scene.add(floor);
      scene.add(wall_1);
      scene.add(wall_2);
      scene.add(wall_3);
      scene.add(wall_4);
      scene.add(ambientLight);
      scene.add(spotLight);

      // setup animation update
      let clock = new THREE.Clock();
      let delta = 0;
      let interval = 1 / 60; // 60fps

      function update() {
        delta += clock.getDelta();

        aspect = window.innerWidth / window.innerHeight;
        camera.top = 5 / aspect;
        camera.bottom = -5 / aspect;
        camera.updateProjectionMatrix();

        if (delta > interval) { // fixed fps update
          rayCast();
          if (raycaster.intersectObjects(scene.children).length === 0) moveObject();
          delta = delta % interval;
        };

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
      };
      renderer.setAnimationLoop(update);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return { canvas, handleKeyDown };
  },
});
</script>