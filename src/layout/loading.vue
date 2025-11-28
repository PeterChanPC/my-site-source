<template>
  <div v-if="loadingStore.isVisible"
    :class="[{ 'bg-primary': loadingStore.isFirstLoad }, 'absolute flex flex-col j-end gap-5 w-full h-full pb-50 pl-10 txt-nowrap z-97']">
    <span v-if="showId >= 3">peterchanpc@my-site: ~$ npm run build</span>
    <br v-if="showId >= 5" />
    <span v-if="showId >= 7">> my-site@2.1.0 build</span>
    <span v-if="showId >= 9">> vite build</span>
    <br v-if="showId >= 10" />
    <span v-if="showId >= 12">PeterChanPC Personal Website 2025 (Vue 3, Typescript, SCSS, THREE.js)</span>
    <span v-if="showId >= 13">Initialize Building Sequence {{ dots }}</span>
    <br v-if="showId >= 15" />
    <span v-if="showId >= 18">Loading theme ...</span>
    <span v-if="showId >= 19">Theme: {{ themeStore.theme }}</span>
    <br v-if="showId >= 20" />
    <span v-if="showId >= 22">Loading scenes ...</span>
    <span v-if="showId >= 25">Scene 'Homepage': {{ percent1 }}%</span>
    <span v-if="showId >= 27">Loading Renderer ...</span>
    <span v-if="showId >= 31">Loading Lights ...</span>
    <span v-if="showId >= 33">Loading Objects ...</span>
    <span v-if="showId >= 35">Loading Controls ...</span>
    <span v-if="showId >= 38">Loading Player ...</span>
    <span v-if="showId >= 40">Scene 'Homepage' Ready</span>
    <br v-if="showId >= 43" />
    <span v-if="showId >= 45"> Scene 'Projects' : {{ percent2 }}%</span>
    <span v-if="showId >= 49">Loading Renderer ...</span>
    <span v-if="showId >= 54">Loading Lights ...</span>
    <span v-if="showId >= 57">Loading Objects ...</span>
    <span v-if="showId >= 62">Loading Controls ...</span>
    <span v-if="showId >= 65">Scene 'Projects' Ready</span>
    <br v-if="showId >= 10" />
    <span v-if="showId >= 11">[██████████] {{ percent3 }}% | All scenes processed (2 total)</span>
    <br v-if="showId >= 70" />
    <span v-if="showId >= 70">Assets: 665.50kB | gzip: 185.81kB</span>
    <span v-if="showId >= 75">Build succeeded!</span>
  </div>
</template>

<script lang="ts">
import { useLoadingStore } from "@/stores/loading.store";
import { useThemeStore } from "@/stores/theme.store";
import { defineComponent, Ref, ref, watch } from "vue";

export default defineComponent({
  name: 'loading',
  setup() {
    const loadingStore = useLoadingStore();
    const themeStore = useThemeStore();
    const showId = ref<number>(0);
    const dots = ref<string>('');
    const spaces = ref<string>('');
    const percent1 = ref<number>(0);
    const percent2 = ref<number>(0);
    const percent3 = ref<number>(0);

    function startDotsAnimation(): void {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          dots.value += '.';
          if (dots.value.length >= 3) {
            dots.value = '';
          };
        }, 100);
      };
      dots.value = '...';
    };

    function startSpacesAnimation(): void {
      for (let i = 0; i < 60; i++) {
        setTimeout(() => {
          spaces.value += '█';
        }, 100);
      };
      spaces.value = '██████████';
    };

    function startPercentAnimation(percent: Ref<number>, interval: number): void {
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          percent.value += 1;
        }, interval / 100);
      };
    };

    function reset(): void {
      showId.value = 0;
      percent1.value = 0;
      percent2.value = 0;
      percent3.value = 0;
    };

    function animate(): void {
      let interval = 0;
      for (let i = 0; i < 80; i++) {
        interval += 100;
        setTimeout(() => {
          showId.value += 1;
          switch (i) {
            case 5: startDotsAnimation();
            case 11: startPercentAnimation(percent3, 6000); startSpacesAnimation();
            case 25: startPercentAnimation(percent1, 2600);
            case 45: startPercentAnimation(percent2, 2600);
          };
        }, interval);
      };
    };

    watch(loadingStore, () => {
      if (loadingStore.isFirstLoad) {
        reset();
        animate();
      } else {

      };
    });

    return { loadingStore, themeStore, dots, percent1, percent2, percent3, showId };
  },
});
</script>

<style lang="scss"></style>