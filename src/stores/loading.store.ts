import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  /**
   * if duration is changed, transition.scss file also needs to be adjusted
   */
  const loadCount = parseInt(sessionStorage.loadCount);
  const isFirstLoad = ref<boolean>(loadCount > 0 ? false : true);
  const isLoading = ref<boolean>(false);
  const firstLoadDuration = 4500;
  const duration = 500;

  function load(): void { // called in beforeEach
    if (isLoading.value) return;
    isLoading.value = true;
    let loadCount = parseInt(sessionStorage.loadCount);
    loadCount ? loadCount += 1 : loadCount = 1;
    sessionStorage.loadCount = loadCount;
  };

  function done(): void { // called in afterEach
    if (!isLoading.value) return;
    if (isFirstLoad.value) setTimeout(() => isFirstLoad.value = false, firstLoadDuration);
    isLoading.value = false;
  };

  return { isFirstLoad, isLoading, duration, load, done };
});