<template>
  <div ref="recommendation" v-if="loadingStore.isVisible && loadingStore.isFirstLoad"
    class="absolute flex a-center j-center w-full h-full txt-wrap z-97">
    <h1>Computer Recommended</h1>
  </div>
  <div ref="first-load" v-if="loadingStore.isVisible && loadingStore.isFirstLoad"
    class="absolute l-0 b-0 flex flex-col flex-nowrap j-end gap-10 w--20 h-full mr-10 p-10 bg-primary font-size-lg txt-wrap z-96 fading-top">
    <span v-if="showId >= 25">npm run build</span>
    <br v-if="showId >= 30" />
    <span v-if="showId >= 35">> my-site@2.1.0 build</span>
    <br v-if="showId >= 50" />
    <span v-if="showId >= 55">PeterChanPC Personal Website 2025 (Vue 3, Typescript, SCSS, THREE.js)</span>
    <span v-if="showId >= 60">Initialize Building Sequence {{ dots }}</span>
    <br v-if="showId >= 100" />
    <span v-if="showId >= 110">Loading theme ...</span>
    <span v-if="showId >= 120">Theme: {{ themeStore.theme }}</span>
    <br v-if="showId >= 125" />
    <span v-if="showId >= 130">Initializing scenes ...</span>
    <span v-if="showId >= 140">Scene 'Homepage': {{ Math.min(Math.floor(percent1), 100) }}%</span>
    <span v-if="showId >= 145">Initializing Renderer ...</span>
    <span v-if="showId >= 150">Initializing Lights ...</span>
    <span v-if="showId >= 155">Initializing Wall 1 ...</span>
    <span v-if="showId >= 156">Initializing Wall 2 ...</span>
    <span v-if="showId >= 157">Initializing Wall 3 ...</span>
    <span v-if="showId >= 158">Initializing Wall 4 ...</span>
    <span v-if="showId >= 159">Initializing Floor ...</span>
    <span v-if="showId >= 160">Initializing Controls ...</span>
    <span v-if="showId >= 170">Initializing Player ...</span>
    <span v-if="showId >= 175">Scene 'Homepage' Ready</span>
    <br v-if="showId >= 180" />
    <span v-if="showId >= 185"> Scene 'Projects' : {{ Math.min(Math.floor(percent2), 100) }}%</span>
    <span v-if="showId >= 190">Initializing Renderer ...</span>
    <span v-if="showId >= 200">Initializing Lights ...</span>
    <span v-if="showId >= 205">Initializing Cubes ...</span>
    <span v-if="showId >= 220">Initializing Controls ...</span>
    <span v-if="showId >= 230">Scene 'Projects' Ready</span>
    <br v-if="showId >= 235" />
    <span v-if="showId >= 105">[ {{ spaces }} ] {{ Math.min(Math.floor(percent3), 100) }}% | All scenes processed (2
      total)</span>
    <br v-if="showId >= 245" />
    <span v-if="showId >= 250">Assets: 665.50kB | gzip: 185.81kB</span>
    <br v-if="showId >= 253" />
    <span v-if="showId >= 255">Build succeeded!</span>
    <span v-if="showId >= 260">Starting Scene</span>
    <span v-if="showId >= 15">{{ cursor }}&nbsp;</span>
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
import { defineComponent, ref, useTemplateRef, watch } from "vue";

export default defineComponent({
  name: 'loading',
  setup() {
    const loadingStore = useLoadingStore();
    const themeStore = useThemeStore();
    const showId = ref<number>(0);
    const dots = ref<string>('');
    const spaces = ref<string>('▒▒▒▒▒▒▒▒▒▒');
    const cursor = ref<string>('|')
    const percent1 = ref<number>(0);
    const percent2 = ref<number>(0);
    const percent3 = ref<number>(0);
    const recommendation = useTemplateRef<HTMLDivElement>('recommendation');
    const firstLoad = useTemplateRef<HTMLDivElement>('first-load');
    const keyframes: Keyframe[] = [
      { opacity: 1, offset: 0.7 },
      { opacity: 0 },
    ];

    function animate(ref: ReturnType<typeof useTemplateRef<HTMLDivElement>>, options: KeyframeAnimationOptions): void {
      if (!ref.value) return;
      ref.value.animate(keyframes, options);
    };

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
      for (let i = 0; i < 270; i++) {
        interval += 100;
        setTimeout(() => {
          showId.value += 1;

          // text cursor
          if (showId.value % 6 === 0) {
            cursor.value ? cursor.value = '' : cursor.value = '|';
          };

          // dots, starts at 80, ends at 120
          if (showId.value >= 60 && showId.value <= 100 && showId.value % 5 === 0) {
            dots.value += '.';
            if (dots.value.length > 3) dots.value = '';
          } else if (showId.value >= 100) {
            dots.value = '...';
          };

          // percent 3, starts at 105, ends at 240
          if (showId.value >= 105 && showId.value <= 240 && percent3.value < 100) {
            percent3.value += 100 / (240 - 105);
            const spaceArray = spaces.value.split('');
            const spaceCount = Math.floor(percent3.value / 10) - 1;
            if (spaceCount >= 0 && spaceCount < spaces.value.length) spaceArray[spaceCount] = '█';
            spaces.value = spaceArray.join('');
          };

          // percent 1, starts at 140, ends at 175
          if (showId.value >= 140 && showId.value <= 175 && percent1.value < 100) percent1.value += 100 / (175 - 140);

          // percent 2, starts at 185, ends at 230
          if (showId.value >= 185 && showId.value <= 230 && percent2.value < 100) percent2.value += 100 / (230 - 185);

          if (showId.value === 265) {
            requestAnimationFrame(() => animate(firstLoad, {
              duration: 2000,
              easing: 'ease-out',
              fill: 'forwards'
            }));
          };
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
        requestAnimationFrame(() => animate(recommendation, {
          duration: 2000,
          easing: 'ease-out',
          fill: 'forwards'
        }));
        reset();
        animateFirstLoad();
      } else if (loadingStore.isLoading) {
        reset();
        animateLoad();
      };
    });

    return { loadingStore, themeStore, dots, spaces, cursor, percent1, percent2, percent3, showId, to };
  },
});
</script>

<style lang="scss"></style>