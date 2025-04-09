<template>
  <div :class="['home', `theme-${themeStore.theme}`]">
    <div :class="['intro', `bg-theme-${themeStore.theme}`]">
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
      <div class="social-media">
        <AExpandable link="https://github.com/PeterChanPC/" :theme="themeStore.theme">
          <template #icon>
            <i class="fi fi-brands-github"></i>
          </template>
          <template #text>
            <span>github</span>
          </template>
        </AExpandable>
        <AExpandable link="https://www.linkedin.com/in/peter-chan-17939a262" :theme="themeStore.theme">
          <template #icon>
            <i class="fi fi-brands-linkedin"></i>
          </template>
          <template #text>
            <span>linkedin</span>
          </template>
        </AExpandable>
        <AExpandable link="mailto:nmchan04@gmail.com" :theme="themeStore.theme">
          <template #icon>
            <i class="fi fi-rr-envelope"></i>
          </template>
          <template #text>
            <span>gmail</span>
          </template>
        </AExpandable>
        <AExpandable link="https://youtube.com/@peterchanpc4657?si=bITaJnzAbMoYT4DZ" :theme="themeStore.theme">
          <template #icon>
            <i class="fi fi-brands-youtube"></i>
          </template>
          <template #text>
            <span>youtube</span>
          </template>
        </AExpandable>
      </div>
    </div>

    <div class="about">
      about
    </div>

    <div class="project">
      project
    </div>
  </div>
</template>

<script setup lang="ts">
import AExpandable from '@/components/a-expandable/a-expandable.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const themeStore = useThemeStore();

const scrollToHome = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
}
</script>

<style scoped lang="scss">
@forward './homepage.scss';
</style>