<template>
  <div :class="['home', `theme-${themeStore.theme}`]">
    <div ref="intro" class="container show">
      <div class="intro">
        <div>
          <AnimatedTxt :text="t('hello')" fontSize="md" textTransform="cap" lineHeight="xl" justify="start" wrap="wrap"
            :whiteSpace="true" animation="fadeIn" duration="1000ms" :stagger="50" />
        </div>
        <AnimatedTxt text="peter chan" fontSize="4xl" textTransform="uc" letterSpacing="md" lineHeight="md" justify="start" wrap="wrap"
          animation="fadeIn" duration="1000ms" :stagger="100" />
        <div class="contacts">
          <AHoverable href="https://github.com/PeterChanPC" icon="fi fi-brands-github" text="Github" />
          <AHoverable href="https://www.linkedin.com/in/peter-chan-17939a262" icon="fi fi-brands-linkedin" text="Linkedin" />
          <AHoverable href="mailto:nmchan04@gmail.com" icon="fi fi-rr-envelope" text="Email" />
          <AHoverable href="https://www.youtube.com/@peterchanpc4657" icon="fi fi-brands-youtube" text="Youtube" />
          <a class="resume" href="./CV.pdf" target="_blank">
            <span>Get my resume</span>
            <i class="fi fi-rr-angle-double-small-right"></i>
          </a>
        </div>
      </div>
    </div>

    <div ref="about" class="container">
      <div class="about">
        <div class="title">
          <AnimatedTxt text="about me" fontSize="4xl" textTransform="cap" justify="center" animation="fadeInRight"
            duration="500ms" :stagger="100" :whiteSpace="true" />
        </div>

        <div class="details">
          <AnimatedTxt
            text="Hi, I’m Peter Chan, a recent Physics graduate from HKUST. I’m passionate about coding and have experience in Python, C#, and Vue.js. I enjoy building projects and learning new technologies."
            fontSize="md" lineHeight="xl" justify="start" wrap="wrap" animation="fadeIn" duration="500ms" delay="500ms" :stagger="5"
            :whiteSpace="true" />
        </div>
      </div>
    </div>

    <div ref="work" class="container">
      <div class="work">
        <div class="title">
          <AnimatedTxt text="Portfolio" fontSize="4xl" textTransform="cap" justify="evenly" animation="fadeInRight"
            duration="500ms" :stagger="100" />
        </div>

        <div class="details">
          <router-link :to="{name: 'todos'}">
            <span>Todo List</span>
          </router-link>
          <router-link :to="{name: 'todos'}">
            <span>Todo List</span>
          </router-link>
          <router-link :to="{name: 'todos'}">
            <span>Todo List</span>
          </router-link>
          <router-link :to="{name: 'todos'}">
            <span>Todo List</span>
          </router-link>
          <router-link :to="{name: 'todos'}">
            <span>Todo List</span>
          </router-link>
          <router-link :to="{name: 'authentication'}">
            <span>Authentication</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="page-select">
      <button :class="['btn', 'left', { 'show': containerList[currentPage - 1] }]" @click="show(--currentPage)">
        <i class="fi fi-rr-angle-left"></i>
        <i class="fi fi-rr-angle-left faint"></i>
        <span>
          {{ containerNameList[currentPage - 1] }}
        </span>
      </button>
      <button :class="['btn', 'right', { 'show': containerList[currentPage + 1] }]" @click="show(++currentPage)">
        <span>
          {{ containerNameList[currentPage + 1] }}
        </span>
        <i class="fi fi-rr-angle-right"></i>
        <i class="fi fi-rr-angle-right faint"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AHoverable from '@/components/a-hoverable/a-hoverable.vue';
import AnimatedTxt from '@/components/animated-txt/animated-txt.vue';
import { type Ref, ref, useTemplateRef } from 'vue';
import { useThemeStore } from '@/stores/theme.store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const themeStore = useThemeStore();

const intro: Ref<HTMLDivElement | null> = useTemplateRef('intro');
const about: Ref<HTMLDivElement | null> = useTemplateRef('about');
const work: Ref<HTMLDivElement | null> = useTemplateRef('work');
const containerList: Ref<HTMLDivElement | null>[] = [intro, about, work];
const containerNameList: String[] = ['Introduction', 'About Me', 'Experience'];

const currentPage: Ref<number> = ref(0);
const show = (pageNum: number) => {
  currentPage.value = pageNum;
  containerList[pageNum].value?.classList.add('show');
  for (let i = 0; i < containerList.length; i++) {
    if (i !== pageNum) containerList[i].value?.classList.remove('show');
  };
}
</script>

<style scoped lang="scss">
@forward './homepage.scss';
</style>