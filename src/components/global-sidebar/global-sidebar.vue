<template>
  <aside :class="[
      'global-sidebar',
      `theme-${themeStore.theme}`,
      {'active' : display},
    ]">
    <nav class="menu">
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
      <Switch @change="changeTheme" :isActive="isDark">
        <template #left>
          <i class="fi fi-rr-sun"></i>
        </template>
        <template #right>
          <i class="fi fi-rr-moon"></i>
        </template>
      </Switch>
      <Switch @change="changeLang" :isActive="isEnUS">
        <template #left>
          <span>中</span>
        </template>
        <template #right>
          <span>Eng</span>
        </template>
      </Switch>
    </div>
  </aside> 
</template>

<script lang="ts">
import Switch from '@/components/switch/switch.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'global-sidebar',
  props: {
    display: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const themeStore = useThemeStore();
    const langStore = useLangStore();

    const isDark = computed(() => {
      return themeStore.theme === 'dark';
    })
    const changeTheme = () => {
      themeStore.changeTheme();
    };

    const isEnUS = computed(() => {
      return langStore.locale === 'en-US';
    })
    const changeLang = () => {
      langStore.changeLang();
    };

    return {themeStore, isDark, changeTheme, isEnUS, changeLang };
  },
});
</script>

<style scoped lang="scss">
@forward './global-sidebar.scss';
</style>