import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  const is1stLoad = ref<boolean>(true);
  const isLoading = ref<boolean>(false);
  const loadStarted = ref<boolean>(false);
  const duration = ref<number>(0);
  const firstLoadDuration = 3000;
  const normalLoadDuration = 500;
  let animationDuration = 0;

  function load(): void { // called in beforeEach
    isLoading.value = true;
    loadStarted.value = true;
  };

  function done(): void { // called in afterEach
    duration.value = normalLoadDuration; // set up duration for externals after 1st load
    animationDuration = normalLoadDuration * 2;
    if (is1stLoad.value) animationDuration = firstLoadDuration;
    setTimeout(() => is1stLoad.value = false, firstLoadDuration);  // enable ball animation, disable 1stLoad animations
    setTimeout(() => isLoading.value = false, normalLoadDuration); // trigger endLoad animation
    setTimeout(() => loadStarted.value = false, animationDuration); // enable navigation
  };

  return { is1stLoad, isLoading, loadStarted, duration, normalLoadDuration, firstLoadDuration, load, done };
});