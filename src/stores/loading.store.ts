import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  /**
   * if duration is changed, transition.scss file also needs to be adjusted
   */
  const isFirstLoad = ref<boolean>(true);
  const isLoading = ref<boolean>(false);
  const firstLoadDuration = 4500;
  const duration = 500;

  function load(): void { // called in beforeEach
    if (isLoading.value) return;
    isLoading.value = true;
  };

  function done(): void { // called in afterEach
    if (!isLoading.value) return;
    if (isFirstLoad.value) setTimeout(() => isFirstLoad.value = false, firstLoadDuration);
    isLoading.value = false;
  };

  return { isFirstLoad, isLoading, duration, load, done };
});