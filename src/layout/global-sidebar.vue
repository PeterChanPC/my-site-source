<template>
  <aside :class="[
    'absolute r--200 flex flex-col t-0 w-180 h-full pt-50 pr-10 pl-10 bg-glassy tr-100 z-99',
    { 'sm:r-0': toggled },
  ]">
    <AHoverable to="home" :imgSrc="icons.home" :text="t('home')" shape="pill" />
    <AHoverable to="works" :imgSrc="icons.list" :text="t('work')" shape="pill" />
    <AHoverable to="blogs" :imgSrc="icons.list" :text="t('blog')" shape="pill" />

    <div class="relative flex row j-around nly w-160 h-50 pt-24 mt-32 mr-10 ml-10 top-line">
      <SwitchBtn :onSwitch="themeStore.switchTheme" :isActive="themeStore.isDark" :imgSrcL="icons.sun"
        :imgSrcR="icons.moonStars" />
      <SwitchBtn :onSwitch="langStore.switchLang" :isActive="langStore.isEnUS" textL="中" textR="Eng" />
    </div>
  </aside>
  <!-- background -->
  <div :class="['bg-dark fixed t-0 l-0 w-dvw h-dvh o-0 z--0 tr-100', { 'sm:o-1 sm:z-98': toggled }]"
    @click="toggleSidebar()">
  </div>
</template>

<script lang="ts">
import AHoverable from '@/components/a-hoverable.vue';
import SwitchBtn from '@/components/switch-btn.vue';
import * as icons from '@/assets/img/icons';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'global-sidebar',
  components: {
    AHoverable,
    SwitchBtn,
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
    return { icons, themeStore, langStore, t };
  },
});
</script>

<style scoped lang="scss"></style>