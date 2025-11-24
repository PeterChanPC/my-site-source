<template>
  <div :class="[
    { 'flex': loadingStore.isVisible },
    { 'none': !loadingStore.isVisible },
    { 'tr-1000': loadingStore.isFirstLoad },
    { 'tr-200': !loadingStore.isFirstLoad },
    'absolute row a-center j-center w-full h-full bg-primary z-97']">
    <span>
      Loading {{ dots }}
    </span>
  </div>
</template>

<script lang="ts">
import { useLoadingStore } from "@/stores/loading.store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'loading',
  setup() {
    const loadingStore = useLoadingStore();
    const dots = ref<string>('');
    setInterval(() => {
      if (dots.value.length > 2) {
        dots.value = '';
        return;
      };
      dots.value += '.';
    }, 200);

    return { loadingStore, dots };
  },
});
</script>

<style lang="scss"></style>