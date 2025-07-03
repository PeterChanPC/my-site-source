<template>
  <div :class="['sidebar-bg',
    { 'active-bg': toggled }]" @click="toggleSidebar">
  </div>

  <aside :class="[
    'global-sidebar',
    `theme-${themeStore.theme}`,
    { 'active': toggled },
  ]">
    <AHoverable path="home" icon="fi fi-rr-home" :text="t('home')" />
    <AHoverable path="my practices" icon="fi fi-rr-list" :text="t('work')" />
    <AHoverable path="my practices" icon="fi fi-rr-list" text="blog" />

    <div class="functions">
      <Switch :change="themeStore.changeTheme" :isActive="themeStore.isDark" iconL="fi fi-rr-sun"
        iconR="fi fi-rr-moon" />
      <Switch :change="langStore.changeLang" :isActive="langStore.isEnUS" textL="中" textR="Eng" />
    </div>
  </aside>
</template>

<script lang="ts">
import AHoverable from '@/components/a-hoverable/a-hoverable.vue';
import Switch from '@/components/switch/switch.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { type Ref, ref, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'global-sidebar',
  components: {
    AHoverable,
    Switch,
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
@forward './global-sidebar.scss';
</style>