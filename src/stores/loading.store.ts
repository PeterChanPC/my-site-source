import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  const isFirstLoad = ref<boolean>(true);
  const isLoading = ref<boolean>(false);
  const duration = ref<number>(0);

  const load = (): void => { // called in route guard
    if (!isFirstLoad) duration.value = 1000;
    isLoading.value = true;
    console.log('store load')
  };

  const done = (): void => { // called in onMounted
    duration.value = 1000;
    isLoading.value = false;
    isFirstLoad.value = false;
    console.log('store done')
  };

  return { isFirstLoad, isLoading, duration, load, done };
});