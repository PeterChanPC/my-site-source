<template>
  <header class="fixed flex row a-center j-between t-0 l-0 w-dvw h-50 font-16 z-100">
    <h1 class="absolute l-0 w-38 ml-16 mr-16 mt-auto mb-auto font-36 italic">Pc</h1>
    <nav class="flex row j-around w-400 ml-70 sm:none">
      <AHoverable path="home" effect="underline-m" :text="t('home')" />
      <AHoverable path="works" effect="underline-m" :text="t('work')" />
      <AHoverable path="blogs" effect="underline-m" :text="t('blog')" />
    </nav>

    <aside class="flex row a-center j-around w-116 pr-16 sm:none">
      <Switch :change="themeStore.changeTheme" :isActive="themeStore.isDark" :imgSrcL="ImgSrcL" :imgSrcR="ImgSrcR" />
      <Switch :change="langStore.changeLang" :isActive="langStore.isEnUS" textL="中" textR="Eng" />
    </aside>

    <button class="none relative w-50 h-50 bg-none border-none pointer sm:block sm:ml-auto" @click="toggleSidebar">
      <img :src="MenuImg" alt="menu" v-if="!toggled" />
      <img :src="CrossImg" alt="menu" v-if="toggled" />
    </button>
  </header>

  <GlobalSidebar :toggled="toggled" :toggleSidebar="toggleSidebar" />

  <div :class="['backdrop fixed t-0 l-0 w-dvw h-dvh o-0 z--0 tr-100', { 'sm:o-1 sm:z-98': toggled }]"
    @click="toggleSidebar()">
  </div>
</template>

<script lang="ts">
import GlobalSidebar from '@/layout/global-sidebar.vue';
import AHoverable from '@/components/a-hoverable.vue';
import Switch from '@/components/switch.vue';
import MenuImg from '@/assets/img/fi-rr-menu-burger.svg';
import CrossImg from '@/assets/img/fi-rr-cross-small.svg';
import ImgSrcL from '@/assets/img/fi-rr-sun.svg';
import ImgSrcR from '@/assets/img/fi-rr-moon-stars.svg';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { useI18n } from 'vue-i18n';
import { defineComponent, ref } from 'vue';

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
      return;
    };

    return { MenuImg, CrossImg, ImgSrcL, ImgSrcR, themeStore, langStore, t, toggled, toggleSidebar };
  },
});
</script>

<style scoped lang="scss"></style>