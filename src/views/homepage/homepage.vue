<template>
  <div class="page home">
    <div class="homepage-bg">
      <HomepageBg />
    </div>

    <div ref="intro" class="container show">
      <div class="intro">

        <span class="intro-txt">
          <AnimatedTxt :text="t('hello')" fontSize="md" textTransform="cap" lineHeight="xl" justify="start" wrap="wrap"
            :whiteSpace="true" animation="fadeIn" duration="1000ms" :stagger="50" />
          <AnimatedTxt text="peter chan" fontSize="4xl" textTransform="uc" letterSpacing="md" lineHeight="md"
            justify="start" wrap="wrap" animation="fadeIn" duration="1000ms" :stagger="100" />
        </span>
      </div>
    </div>

    <!-- <div ref="about" class="container">
      <div class="about">
        <div class="title">
          <AnimatedTxt :text="t('about_me')" fontSize="4xl" textTransform="cap" justify="center" animation="fadeInRight"
            duration="500ms" :stagger="50" :whiteSpace="true" />
        </div>

        <div class="details">
          <AnimatedTxt :text="t('about_me_details')" fontSize="md" lineHeight="xl" justify="start" wrap="wrap"
            animation="fadeIn" duration="300ms" delay="300ms" :stagger="3" :whiteSpace="true"
            :lang="langStore.locale" />
        </div>
      </div>
    </div>

    <div ref="work" class="container">
      <div class="work">
        <div class="title">
          <AnimatedTxt :text="t('exp')" fontSize="4xl" textTransform="cap" justify="evenly" animation="fadeIn"
            duration="1000ms" :stagger="50" />
        </div>

        <div class="details">
          <router-link :to="{ name: 'todos' }">
            <span>Todo List</span>
          </router-link>
          <router-link :to="{ name: 'authentication' }">
            <span>Authentication</span>
          </router-link>
          <router-link :to="{ name: 'test' }">
            <span>test</span>
          </router-link>
          <router-link :to="{ name: 'test' }">
            <span>test</span>
          </router-link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import CV from '@/assets/my-cv-general.pdf';
import AHoverable from '@/components/a-hoverable/a-hoverable.vue';
import AnimatedTxt from '@/components/animated-txt/animated-txt.vue';
import HomepageBg from './homepage-bg.vue';
import { type Ref, ref, useTemplateRef, watchEffect } from 'vue';
import { useLangStore } from '@/stores/lang.store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const langStore = useLangStore();

// const intro: Ref<HTMLDivElement | null> = useTemplateRef('intro');
// const about: Ref<HTMLDivElement | null> = useTemplateRef('about');
// const work: Ref<HTMLDivElement | null> = useTemplateRef('work');
// const containerList: Ref<HTMLDivElement | null>[] = [intro, about, work];
// const containerNameList: Ref<String[]> = ref([]);

// watchEffect(() => {
//   containerNameList.value = [t('intro'), t('about_me'), t('exp')];
// });

// const currentPage: Ref<number> = ref(0);
// const show = (pageNum: number) => {
//   currentPage.value = pageNum;
//   containerList[pageNum].value?.classList.add('show');
//   for (let i = 0; i < containerList.length; i++) {
//     if (i !== pageNum) containerList[i].value?.classList.remove('show');
//   };
// };
</script>

<style scoped lang="scss">
@forward './homepage';
</style>