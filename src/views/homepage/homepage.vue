<template>
  <div :class="['home', `theme-${themeStore.theme}`]">
    <div class="intro">
      <h1>{{ t('helloCap') }}</h1>
      <h1>{{ t('selfIntro', { name: 'Peter Chan' }) }}</h1>
      <h3>This is my personal website...</h3>
      <h3>currently working on redesigning the web appearance,</h3>
      <h3>refactoring program structure,</h3>
      <h3>and start using TS + SCSS instead of orginally JS and CSS</h3>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme.store';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const themeStore = useThemeStore();
</script>

<style scoped lang="scss">
@forward './homepage.scss';
</style>