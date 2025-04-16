<template>
  <div :class="['home', `theme-${themeStore.theme}`]">
    <div class="intro">
      <span class="text-up">{{ t('hello') }}</span>
      <div class="text-down">
        <div class="name-1">
          <span>p</span>
          <span>e</span>
          <span>t</span>
          <span>e</span>
          <span>r</span>
        </div>
        <div class="name-2">
          <span>c</span>
          <span>h</span>
          <span>a</span>
          <span>n</span>
        </div>
      </div>

      <div class="scroll-btn-container">
        <ScrollBtn text="About" :theme="themeStore.theme" :to="about"/>|
        <ScrollBtn text="Contact" :theme="themeStore.theme" :to="contact"/>
      </div>

      <div class="scroll-down">
        <ScrollBtn icon="fi fi-rr-angle-down" text="Scroll Down" :theme="themeStore.theme" shape="round" :to="about"/>
      </div>
    </div>

    <div ref="about" class="about">
      about
    </div>

    <div class="project">
      project
    </div>

    <div ref="contact" class="contact">
      contact
    </div>
  </div>
</template>

<script setup lang="ts">
import AExpandable from '@/components/a-expandable/a-expandable.vue';
import ScrollBtn from '@/components/scroll-btn/scroll-btn.vue';
import { useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme.store';

const { t } = useI18n();
const themeStore = useThemeStore();

const about = useTemplateRef('about');
const contact = useTemplateRef('contact');
</script>

<style scoped lang="scss">
@forward './homepage.scss';
</style>