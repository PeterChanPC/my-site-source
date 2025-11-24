import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  const isFirstLoad = ref<boolean>(true);
  const isLoading = ref<boolean>(true);
  const isVisible = ref<boolean>(true);
  const firstLoadInterval: number = 3000;
  const interval: number = 200;

  const load = (): void => {
    if (isFirstLoad.value) {
      setTimeout(() => {
        isFirstLoad.value = false;
        isLoading.value = true;
        isVisible.value = true;
      }, firstLoadInterval);
    } else {
      isLoading.value = true;
      isVisible.value = true;
    };
  };

  const done = (): void => {
    if (isFirstLoad.value) {
      setTimeout(() => {
        isLoading.value = false;
        isVisible.value = false;
      }, firstLoadInterval);
    } else {
      isLoading.value = false;
      setTimeout(() => {
        isVisible.value = false;
      }, interval);
    };
  };

  return { isFirstLoad, isLoading, isVisible, interval, load, done };
});