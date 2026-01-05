<template>
  <Transition name="slide-from-top">
    <header v-if="!loadingStore.isLoading && !loadingStore.isFirstLoad"
      class="fixed flex row a-center j-between t-0 l-0 w-dvw h-50 font-size-16 z-100">
      <h1 class="absolute l-0 w-38 ml-16 mr-16 mt-auto mb-auto font-size-36 italic user-select-none">Pc</h1>
      <nav class="flex row j-around w-400 ml-70 sm:none">
        <AHoverable to="home" effect="underline-m" :text="t('home')" />
        <AHoverable to="works" effect="underline-m" :text="t('work')" />
        <AHoverable to="blogs" effect="underline-m" :text="t('blog')" />
      </nav>

      <aside class="flex row a-center j-around w-116 pr-16 sm:none">
        <SwitchBtn :onSwitch="themeStore.switchTheme" :isActive="themeStore.isDark" :imgSrcL="icons.sun"
          :imgSrcR="icons.moonStars" />
        <SwitchBtn :onSwitch="langStore.switchLang" :isActive="langStore.isEnUS" textL="中" textR="Eng" />
      </aside>

      <button class="none relative w-50 h-50 bg-none border-none pointer sm:block sm:ml-auto user-select-none"
        @click="toggleSidebar">
        <img :src="icons.menuBurger" alt="menu" v-if="!toggled" />
        <img :src="icons.crossSmall" alt="close" v-if="toggled" />
      </button>
    </header>
  </Transition>
  <GlobalSidebar :toggled="toggled" :closeSidebar="closeSidebar" />
</template>

<script lang="ts">
import GlobalSidebar from '@/layout/global-sidebar.vue';
import AHoverable from '@/components/a-hoverable.vue';
import SwitchBtn from '@/components/switch-btn.vue';
import * as icons from '@/assets/img/icons';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { useLoadingStore } from '@/stores/loading.store';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'global-header',
  components: {
    AHoverable,
    SwitchBtn,
    GlobalSidebar,
  },
  setup() {
    const themeStore = useThemeStore();
    const langStore = useLangStore();
    const loadingStore = useLoadingStore();
    const { t } = useI18n();

    const toggled = ref<boolean>(false);
    function toggleSidebar(): void {
      toggled.value = !toggled.value;
    };

    function closeSidebar(): void {
      toggled.value = false;
    };

    const closeSidebarOnBreakpt = (): void => {
      if (window.innerWidth > 640) toggled.value = false;
    };
    onMounted(() => window.addEventListener('resize', closeSidebarOnBreakpt));
    onUnmounted(() => window.removeEventListener('resize', closeSidebarOnBreakpt));

    return { icons, themeStore, langStore, loadingStore, t, toggled, toggleSidebar, closeSidebar };
  },
});
</script>

<style scoped lang="scss"></style>