<template>
  <div class="homepage-bg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, render } from 'vue';
import * as THREE from 'three';

export default defineComponent({
  name: 'homepage-background',
  setup() {
    const canvas: Ref<HTMLCanvasElement | THREE.OffscreenCanvas | undefined> = ref(undefined);

    onMounted(() => {
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas.value,
        antialias: true,
      });
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();

      let aspect = renderer.domElement.width / renderer.domElement.height;
      const camera = new THREE.OrthographicCamera(-5, 5, 5 / aspect, -5 / aspect);
      camera.position.set(0, 1, 5);
      camera.lookAt(0, 0, 0);

      const material_1 = new THREE.MeshStandardMaterial({color: 0xffffff});
      const material_2 = new THREE.MeshStandardMaterial({color: 0xeeeeee});
      const material_3 = new THREE.MeshStandardMaterial({color: 0xdddddd});

      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const sphere = new THREE.Mesh(sphereGeometry, material_1);
      sphere.position.set(2, 0, -2);
      sphere.castShadow = true;
      sphere.receiveShadow = true;

      const wallGeometry = new THREE.PlaneGeometry(100, 100);
      const wall = new THREE.Mesh(wallGeometry, material_2);
      wall.position.set(0, 0, -5);
      wall.receiveShadow = true;
      
      const floorGeometry = new THREE.BoxGeometry(100, 10, 20);
      const floor = new THREE.Mesh(floorGeometry, material_3);
      floor.position.set(0, -11.1, 0);
      floor.rotation.set(-Math.PI / 2, 0, 0);
      floor.receiveShadow = true;

      const ambientLight = new THREE.AmbientLight(0xdddddd);

      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.power = 300;
      spotLight.angle = 0.5;
      spotLight.penumbra = 0.3;
      spotLight.castShadow = true;
      spotLight.position.set(5, 5, 4);

      scene.add(sphere);
      scene.add(floor);
      scene.add(wall);
      scene.add(ambientLight);
      scene.add(spotLight);

      function animate() {
        aspect = renderer.domElement.width / renderer.domElement.height;
        camera.top = 5 / aspect;
        camera.bottom = -5 / aspect;

        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
      };
      renderer.setAnimationLoop(animate);
    });

    return { canvas };
  },
});
</script>