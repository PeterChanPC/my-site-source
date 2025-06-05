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
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      camera.position.z = 5;
      
      function animate() {
        renderer.render(scene, camera);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
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