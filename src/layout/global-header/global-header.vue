<template>
  <header class="global-header">
    <h1 class="icon">Pc</h1>
    <nav class="navbar">
      <AHoverable path="home" effect="underline-middle">
        <template #path>
          <span>{{ t('home') }}</span>
        </template>
      </AHoverable>
      <AHoverable path="my practices" effect="underline-middle">
        <template #path>
          <span>{{ t('work') }}</span>
        </template>
      </AHoverable>
      <AHoverable path="my practices" effect="underline-middle">
        <template #path>
          <span>Blog</span>
        </template>
      </AHoverable>
    </nav>

    <aside class="functions">
      <Switch :change="themeStore.changeTheme" :isActive="themeStore.isDark">
        <template #optionL>
          <img src="@/assets/img/fi-rr-sun.svg" alt="light">
        </template>
        <template #optionR>
          <img src="@/assets/img/fi-rr-moon-stars.svg" alt="dark">
        </template>
      </Switch>
      <Switch :change="langStore.changeLang" :isActive="langStore.isEnUS">
        <template #optionL>
          <span>中</span>
        </template>
        <template #optionR>
          <span>Eng</span>
        </template>
      </Switch>
    </aside>

    <button class="toggle-sidebar" @click="toggleSidebar">
      <img src="@/assets/img/fi-rr-menu-burger.svg" alt="menu" v-if="!toggled" />
      <img src="@/assets/img/fi-rr-cross-small.svg" alt="menu" v-if="toggled" />
    </button>
  </header>

  <GlobalSidebar :toggled="toggled" :toggleSidebar="toggleSidebar" />

  <div :class="['sidebar-bg',
    { 'active-bg': toggled }]" @click="toggleSidebar()">
  </div>
</template>

<script lang="ts">
import GlobalSidebar from '@/layout/global-sidebar/global-sidebar.vue';
import AHoverable from '@/components/a-hoverable/a-hoverable.vue';
import Switch from '@/components/switch/switch.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { useI18n } from 'vue-i18n';
import { defineComponent, Ref, ref } from 'vue';

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

    const toggled: Ref<boolean> = ref(false);
    const toggleSidebar = (): void => {
      toggled.value = !toggled.value;
      return;
    };

    return { themeStore, langStore, t, toggled, toggleSidebar };
  },
});
</script>

<style scoped lang="scss">
@forward './global-header.scss';
</style>