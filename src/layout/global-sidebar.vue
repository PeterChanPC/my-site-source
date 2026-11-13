<template>
  <Transition name="slide-from-right">
    <aside v-if="toggled && !loadingStore.isLoading"
      class="fixed r-0 flex flex-col w-180 h-full pt-50 pr-10 pl-10 bg-glassy z-99">
      <AHoverable to="home" :img="icons.home" :text="t('home')" shape="pill" />
      <AHoverable to="works" :img="icons.list" :text="t('work')" shape="pill" />
      <AHoverable to="blogs" :img="icons.list" :text="t('blog')" shape="pill" />
      <div class="relative flex row j-around w-160 h-50 pt-24 mt-32 mr-10 ml-10 top-line">
        <SwitchBtn @switch="themeStore.switchTheme" :is-active="themeStore.isDark" :img-left="icons.sun"
          :img-right="icons.moonStars" />
        <SwitchBtn @switch="langStore.switchLang" :is-active="langStore.isEnUS" text-left="中" text-right="Eng" />
      </div>
    </aside>
  </Transition>
  <Transition name="fade">
    <div v-if="toggled && !loadingStore.isLoading" class="bg-dark fixed w-dvw h-dvh z-98" @click="toggleOff"></div>
  </Transition>
</template>

<script setup lang="ts">
import AHoverable from '@/components/a-hoverable.vue';
import SwitchBtn from '@/components/switch-btn.vue';
import * as icons from '@/assets/img/d';
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { useLoadingStore } from '@/stores/loading.store';

const themeStore = useThemeStore()
const langStore = useLangStore()
const loadingStore = useLoadingStore()
const { t } = useI18n()

const toggled = ref<boolean>(false)

function toggle(): void {
  toggled.value = !toggled.value
}
function toggleOff(): void {
  if (toggled.value && !loadingStore.isLoading)
    toggled.value = false
}

const toggleOffOnBreakpt = (): void => {
  if (window.innerWidth > 640) toggled.value = false
};

onMounted(() => window.addEventListener('resize', toggleOffOnBreakpt));
onUnmounted(() => window.removeEventListener('resize', toggleOffOnBreakpt));

defineExpose({ toggled, toggle, toggleOff })
</script>

<style scoped lang="scss"></style>