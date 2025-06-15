<template>
  <header :class="['global-header', `theme-${themeStore.theme}`]">
    <h1 class="header-left">Pc</h1>

    <nav class="header-right">
      <router-link :to="{ name: 'home' }">
        <span>{{ t('home') }}</span>
      </router-link>
      <router-link :to="{ name: 'home' }">
        <span style="text-decoration: line-through;">{{ t('work') }}</span>
      </router-link>
      <a href="#" style="text-decoration: line-through;">
        <span>Blog</span>
      </a>

      <div class="functions">
        <Switch :change="themeStore.changeTheme" :isActive="themeStore.isDark" iconL="fi fi-rr-sun"
          iconR="fi fi-rr-moon" />
        <Switch :change="langStore.changeLang" :isActive="langStore.isEnUS" textL="中" textR="Eng" />
      </div>
    </nav>

    <button class="toggle-sidebar" @click="toggleSidebar">
      <i class="fi fi-rr-menu-burger"></i>
    </button>
  </header>
</template>

<script lang="ts">
import Switch from '@/components/switch/switch.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { useI18n } from 'vue-i18n';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'global-header',
  components: {
    Switch,
  },
  props: {
    toggleSidebar: {
      type: Function as PropType<(event: MouseEvent) => void>,
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