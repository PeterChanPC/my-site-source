<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, useTemplateRef, watch } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import { SceneController } from '@/three/SceneController';

export default defineComponent({
  name: 'homepage-background',
  setup(__, { expose }) {
    const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
    const themeStore = useThemeStore();

    onMounted(() => {
      if (!canvas.value) return;
      const sceneController = new SceneController(canvas.value, 'homepage', themeStore.theme);

      sceneController.startScene();

      watch(themeStore, () => sceneController.setTheme(themeStore.theme));

      onUnmounted(() => {
        sceneController.endScene();
      });
    });

    expose();
    return { canvas };
  },
});
</script>

<style lang="scss" scoped></style>