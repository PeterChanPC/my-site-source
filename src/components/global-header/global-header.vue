<template>
  <header
    :class="[
      'global-header',
      `theme-${themeStore.theme}`,
    ]">

    <h1>Pc</h1>

    <nav class="header-mid">
      <router-link :to="{name: 'home'}">
        <span>HOME</span>
      </router-link>
      <router-link :to="{name: 'my practices'}">
        <span>PROJECT</span>
      </router-link>
      <a href="#">XXX</a>
      <a href="#">XXX</a>
    </nav>

    <div class="functions">
      <Switch @change="themeStore.changeTheme()" :isActive="themeStore.isDark">
        <template #left>
          <i class="fi fi-rr-sun"></i>
        </template>
        <template #right>
          <i class="fi fi-rr-moon"></i>
        </template>
      </Switch>
      <Switch @change="langStore.changeLang()" :isActive="langStore.isEnUS">
        <template #left>
          <span>中</span>
        </template>
        <template #right>
          <span>Eng</span>
        </template>
      </Switch>
    </div>

    <button class="toggle-sidebar" @click="toggleSidebar">
      <i class="fi fi-rr-menu-burger"></i>
    </button>
  </header>
</template>

<script lang="ts">
import Switch from '@/components/switch/switch.vue';
import Sidebar from '@/components/global-sidebar/global-sidebar.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'global-header',
  components: {
    Switch,
    Sidebar,
  },
  emits: [
    'toggleSidebar',
  ],
  setup(_, { emit }) {
    const themeStore = useThemeStore();
    const langStore = useLangStore();

    const toggleSidebar = () => {
      emit('toggleSidebar');
    };

    return {themeStore, langStore, toggleSidebar };
  },
});
</script>

<style scoped lang="scss">
@forward './global-header.scss';
</style>