<template>
  <div ref="card" class="card">
    <div class="card-img-wrapper">
      <img :src="imgSrc" :alt="title">
    </div>
    <div class="card-details">
      <div class="card-title">
        <span>{{ title }}</span>
      </div>
      <div class="card-descriptions">
        <span>{{ description }}</span>
      </div>
      <div class="card-btn">
        <router-link class="arrow-wrapper" :to="{ name: path }">
          <img :src="Arrow" alt="To">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Arrow from '@/assets/img/fi-rr-angle-double-right.svg';
import { CSSProperties, defineComponent, ref, useTemplateRef } from 'vue';

export default defineComponent({
  name: 'card',
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Title',
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup() {
    const card = useTemplateRef<HTMLDivElement>('card');
    const isDragging = ref<Boolean>(false);
    let mouseX = 0;
    let mouseY = 0;
    const style = ref<CSSProperties>({
      position: 'fixed',
      top: `${mouseY}px`,
      left: `${mouseX}px`,
    });

    return { Arrow, style };
  },
});
</script>

<style scoped lang="scss">
@forward "./card";
</style>