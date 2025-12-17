<template>
  <div ref="loading" class="fixed flex flex-col a-center j-center w--100 h--100 p-50 bg-primary o-1 font-size-xl"
    :style="`z-index: ${zIndex};`">
    <AnimatedTxt class="flex font-size-xl sm:font-size-md" v-if="loadingStore.is1stLoad" :text="t('computer')"
      :duration="800" :stagger="20" :delay="loadingStore.normalDuration" animation="fadeOut" />

    <div v-if="!loadingStore.is1stLoad"
      class="absolute flex flex-col a-center j-center w-full h-full bg-primary z-1 glooey mix">
      <div ref="ball1" class="absolute w-70 h-70 border-round bg-primary glooey-invert"></div>
      <div ref="ball2" class="absolute w-25 h-25 border-round bg-primary glooey"></div>
      <div ref="shadow" class="absolute w-70 h-10 border-round bg-primary glooey-invert"></div>
    </div>
  </div>
</template>

<script lang="ts">
import AnimatedTxt from "@/components/animated-txt.vue";
import { useLoadingStore } from "@/stores/loading.store";
import { defineComponent, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'loading',
  components: {
    AnimatedTxt,
  },
  setup() {
    const { t } = useI18n();
    const zIndex = ref(97);
    const loadingStore = useLoadingStore();
    const loading = useTemplateRef<HTMLDivElement>('loading');
    const ball1 = useTemplateRef<HTMLDivElement>('ball1');
    const ball2 = useTemplateRef<HTMLDivElement>('ball2');
    const shadow = useTemplateRef<HTMLDivElement>('shadow');

    const fadeIn: Keyframe[] = [
      { opacity: 0 },
      { opacity: 1 }
    ];
    const keyframesBall1: Keyframe[] = [
      { transform: 'translateY(0px) scaleX(1) scaleY(1)', offset: 0 },
      { transform: 'translateY(5px) scaleX(1) scaleY(1.04)', offset: 0.05 },
      { transform: 'translateY(12px) scaleX(1) scaleY(1.06)', offset: 0.10 },
      { transform: 'translateY(22px) scaleX(1) scaleY(1.08)', offset: 0.15 },
      { transform: 'translateY(35px) scaleX(1) scaleY(1.11)', offset: 0.20 },
      { transform: 'translateY(50px) scaleX(1) scaleY(1.14)', offset: 0.25 },
      { transform: 'translateY(68px) scaleX(1) scaleY(1.17)', offset: 0.30 },
      { transform: 'translateY(90px) scaleX(1) scaleY(1.20)', offset: 0.35 },
      { transform: 'translateY(105px) scaleX(1) scaleY(1.18)', offset: 0.40 },
      { transform: 'translateY(118px) scaleX(1) scaleY(1.15)', offset: 0.45 },
      { transform: 'translateY(120px) scaleX(1.30) scaleY(0.65)', offset: 0.48 },
      { transform: 'translateY(120px) scaleX(1.40) scaleY(0.60)', offset: 0.485 },
      { transform: 'translateY(120px) scaleX(1.35) scaleY(0.62)', offset: 0.49 },
      { transform: 'translateY(115px) scaleX(1.32) scaleY(0.64)', offset: 0.50 },
      { transform: 'translateY(100px) scaleX(1.25) scaleY(0.70)', offset: 0.52 },
      { transform: 'translateY(85px) scaleX(1.20) scaleY(0.76)', offset: 0.55 },
      { transform: 'translateY(70px) scaleX(1.15) scaleY(0.82)', offset: 0.58 },
      { transform: 'translateY(55px) scaleX(1.10) scaleY(0.88)', offset: 0.62 },
      { transform: 'translateY(40px) scaleX(1.05) scaleY(0.94)', offset: 0.66 },
      { transform: 'translateY(28px) scaleX(1.02) scaleY(0.98)', offset: 0.70 },
      { transform: 'translateY(18px) scaleX(1) scaleY(1)', offset: 0.75 },
      { transform: 'translateY(12px) scaleX(1) scaleY(1.04)', offset: 0.80 },
      { transform: 'translateY(8px) scaleX(1) scaleY(1.08)', offset: 0.86 },
      { transform: 'translateY(5px) scaleX(1) scaleY(1.04)', offset: 0.92 },
      { transform: 'translateY(3px) scaleX(1) scaleY(1.02)', offset: 0.96 },
      { transform: 'translateY(1px) scaleX(1) scaleY(1)', offset: 0.99 },
      { transform: 'translateY(0px) scaleX(1) scaleY(1)', offset: 1 }
    ];
    const keyframesBall2: Keyframe[] = [
      { transform: 'translateY(0.0px) scaleX(1) scaleY(1)', offset: 0 },
      { transform: 'translateY(6.9px) scaleX(1) scaleY(1.04)', offset: 0.05 },
      { transform: 'translateY(16.5px) scaleX(1) scaleY(1.06)', offset: 0.10 },
      { transform: 'translateY(30.2px) scaleX(1) scaleY(1.08)', offset: 0.15 },
      { transform: 'translateY(48.1px) scaleX(1) scaleY(1.11)', offset: 0.20 },
      { transform: 'translateY(68.8px) scaleX(1) scaleY(1.14)', offset: 0.25 },
      { transform: 'translateY(93.5px) scaleX(1) scaleY(1.17)', offset: 0.30 },
      { transform: 'translateY(123.8px) scaleX(1) scaleY(1.20)', offset: 0.35 },
      { transform: 'translateY(144.4px) scaleX(1) scaleY(1.18)', offset: 0.40 },
      { transform: 'translateY(162.2px) scaleX(1) scaleY(1.15)', offset: 0.45 },
      { transform: 'translateY(165.0px) scaleX(1.30) scaleY(0.65)', offset: 0.48 },
      { transform: 'translateY(165.0px) scaleX(1.40) scaleY(0.60)', offset: 0.485 },
      { transform: 'translateY(165.0px) scaleX(1.35) scaleY(0.62)', offset: 0.49 },
      { transform: 'translateY(158.1px) scaleX(1.32) scaleY(0.64)', offset: 0.50 },
      { transform: 'translateY(137.5px) scaleX(1.25) scaleY(0.70)', offset: 0.52 },
      { transform: 'translateY(116.9px) scaleX(1.20) scaleY(0.76)', offset: 0.55 },
      { transform: 'translateY(96.2px) scaleX(1.15) scaleY(0.82)', offset: 0.58 },
      { transform: 'translateY(75.6px) scaleX(1.10) scaleY(0.88)', offset: 0.62 },
      { transform: 'translateY(55.0px) scaleX(1.05) scaleY(0.94)', offset: 0.66 },
      { transform: 'translateY(38.5px) scaleX(1.02) scaleY(0.98)', offset: 0.70 },
      { transform: 'translateY(24.8px) scaleX(1) scaleY(1)', offset: 0.75 },
      { transform: 'translateY(16.5px) scaleX(1) scaleY(1.04)', offset: 0.80 },
      { transform: 'translateY(11.0px) scaleX(1) scaleY(1.08)', offset: 0.86 },
      { transform: 'translateY(6.9px) scaleX(1) scaleY(1.04)', offset: 0.92 },
      { transform: 'translateY(4.1px) scaleX(1) scaleY(1.02)', offset: 0.96 },
      { transform: 'translateY(1.4px) scaleX(1) scaleY(1)', offset: 0.99 },
      { transform: 'translateY(0.0px) scaleX(1) scaleY(1)', offset: 1 }
    ];
    const keyframesShadow: Keyframe[] = [
      { transform: 'scaleX(1) translateY(140px)', offset: 0 },
      { transform: 'scaleX(1.2) translateY(140px)', offset: 0.48 },
      { transform: 'scaleX(1.2) translateY(140px)', offset: 0.49 },
      { transform: 'scaleX(1) translateY(140px)' },
    ];
    const ballOptions: KeyframeAnimationOptions = {
      duration: 1000,
      easing: 'linear',
      iterations: 1,
      fill: 'both'
    };

    function start1stLoad(): void {
      loading.value?.animate(fadeIn, { // fade out for 1st launch
        direction: 'reverse',
        delay: 1000,
        duration: 1000,
        fill: 'forwards'
      });
      setTimeout(() => zIndex.value = -100, 3000); // hide loading
    };

    function startLoad(): void {
      loading.value?.animate(fadeIn, {
        duration: 500,
        fill: 'forwards'
      });
      ball1.value?.animate(keyframesBall1, ballOptions);
      ball2.value?.animate(keyframesBall2, ballOptions);
      shadow.value?.animate(keyframesShadow, ballOptions);
      loadStarted = true; // enable endLoad
    };

    function endLoad(): void {
      if (!loadStarted) return;
      loading.value?.animate(fadeIn, {
        direction: 'reverse',
        duration: 500,
        fill: 'forwards'
      });
      setTimeout(() => zIndex.value = -100, 500); // hide loading
      loadStarted = false;
    };

    let loadStarted = false; // for removing ball fade out animation on 1st launch
    function animate(): void {
      if (!loading.value) return;
      zIndex.value = 97;
      // loadingStore states during launch:
      // is1stLoad = true, isLoading = true, dom is not fully rendered yet
      // is1stLoad = true, isLoading = true, homepage dom is rendered
      // is1stLoad = true, isLoading = false, start1stLoad
      // is1stLoad = false, isLoading = false, hide loading
      // loadingStore states during nav:
      // is1stLoad = false, isLoading = true, startLoad
      // is1stLoad = false, isLoading = false, endLoad + hide loading
      if (loadingStore.is1stLoad && !loadingStore.isLoading) { start1stLoad(); return; };
      if (loadingStore.isLoading && !loadingStore.is1stLoad) { startLoad(); return; };
      endLoad();
    };

    watch(loadingStore, () => requestAnimationFrame(animate));

    return { loadingStore, t, zIndex };
  },
});
</script>

<style lang="scss"></style>
