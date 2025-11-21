<template>
  <div class="page">
    <h1>Sorry</h1>
    <h2>This page is not yet online</h2>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading.store';
import { onMounted } from 'vue';
const loadingStore = useLoadingStore();

onMounted(() => {
  loadingStore.done();
});
</script>

<style scoped lang="scss"></style>