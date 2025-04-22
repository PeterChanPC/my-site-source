<template>
  <div :class="['home', `theme-${themeStore.theme}`]">
    <div class="bg"></div>

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
        <ScrollBtn text="About" :theme="themeStore.theme" :to="aboutContainer"/>|
        <ScrollBtn text="Contact" :theme="themeStore.theme" :to="contactContainer"/>
      </div>

      <ScrollBtn icon="fi fi-rr-angle-down" text="Scroll Down" :theme="themeStore.theme" shape="round" :to="about"/>
    </div>

    <div ref="aboutContainer" class="about-container">
      <div ref="about" class="about">
        <span>About Me</span>
      </div>
    </div>

    <div class="project">
      project
    </div>

    <div ref="contactContainer" class="contact-container">
      <div ref="contact" class="contact">
        <span>contact</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AExpandable from '@/components/a-expandable/a-expandable.vue';
import ScrollBtn from '@/components/scroll-btn/scroll-btn.vue';
import animatedTxt from '@/components/animated-txt/animated-txt.vue';
import { type Ref, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme.store';
import { useIntersectionObserver } from '@/composable/useIntersectionObserver';

const { t } = useI18n();
const themeStore = useThemeStore();

const aboutContainer: Ref<HTMLDivElement | null> = useTemplateRef('aboutContainer');
const contactContainer: Ref<HTMLDivElement | null> = useTemplateRef('contactContainer');
const about: Ref<HTMLDivElement | null> = useTemplateRef('about');
const contact: Ref<HTMLDivElement | null> = useTemplateRef('contact');

const { observe } = useIntersectionObserver({
  rootMargin: "-150px",
});

observe(about);
observe(contact);

</script>

<style scoped lang="scss">
@forward './homepage.scss';
</style>