import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  const isFirstLoad = ref<boolean>(true);
  const isLoading = ref<boolean>(false);
  const isVisible = ref<boolean>(false);
  // delay of the showing the target page
  // + the duration of the loading screen animation
  const onMountTimeout = 0;
  const firstLoadTimeout = 26000; // 26000
  const timeout = 2100; // 2100
  const interval = ref<number>(firstLoadTimeout);
  const to = ref<string>('');

  const load = (toPath: string): void => { // called in route guard
    if (isLoading.value) return;
    if (isFirstLoad.value) {
      interval.value = onMountTimeout; // for immediate show loading view
      setTimeout(() => { // delaying for first load animation
        isFirstLoad.value = false;
        isVisible.value = false;
      }, firstLoadTimeout);
    } else {
      interval.value = timeout;
      setTimeout(() => {
        isVisible.value = false;
      }, interval.value);
    };
    isLoading.value = true;
    isVisible.value = true;
    to.value = toPath;
  };

  const done = (): void => { // called in views onMounted()
    isLoading.value = false;
  };

  return { isFirstLoad, isLoading, isVisible, interval, to, load, done };
});