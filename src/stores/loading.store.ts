import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  let isFirstLoad = true;
  const isLoading = ref<boolean>(true);
  // delay of the showing the target page
  // + the duration of the loading screen animation
  const firstTimeout = 0;
  const timeout = 2000;
  const interval = ref<number>(timeout);

  const load = (): void => {
    if (isFirstLoad) {
      interval.value = firstTimeout;
      setTimeout(() => {
        isFirstLoad = false;
        isLoading.value = true;
      }, interval.value);
    } else {
      interval.value = timeout;
      isLoading.value = true;
    };
  };

  const done = (): void => {
    interval.value = timeout;
    setTimeout(() => {
      isLoading.value = false;
    }, interval.value);
  };

  return { isLoading, interval, load, done };
});