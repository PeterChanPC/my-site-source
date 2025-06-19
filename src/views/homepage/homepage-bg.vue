<template>
  <div ref="background" class="homepage-bg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import homepageBg from '@/../public/homepage-bg.webp';
import texture from '@/../public/texture-1.webp';
import { defineComponent, onMounted, onUnmounted, Ref, ref, useTemplateRef } from 'vue';
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
    };

    // setup movement vector
    let isMouse = false;
    let pointerPos = new THREE.Vector3(0, 0, 0);
    let pointerDir = new THREE.Vector3(0, 0, 0);
    let moveDir = new THREE.Vector3(0, 0, 0);
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

    let updatePointerPos = (e: MouseEvent) => { };

    const handleMouseDown = () => {
      isMouse = true;
      moveDir.set(pointerDir.x, 0, pointerDir.z).normalize();
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointerPos(e);
      if (isMouse) handleMouseDown();
    };

    const handleMouseUp = () => {
      isMouse = false;
      moveDir.set(0, 0, 0);
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
      const strength = 1;
      const drag = 0.3;
      const mass = 1;
      const bounciness = 0.5;
      let clock = new THREE.Clock();
      let dv = new THREE.Vector3(0, 0, 0);
      let velocity = new THREE.Vector3(0, 0, 0);

      function updatedv() {
        // net F = F - Ff = mass * dv / dt
        let dt = clock.getDelta();
        let F = new THREE.Vector3(moveDir.x, 0, moveDir.z).normalize().multiplyScalar(strength);
        let Ff = new THREE.Vector3(velocity.x, 0, velocity.z).normalize().multiplyScalar(drag);
        dv = F.clone().sub(Ff).multiplyScalar(dt / mass);
        let canPush = dv.length() > 0 && raycast(dv, dv.clone().normalize().length()).length === 0;
        if (Ff.length() > F.length()) canPush = dv.length() > 0 && raycast(dv.clone().negate(), dv.clone().normalize().length()).length === 0;

        if (!canPush) {
          let dvX = new THREE.Vector3(dv.x, 0, 0).normalize();
          canPush = Math.abs(dv.x) > 0 && raycast(dvX, dvX.length()).length === 0;
          if (canPush) {
            velocity.z = 0;
            dv.z = 0;
          } else {
            velocity.x = 0;
            dv.x = 0;
            let dvZ = new THREE.Vector3(0, 0, dv.z).normalize();
            canPush = Math.abs(dv.z) > 0 && raycast(dvZ, dvZ.length()).length === 0;
            if (!canPush) {
              velocity.z = 0;
              dv.z = 0;
            };
          };
        };
        return canPush;
      };

      function updateVelocity() {
        let canMove = raycast(velocity, velocity.clone().normalize().length()).length === 0;

        if (!canMove) {
          let velocityX = new THREE.Vector3(velocity.x, 0, 0);
          canMove = raycast(velocityX, velocityX.clone().normalize().length()).length === 0;
          if (canMove) {
            dv.z = -dv.z;
            velocity.z = -velocity.z * bounciness;
          } else {
            dv.x = -dv.x;
            velocity.x = -velocity.x * bounciness;
            let velocityZ = new THREE.Vector3(0, 0, velocity.z).normalize();
            canMove = raycast(velocityZ, velocityZ.clone().normalize().length()).length === 0;
            if (!canMove) {
              dv.z = -dv.z;
              velocity.z = -velocity.z * bounciness;
            };
          };
        };
        return canMove;
      };

      function applyMovement() {
        let canPush = updatedv();
        let canMove = updateVelocity();

        if (canPush) velocity.add(dv);
        let length = velocity.length();

        if (Math.abs(velocity.x) < Math.abs((dv.x))) {
          velocity.x = 0;
        } else if (velocity.x > 0.5) {
          velocity.x = 0.5 * length;
        } else if (velocity.x < -0.5) {
          velocity.x = -0.5 * length;
        };
        if (Math.abs(velocity.z) < Math.abs((dv.z))) {
          velocity.z = 0;
        } else if (velocity.z > 0.5) {
          velocity.z = 0.5 * length;
        } else if (velocity.z < -0.5) {
          velocity.z = -0.5 * length;
        };

        if (canMove) sphere.position.add(velocity);
      };

      // get poitner position
      updatePointerPos = (e: MouseEvent) => {
        let screenPosX = (e.clientX / window.innerWidth) * 2 - 1;
        let screenPosY = (e.clientY / window.innerHeight) * 2 - 1;
        let screenPos = new THREE.Vector2(screenPosX, screenPosY);
        raycaster.setFromCamera(screenPos, camera);
        raycaster.far = 100;
        const raycastHit = raycaster.intersectObject(floor)[0];
        pointerPos.set(raycastHit.point.x, 0, -raycastHit.point.z);
      };

      const updatePointerDir = () => {
        pointerDir = pointerPos.clone().sub(sphere.position).normalize();
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

        updatePointerDir();
        applyMovement();
        applySpotLight();

        if (background.value) renderer.setSize(background.value.offsetWidth, background.value.offsetHeight);
        renderer.render(scene, camera);
      };
      renderer.setAnimationLoop(update);

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
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