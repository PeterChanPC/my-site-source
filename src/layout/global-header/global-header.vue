<template>
  <header class="global-header">
    <h1 class="icon">Pc</h1>
    <nav class="navbar">
      <AHoverable path="home" :text="t('home')" effect="underline-middle" />
      <AHoverable path="my practices" :text="t('work')" effect="underline-middle" />
      <AHoverable path="my practices" text="Blog" effect="underline-middle" />
    </nav>

    <aside class="functions">
      <Switch :change="themeStore.changeTheme" :isActive="themeStore.isDark" iconL="fi fi-rr-sun"
        iconR="fi fi-rr-moon" />
      <Switch :change="langStore.changeLang" :isActive="langStore.isEnUS" textL="中" textR="Eng" />
    </aside>
    
    <button class="toggle-sidebar" @click="toggleSidebar">
      <i class="fi fi-rr-menu-burger"></i>
    </button>
  </header>
</template>

<script lang="ts">
import AHoverable from '@/components/a-hoverable/a-hoverable.vue';
import Switch from '@/components/switch/switch.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { useI18n } from 'vue-i18n';
import { defineComponent, PropType, reactive, ref } from 'vue';

export default defineComponent({
  name: 'global-header',
  components: {
    AHoverable,
    Switch,
  },
  props: {
    toggleSidebar: {
      type: Function as PropType<() => void>,
      default: () => { },
    },
  },
  setup() {
    const themeStore = useThemeStore();
    const langStore = useLangStore();
    const { t } = useI18n();
    return { themeStore, langStore, t };
  },
});
</script>

<style scoped lang="scss">
@forward './global-header.scss';
</style>