import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref<boolean>(true);
  const isVisible = ref<boolean>(true);
  const interval: number = 1000;

  const load = (): void => {
    isLoading.value = true;
    isVisible.value = true;
  };

  const done = (): void => {
    isLoading.value = false;
    setTimeout(() => {
      isVisible.value = false;
    }, interval);
  };

  return { isLoading, isVisible, interval, load, done };
});