import { defineStore } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  const is1stLoad = ref<boolean>(true);
  const isLoading = ref<boolean>(false);
  const duration = ref<number>(0);

  const load = (): void => { // called in beforeEach
    isLoading.value = true;
  };

  const done = (): void => { // called in afterEach
    duration.value = 500; // duration after first load

    setTimeout(() => {
      isLoading.value = false;
    }, duration.value);

    setTimeout(() => {
      is1stLoad.value = false;
    }, 2500)
  };

  const block = (e: MouseEvent): void => {
    if (isLoading.value || is1stLoad.value) {
      e.preventDefault();
      e.stopPropagation();
      return;
    };
  };

  onMounted(() => window.addEventListener('click', block, true));
  onUnmounted(() => window.removeEventListener('click', block, true));

  return { is1stLoad, isLoading, duration, load, done };
});