<template>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading.store';
const loadingStore = useLoadingStore();
loadingStore.load();
</script>

<style lang="scss" scoped>
.test {
  width: 100dvw;
  height: 100dvh;
}
</style>