import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
  /**
   * if duration is changed, transition.scss file also needs to be adjusted
   */
  const loadCount = ref<number>(parseInt(sessionStorage.loadCount));
  const isFirstLoad = ref<boolean>(loadCount.value > 0 ? false : true);
  const isLoading = ref<boolean>(false);
  const firstLoadDuration = 4500;
  const duration = 500;

  function load(): void {
    // called in beforeEach
    if (isLoading.value) return;
    isLoading.value = true;
    loadCount.value ? (loadCount.value += 1) : (loadCount.value = 1);
    sessionStorage.loadCount = loadCount.value;
  }

  function done(): void {
    // called in afterEach
    if (!isLoading.value) return;
    if (isFirstLoad.value)
      setTimeout(() => (isFirstLoad.value = false), firstLoadDuration);
    isLoading.value = false;
  }

  return { isFirstLoad, isLoading, duration, load, done };
});
