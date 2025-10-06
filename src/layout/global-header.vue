<template>
  <header class="fixed flex row a-center j-between t-0 l-0 w-dvw h-50 font-size-16 z-100">
    <h1 class="absolute l-0 w-38 ml-16 mr-16 mt-auto mb-auto font-size-36 italic user-select-none">Pc</h1>
    <nav class="flex row j-around w-400 ml-70 sm:none">
      <AHoverable to="home" effect="underline-m" :text="t('home')" />
      <AHoverable to="works" effect="underline-m" :text="t('work')" />
      <AHoverable to="blogs" effect="underline-m" :text="t('blog')" />
    </nav>

    <aside class="flex row a-center j-around w-116 pr-16 sm:none">
      <Switch :change="themeStore.changeTheme" :isActive="themeStore.isDark" :imgSrcL="icons.sun"
        :imgSrcR="icons.moonStars" />
      <Switch :change="langStore.changeLang" :isActive="langStore.isEnUS" textL="中" textR="Eng" />
    </aside>

    <button class="none relative w-50 h-50 bg-none border-none pointer sm:block sm:ml-auto" @click="toggleSidebar">
      <img :src="icons.menuBurger" alt="menu" v-if="!toggled" />
      <img :src="icons.crossSmall" alt="close" v-if="toggled" />
    </button>
  </header>

  <GlobalSidebar :toggled="toggled" :toggleSidebar="toggleSidebar" />
</template>

<script lang="ts">
import GlobalSidebar from '@/layout/global-sidebar.vue';
import AHoverable from '@/components/a-hoverable.vue';
import Switch from '@/components/switch.vue';
import * as icons from '@/assets/img/icons';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { useI18n } from 'vue-i18n';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'global-header',
  components: {
    AHoverable,
    Switch,
    GlobalSidebar,
  },
  setup() {
    const themeStore = useThemeStore();
    const langStore = useLangStore();
    const { t } = useI18n();

    const toggled = ref<boolean>(false);
    const toggleSidebar = (): void => {
      toggled.value = !toggled.value;
    };

    const closeSidebarOnBreakpt = (): void => {
      if (window.innerWidth > 640) toggled.value = false;
    };
    onMounted(() => window.addEventListener('resize', closeSidebarOnBreakpt));
    onUnmounted(() => window.removeEventListener('resize', closeSidebarOnBreakpt));

    return { icons, themeStore, langStore, t, toggled, toggleSidebar };
  },
});
</script>

<style scoped lang="scss"></style>