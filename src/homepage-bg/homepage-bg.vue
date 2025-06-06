<template>
  <div class="homepage-bg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import * as THREE from 'three';

export default defineComponent({
  name: 'homepage-background',
  setup() {
    const canvas: Ref<HTMLCanvasElement | THREE.OffscreenCanvas | undefined> = ref(undefined);

    onMounted(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas.value,
        antialias: true,
      });
      
      const material = new THREE.MeshPhongMaterial({color: 0xffffff});
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const sphere = new THREE.Mesh(geometry, material);

      const ambientLight = new THREE.AmbientLight(0xffffff);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 10);
      directionalLight.target.position.set(0, 0, 0);

      scene.add(sphere);
      scene.add(ambientLight);
      scene.add(directionalLight);

      camera.position.z = 5;

      function animate() {
        camera.aspect = window.innerWidth / window.innerHeight;
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

<style scoped lang="scss">
@forward './homepage-bg.scss';
</style>