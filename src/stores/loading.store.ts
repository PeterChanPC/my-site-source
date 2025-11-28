import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  const isFirstLoad = ref<boolean>(true);
  const isLoading = ref<boolean>(true);
  const isVisible = ref<boolean>(true);
  // delay of the showing the target page
  // + the duration of the loading screen animation
  const firstTimeout = 0;
  const timeout = 8000;
  const interval = ref<number>(timeout);

  const load = (): void => {
    if (isFirstLoad.value) {
      interval.value = firstTimeout;
      setTimeout(() => {
        isFirstLoad.value = false;
      }, timeout);
    } else {
      interval.value = timeout;
    };
    isLoading.value = true;
    isVisible.value = true;
  };

  const done = (): void => {
    interval.value = timeout;
    isLoading.value = false;
    setTimeout(() => {
      isVisible.value = false;
    }, interval.value);
  };

  return { isFirstLoad, isLoading, isVisible, interval, load, done };
});