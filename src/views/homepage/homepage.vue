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
        <ScrollBtn text="About" :theme="themeStore.theme" :to="{top: height, left: 0}"/>|
        <ScrollBtn text="Work" :theme="themeStore.theme" :to="{top: 2 * height, left: 0}"/>|
        <ScrollBtn text="Contact" :theme="themeStore.theme" :to="{top: 3 * height, left: 0}"/>
      </div>

      <div class="scroll-down">
        <ScrollBtn icon="fi fi-rr-angle-down" :theme="themeStore.theme"/>
      </div>
    </div>

    <div class="about">
      about
    </div>

    <div class="project">
      project
    </div>

    <div class="contact">
      contact
    </div>
  </div>
</template>

<script setup lang="ts">
import AExpandable from '@/components/a-expandable/a-expandable.vue';
import ScrollBtn from '@/components/scroll-btn/scroll-btn.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme.store';

const { t } = useI18n();
const themeStore = useThemeStore();

const height = ref<number>(window.innerHeight - 50);
</script>

<style scoped lang="scss">
@forward './homepage.scss';
</style>