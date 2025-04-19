<template>
  <div :class="['home', `theme-${themeStore.theme}`]">
    <div class="intro">
      <span class="text-up">{{ t('hello') }}</span>
      <div class="text-down">
        <div class="name-1">
          <animatedTxt
            text="peter"
            fontSize="clamp(3rem, 3vw + 2rem, 12rem)"
            textTransform="uppercase"
          />
        </div>
        <div class="name-2">
          <animatedTxt
            text="chan"
            fontSize="clamp(3rem, 3vw + 2rem, 12rem)"
            textTransform="uppercase"
            delay="1000ms"
          />
        </div>
      </div>

      <div class="scroll-btn-container">
        <ScrollBtn text="About" :theme="themeStore.theme" :to="about"/>|
        <ScrollBtn text="Contact" :theme="themeStore.theme" :to="contact"/>
      </div>

      <ScrollBtn icon="fi fi-rr-angle-down" text="Scroll Down" :theme="themeStore.theme" shape="round" :to="about"/>
    </div>

    <div ref="about" class="about">
      <span>About Me</span>
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
import animatedTxt from '@/components/animated-txt/animated-txt.vue';
import { onMounted, onUnmounted, Ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme.store';

const { t } = useI18n();
const themeStore = useThemeStore();

const about: Ref<HTMLDivElement | null> = useTemplateRef('about');
const contact: Ref<HTMLDivElement | null> = useTemplateRef('contact');

const observer: IntersectionObserver | null = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    };
  });
}, { threshold: .2, });

onMounted(() => {
  observer.observe(about.value!);
  observer.observe(contact.value!);
})

onUnmounted(() => {
  observer.disconnect();
})
</script>

<style scoped lang="scss">
@forward './homepage.scss';
</style>