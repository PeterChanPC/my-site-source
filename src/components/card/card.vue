<template>
  <div class="card">
    <div class="card-img-wrapper">
      <img :src="src" :alt="title">
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'card',
  props: {
    src: {
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
    return { Arrow };
  },
});
</script>

<style scoped lang="scss">
@forward "./card";
</style>