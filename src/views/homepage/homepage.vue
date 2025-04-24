<template>
  <div :class="['home', `theme-${themeStore.theme}`]">
    <div class="bg"></div>

    <div class="intro">
      <span class="text-up">{{ t('hello') }}</span>
      <div class="text-down">
        <div class="name-1">
          <AnimatedTxt
            text="peter"
            fontSize="large"
            textTransform="uppercase"
            justify="evenly"
            animation="fade-in"
          />
        </div>
        <div class="name-2">
          <AnimatedTxt
            text="chan"
            fontSize="large"
            textTransform="uppercase"
            justify="evenly"
            animation="fade-in"
            delay="1000ms"
          />
        </div>
      </div>

      <div class="scroll-btn-container">
        <ScrollBtn text="About" :theme="themeStore.theme" :to="aboutContainer"/>|
        <ScrollBtn text="Contact" :theme="themeStore.theme" :to="contactContainer"/>
      </div>

      <ScrollBtn icon="fi fi-rr-angle-down" text="Scroll Down" :theme="themeStore.theme" shape="round" :to="aboutContainer"/>
    </div>

    <div ref="aboutContainer" class="about-container">
      <div class="about">
        <div class="title">
          <AnimatedTxt
            text="About Me"
            fontSize="medium"
            justify="evenly"
            animation="fade-in-left"
          />
        </div>

        <div class="about-details">
          <span>details - temporary design</span>
        </div>
      </div>
    </div>

    <div ref="workContainer" class="work-container">
      <div class="work">
        <div class="title">
          <AnimatedTxt
            text="portfolio"
            fontSize="medium"
            textTransform="capitalize"
            justify="evenly"
            animation="fade-in-left"
          />
        </div>

        <div class="work-details">
          <span>details - temporary design</span>
        </div>
      </div>
    </div>

    <div ref="contactContainer" class="contact-container">
      <div class="contact">
        <div class="title">
          <AnimatedTxt
            text="contact"
            fontSize="medium"
            textTransform="capitalize"
            justify="evenly"
            animation="fade-in-left"
          />
        </div>

        <div class="contact-details">
          <span>details - temporary design</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AExpandable from '@/components/a-expandable/a-expandable.vue';
import ScrollBtn from '@/components/scroll-btn/scroll-btn.vue';
import AnimatedTxt from '@/components/animated-txt/animated-txt.vue';
import { type Ref, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme.store';
import { useIntersectionObserver } from '@/composable/useIntersectionObserver';

const { t } = useI18n();
const themeStore = useThemeStore();

const aboutContainer: Ref<HTMLDivElement | null> = useTemplateRef('aboutContainer');
const workContainer: Ref<HTMLDivElement | null> = useTemplateRef('workContainer');
const contactContainer: Ref<HTMLDivElement | null> = useTemplateRef('contactContainer');

const { observe } = useIntersectionObserver({
  rootMargin: "-150px",
});

observe(aboutContainer);
observe(workContainer);
observe(contactContainer);

</script>

<style scoped lang="scss">
@forward './homepage.scss';
</style>