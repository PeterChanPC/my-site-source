<template>
  <div
    :class="['absolute flex flex-col a-center j-center w--100 h--100 p-50 bg-primary font-size-xl z-97 tr-1000', { 'o-0': !loadingStore.isLoading }, { 'o-1': loadingStore.isLoading }]">
    <h1
      :class="['lh-1.3em txt-a-center txt-wrap', { 'o-1': loadingStore.isFirstLoad }, { 'o-0': !loadingStore.isFirstLoad }]">
      Use Computer for the Best
      Experience</h1>
  </div>
</template>

<script lang="ts">
import { useLoadingStore } from "@/stores/loading.store";
import { defineComponent, watchEffect } from "vue";

export default defineComponent({
  name: 'loading',
  setup() {
    const loadingStore = useLoadingStore();

    return { loadingStore };
  },
});
</script>

<style lang="scss"></style>