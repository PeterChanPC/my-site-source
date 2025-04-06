<template>
  <div :class="['home', `theme-${themeStore.theme}`]">
    <div class="intro">
      <div class="intro-text">
        <div class="intro-up">
          <h1>{{ t('helloCap') }}</h1>
          <h1>{{ t('selfIntro', { name: 'PeterChan' }) }}</h1>
        </div>
        <div class="intro-down">
          <h4>This is my personal website...</h4>
          <h5>for portfolio...</h5>
          <h5>for learning...</h5>
          <h5>for sharing...</h5>
        </div>
      </div>

      <div class="intro-details">
        <span>Still working on the design</span>
      </div>
    </div>
    
    <div class="navbar">
      nav
    </div>

    <div class="about-me">
      about
    </div>

    <div class="project">
      project
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