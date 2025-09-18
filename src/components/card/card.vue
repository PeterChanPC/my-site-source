<template>
  <div ref="card" class="card">
    <div class="card-img-wrapper">
      <img :src="imgSrc" :alt="title">
    </div>
    <div class="card-details">
      <div class="card-title">
        <AHoverable :path="path" shape="pill" effect="underline-left">
          <div class="wrapper">
            <span>{{ id }}. {{ title }}</span>
          </div>
        </AHoverable>
      </div>
      <div class="card-descriptions">
        <span>{{ description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AHoverable from '@/components/a-hoverable/a-hoverable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'card',
  components: {
    AHoverable,
  },
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 0,
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
});
</script>

<style scoped lang="scss">
@forward "./card";
</style>