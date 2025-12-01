<template>
  <div v-if="loadingStore.isVisible && loadingStore.isFirstLoad"
    class="absolute flex flex-col j-end gap-5 w-full h-full pb-50 pl-10 bg-primary font-size-lg txt-nowrap z-97">
    <span v-if="showId >= 5">peterchanpc@my-site: ~$ npm run build</span>
    <br v-if="showId >= 10" />
    <span v-if="showId >= 15">> my-site@2.1.0 build</span>
    <span v-if="showId >= 20">> vite build</span>
    <br v-if="showId >= 50" />
    <span v-if="showId >= 55">PeterChanPC Personal Website 2025 (Vue 3, Typescript, SCSS, THREE.js)</span>
    <span v-if="showId >= 60">Initialize Building Sequence {{ dots }}</span>
    <br v-if="showId >= 100" />
    <span v-if="showId >= 110">Loading theme ...</span>
    <span v-if="showId >= 130">Theme: {{ themeStore.theme }}</span>
    <br v-if="showId >= 135" />
    <span v-if="showId >= 140">Initializing scenes ...</span>
    <span v-if="showId >= 150">Scene 'Homepage': {{ Math.min(Math.floor(percent1), 100) }}%</span>
    <span v-if="showId >= 155">Initializing Renderer ...</span>
    <span v-if="showId >= 165">Initializing Lights ...</span>
    <span v-if="showId >= 170">Initializing Objects ...</span>
    <span v-if="showId >= 180">Initializing Controls ...</span>
    <span v-if="showId >= 185">Initializing Player ...</span>
    <span v-if="showId >= 190">Scene 'Homepage' Ready</span>
    <br v-if="showId >= 200" />
    <span v-if="showId >= 205"> Scene 'Projects' : {{ Math.min(Math.floor(percent2), 100) }}%</span>
    <span v-if="showId >= 210">Initializing Renderer ...</span>
    <span v-if="showId >= 215">Initializing Lights ...</span>
    <span v-if="showId >= 220">Initializing Objects ...</span>
    <span v-if="showId >= 230">Initializing Controls ...</span>
    <span v-if="showId >= 235">Scene 'Projects' Ready</span>
    <br v-if="showId >= 245" />
    <span v-if="showId >= 105">[ {{ spaces }} ] {{ Math.min(Math.floor(percent3), 100) }}% | All scenes processed (2
      total)</span>
    <br v-if="showId >= 265" />
    <span v-if="showId >= 270">Assets: 665.50kB | gzip: 185.81kB</span>
    <span v-if="showId >= 280">Build succeeded!</span>
  </div>

  <div v-if="loadingStore.isLoading && !loadingStore.isFirstLoad"
    class="absolute flex flex-col j-end gap-5 w-full h-full pb-50 pl-10 font-size-lg txt-nowrap z-97">
    <span v-if="showId >= 1">Loading {{ to }} ...</span>
    <span v-if="showId >= 3">Loading Map ...</span>
    <span v-if="showId >= 5">Loading Objects ...</span>
    <span v-if="showId >= 7">Loading Player ...</span>
    <span v-if="showId >= 10">Starting Scene {{ dots }}</span>
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
    const showId = ref<number>(0);
    const dots = ref<string>('');
    const spaces = ref<string>('▒▒▒▒▒▒▒▒▒▒');
    const percent1 = ref<number>(0);
    const percent2 = ref<number>(0);
    const percent3 = ref<number>(0);

    function reset(): void {
      showId.value = 0;
      dots.value = '';
      spaces.value = '▒▒▒▒▒▒▒▒▒▒';
      percent1.value = 0;
      percent2.value = 0;
      percent3.value = 0;
    };

    function animateFirstLoad(): void {
      let interval = 0;
      for (let i = 0; i < 260; i++) {
        interval += 100;
        setTimeout(() => {
          showId.value += 1;
          if (showId.value >= 60 && showId.value <= 100 && showId.value % 5 === 0) { // dots starts at 60, ends at 100
            dots.value += '.';
            if (dots.value.length > 3) dots.value = '';
          } else if (showId.value >= 100) {
            dots.value = '...';
          };
          if (showId.value >= 105 && showId.value <= 255 && percent3.value < 100) { // percent 3 starts at 105, ends at 255
            percent3.value += 100 / (255 - 105);
            const spaceArray = spaces.value.split('');
            const spaceCount = Math.floor(percent3.value / 10) - 1;
            if (spaceCount >= 0 && spaceCount < spaces.value.length) spaceArray[spaceCount] = '█';
            spaces.value = spaceArray.join('');
          };
          if (showId.value >= 150 && showId.value <= 190 && percent1.value < 100) percent1.value += 100 / (190 - 150); // percent 1 starts at 150, ends at 190
          if (showId.value >= 205 && showId.value <= 235 && percent2.value < 100) percent2.value += 100 / (235 - 205); // percent 2 starts at 205, ends at 235
        }, interval);
      };
    };

    const to = ref<string>('');
    function animateLoad(): void {
      let interval = 0;
      switch (loadingStore.to) {
        case '/': to.value = "Scene 'Homepage'"; break;
        case '/works': to.value = "Scene 'Projects'"; break;
        case '/blogs': to.value = 'Blogs'; break;
      };
      for (let i = 0; i < 20; i++) {
        interval += 100;
        setTimeout(() => {
          showId.value += 1;
          if (showId.value >= 10 && showId.value <= 20 && showId.value % 5 === 0) {
            dots.value += '.';
            if (dots.value.length > 3) dots.value = '';
          } else if (showId.value >= 20) {
            dots.value = '...';
          };
        }, interval);
      };
    };

    watch(loadingStore, () => {
      if (loadingStore.isFirstLoad && loadingStore.isLoading) {
        reset();
        animateFirstLoad();
      } else if (loadingStore.isLoading) {
        reset();
        animateLoad();
      };
    });

    return { loadingStore, themeStore, dots, spaces, percent1, percent2, percent3, showId, to };
  },
});
</script>

<style lang="scss"></style>