<template>
  <router-link ref="card" class="card" :to="{ name: path }">
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
    </div>
  </router-link>
</template>

<script lang="ts">
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
});
</script>

<style scoped lang="scss">
@forward "./card";
</style>