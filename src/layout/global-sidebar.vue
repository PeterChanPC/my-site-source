<template>
  <aside :class="[
    'absolute r--200 flex col t-0 w-180 h-full pt-50 pr-10 pl-10 bg-glassy tr-100 z-99',
    { 'sm:r-0': toggled },
  ]">
    <AHoverable path="home" :imgSrc="HomeImg" :text="t('home')" shape="pill" />
    <AHoverable path="works" :imgSrc="ListImg" :text="t('work')" shape="pill" />
    <AHoverable path="blogs" :imgSrc="ListImg" :text="t('blog')" shape="pill" />

    <div class="relative flex row j-around nly w-160 h-50 pt-24 mt-32 mr-10 ml-10 before-line">
      <Switch :change="themeStore.changeTheme" :isActive="themeStore.isDark" :imgSrcL="ImgSrcL" :imgSrcR="ImgSrcR" />
      <Switch :change="langStore.changeLang" :isActive="langStore.isEnUS" textL="中" textR="Eng" />
    </div>
  </aside>
</template>

<script lang="ts">
import AHoverable from '@/components/a-hoverable.vue';
import Switch from '@/components/switch.vue';
import HomeImg from '@/assets/img/fi-rr-home.svg';
import ListImg from '@/assets/img/fi-rr-list.svg';
import ImgSrcL from '@/assets/img/fi-rr-sun.svg';
import ImgSrcR from '@/assets/img/fi-rr-moon-stars.svg';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'global-sidebar',
  components: {
    AHoverable,
    Switch,
  },
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
    toggleSidebar: {
      type: Function,
      default: () => { },
    },
  },
  setup() {
    const themeStore = useThemeStore();
    const langStore = useLangStore();
    const { t } = useI18n();
    return { HomeImg, ListImg, ImgSrcL, ImgSrcR, themeStore, langStore, t };
  },
});
</script>

<style scoped lang="scss"></style>