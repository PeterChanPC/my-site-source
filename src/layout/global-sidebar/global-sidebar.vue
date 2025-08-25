<template>
  <aside :class="[
    'global-sidebar',
    { 'active': toggled },
  ]">
    <AHoverable path="home">
      <template #path>
        <img src="@/assets/img/fi-rr-home.svg" alt="home">
        <span>{{ t('home') }}</span>
      </template>
    </AHoverable>
    <AHoverable path="my practices">
      <template #path>
        <img src="@/assets/img/fi-rr-list.svg" alt="work">
        <span>{{ t('work') }}</span>
      </template>
    </AHoverable>
    <AHoverable path="my practices">
      <template #path>
        <img src="@/assets/img/fi-rr-list.svg" alt="blog">
        <span>blog</span>
      </template>
    </AHoverable>

    <div class="functions">
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
    </div>
  </aside>
</template>

<script lang="ts">
import AHoverable from '@/components/a-hoverable/a-hoverable.vue';
import Switch from '@/components/switch/switch.vue';
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
    return { themeStore, langStore, t };
  },
});
</script>

<style scoped lang="scss">
@forward './global-sidebar.scss';
</style>