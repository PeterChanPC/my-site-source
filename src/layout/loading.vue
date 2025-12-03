<template>
  <div ref="loading" :class="['absolute flex flex-col a-center j-center w--100 h--100 p-50 bg-primary font-size-xl',
    { 'o-0': !loadingStore.isLoading },
    { 'o-1 z-97': loadingStore.isLoading },
    { 'z--100': !loadingStore.isLoading && !loadingStore.is1stLoad },
    { 'tr-3-0': !loadingStore.is1stLoad },
    { 'z-97 tr-10-15': loadingStore.is1stLoad }
  ]">
    <h1 v-if="loadingStore.is1stLoad"
      :class="['lh-1.3em txt-a-center txt-wrap tr-8-3', { 'o-1': loadingStore.isLoading }, { 'o-0': !loadingStore.isLoading }]">
      Use Computer for the Best
      Experience</h1>
  </div>
</template>

<script lang="ts">
import { useLoadingStore } from "@/stores/loading.store";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'loading',
  setup() {
    const loadingStore = useLoadingStore();

    return { loadingStore };
  },
});
</script>

<style lang="scss"></style>