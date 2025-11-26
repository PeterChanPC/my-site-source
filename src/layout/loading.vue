<template>
  <div v-if="loadingStore.isLoading"
    :class="'absolute flex flex-col j-end gap-5 w-full h-full pb-50 pl-10 txt-nowrap bg-primary z-97'">
    <span v-if="showId >= 1">peterchanpc@my-site: ~$ npm run build</span>
    <br />
    <span v-if="showId >= 2">> my-site@2.1.0 build</span>
    <span v-if="showId >= 3">> vite build</span>
    <br v-if="showId >= 4" />
    <br v-if="showId >= 5" />
    <span v-if="showId >= 6">PeterChanPC Personal Website 2025 (Vue 3, Typescript, SCSS, THREE.js)</span>
    <span v-if="showId >= 7">Loading project: /my-site/three</span>
    <span v-if="showId >= 8">Loading theme ...</span>
    <span v-if="showId >= 9">Theme: {{ themeStore.theme }}</span>
    <br v-if="showId >= 10" />
    <span v-if="showId >= 11">Loading scenes ...</span>
    <span v-if="showId >= 12">Scene 'Homepage': {{ percent1 }}%</span>
    <span v-if="showId >= 13"></span>
    <br v-if="showId >= 14" />
    <span v-if="showId >= 15"> Scene 'Projects' : {{ percent2 }}%</span>
    <span v-if="showId >= 16"></span>
    <br v-if="showId >= 17" />
    <span v-if="showId >= 18">[██████████] {{ percent3 }}% | All scenes processed (2 total)</span>
    <br v-if="showId >= 19" />
    <span v-if="showId >= 20">Assets: 665.50kB | gzip: 185.81kB</span>
    <span v-if="showId >= 21">Build succeeded!</span>
  </div>
</template>

<script lang="ts">
import { useLoadingStore } from "@/stores/loading.store";
import { useThemeStore } from "@/stores/theme.store";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: 'loading',
  setup() {
    const loadingStore = useLoadingStore();
    const themeStore = useThemeStore();
    const initInterval = 50;
    const loadInterval = 100;
    const showId = ref<number>(0);
    const percent1 = ref<number>(0);
    const percent2 = ref<number>(0);
    const percent3 = ref<number>(0);

    function reset(): void {
      showId.value = 0;
      percent1.value = 0;
      percent2.value = 0;
      percent3.value = 0;
    };

    function init(): void {
      showId.value += 1;
      console.log(showId.value)
      setTimeout(() => {
        if (showId.value >= 11) {
          load();
          return;
        } else {
          init();
        };
      }, initInterval);
      return;
    };

    function load(): void {
      showId.value += 1;
      console.log(showId.value)
      setTimeout(() => {
        switch (showId.value) {
          case 12:
            increment(percent1.value);
            break;
          case 15:
            increment(percent2.value);
            break;
          case 18:
            increment(percent3.value);
            break;
          case 21:
            return;
          default:
            load();
            break;
        };
      }, loadInterval);
      return;
    };

    function increment(value: number): void {
      setTimeout(() => {
        value += 1;
        if (value < 100) increment(value);
        return;
      }, 1)
    };

    watch(loadingStore, () => {
      if (loadingStore.isLoading) {
        reset();
        init();
      };
    });

    return { loadingStore, themeStore, percent1, percent2, percent3, showId };
  },
});
</script>

<style lang="scss"></style>