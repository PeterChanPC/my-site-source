<template>
  <div :class="['sidebar-bg', 
      {'active-bg' : toggled}]"
      @click="toggleSidebar">
  </div>

  <aside :class="[
      'global-sidebar',
      `theme-${themeStore.theme}`,
      {'active' : toggled},
    ]">
    <div class="sidebar-up">
      <button class="toggle-sidebar" @click="toggleSidebar">
        <i class="fi fi-rr-menu-burger"></i>
      </button>

      <nav class="menu">
        <router-link :to="{name: 'home'}">
          <i class="fi fi-rr-home"></i>
          <span>{{ t('home') }}</span>
        </router-link>
        <router-link :to="{name: 'my practices'}">
          <i class="fi fi-rr-list"></i>
          <span>{{ t('work') }}</span>
        </router-link>
        <a href="#">
          <i class="fi fi-rr-home"></i>
          <span>Blog</span>
        </a>
      </nav>
    </div>

    <div class="functions">
      <Switch :change="themeStore.changeTheme" :isActive="themeStore.isDark" iconL="fi fi-rr-sun" iconR="fi fi-rr-moon"/>
      <Switch :change="langStore.changeLang" :isActive="langStore.isEnUS" textL="中" textR="Eng"/>
    </div>
  </aside> 
</template>

<script lang="ts">
import Switch from '@/components/switch/switch.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { type Ref, ref, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'global-sidebar',
  components: {
    Switch,
  },
  setup() {
    const themeStore = useThemeStore();
    const langStore = useLangStore();
    const { t } = useI18n();
    
    const toggled: Ref<boolean> = ref(false);
    const toggleSidebar = (event: MouseEvent): void => {
      toggled.value = !toggled.value;
      return;
    };

    return { themeStore, langStore, t, toggled, toggleSidebar };
  },
});
</script>

<style scoped lang="scss">
@forward './global-sidebar.scss';
</style>