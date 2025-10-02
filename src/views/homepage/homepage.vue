<template>
  <div class="page flex row a-center j-center">
    <div class="absolute t-0 l-0 w-full h-full">
      <Background />
    </div>
    <div class="flex col a-start w-0.80 z-1">
      <AnimatedTxt :text="t('hello')" fontSize="md" textTransform="capitalize" lineHeight="xl" justify="start"
        wrap="wrap" :whiteSpace="true" :duration="1000" :stagger="50" />
      <AnimatedTxt text="peter chan" fontSize="4xl" textTransform="uppercase" letterSpacing="md" lineHeight="md"
        justify="start" wrap="wrap" :duration="1000" :stagger="100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedTxt from '@/components/animated-txt.vue';
import Background from '@/views/homepage/homepage-bg.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped lang="scss"></style>