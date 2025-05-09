<template>
  <div :class="['home', `theme-${themeStore.theme}`]">
    <div ref="intro" class="container show">
      <div class="intro">
        <div style="height: 2.5em;">
          <AnimatedTxt
            :text="t('hello')"
            fontSize="md"
            textTransform="cap"
            justify="start"
            wrap="wrap"
            :whiteSpace="true"
            animation="fadeIn"
            duration="1000ms"
            :stagger="50"
          />
        </div>
        <AnimatedTxt
          text="peter chan"
          fontSize="4xl"
          textTransform="uc"
          letterSpacing="md"
          justify="start"
          wrap="wrap"
          animation="fadeIn"
          duration="1000ms"
          :stagger="100"
        />
        <div class="contacts">
          <AHoverable
            href="https://github.com/PeterChanPC"
            icon="fi fi-brands-github"
            text="Github"
          />
          <AHoverable
            href="www.linkedin.com/in/peter-chan-17939a262"
            icon="fi fi-brands-linkedin"
            text="Linkedin"
            />
          <AHoverable
            href="mailto:nmchan04@gmail.com"
            icon="fi fi-rr-envelope"
            text="Email"
          />
          <AHoverable
            href="https://www.youtube.com/@peterchanpc4657"
            icon="fi fi-brands-youtube"
            text="Youtube"
          />
        </div>
      </div>
    </div>

    <div ref="about" class="container">
      <div class="about">
        <div class="title">
          <AnimatedTxt
            text="about me"
            fontSize="4xl"
            textTransform="cap"
            justify="center"
            animation="fadeInRight"
            duration="500ms"
            :stagger="100"
            :whiteSpace="true"
          />
        </div>

        <div class="about-details">
          <AnimatedTxt
            text="Hi, I’m Peter Chan, a recent Physics graduate from HKUST. I’m passionate about coding and have experience in Python, C#, and Vue.js. I enjoy building projects and learning new technologies."
            fontSize="md"
            justify="start"
            wrap="wrap"
            animation="fadeIn"
            duration="500ms"
            delay="500ms"
            :stagger="5"
            :whiteSpace="true"
          />
        </div>
      </div>
    </div>

    <div ref="work" class="container">
      <div class="work">
        <div class="title">
          <AnimatedTxt
            text="experience"
            fontSize="4xl"
            textTransform="cap"
            justify="evenly"
            animation="fadeInRight"
            duration="500ms"
            :stagger="100"
          />
        </div>

        <div class="work-details">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AHoverable from '@/components/a-hoverable/a-hoverable.vue';
import AnimatedTxt from '@/components/animated-txt/animated-txt.vue';
import { type Ref, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme.store';

const { t } = useI18n();
const themeStore = useThemeStore();

const intro: Ref<HTMLDivElement | null> = useTemplateRef('intro');
const about: Ref<HTMLDivElement | null> = useTemplateRef('about');
const work: Ref<HTMLDivElement | null> = useTemplateRef('work');
</script>

<style scoped lang="scss">
@forward './homepage.scss';
</style>