import { defineStore } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  const is1stLoad = ref<boolean>(true);
  const isLoading = ref<boolean>(false);
  const duration = ref<number>(0);
  const firstLoadDuration = 3000;
  const normalDuration = 500;

  const load = (): void => { // called in beforeEach
    if (isLoading.value) return; // prevent spamming
    isLoading.value = true;
  };

  const done = (): void => { // called in afterEach
    if (!isLoading.value) return;
    duration.value = normalDuration; // set up duration for externals after first load

    setTimeout(() => {
      isLoading.value = false;
    }, normalDuration);

    setTimeout(() => {
      is1stLoad.value = false;
    }, firstLoadDuration)
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

  return { is1stLoad, isLoading, duration, normalDuration, firstLoadDuration, load, done };
});