<template>
  <div class="page projects">
    <ul class="works">
      <AHoverable v-for="work in works" :path="work" :text="t(work)" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import AHoverable from '@/components/a-hoverable.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const works = ['todos', 'authentication', 'blogs', 'test'];
</script>

<style scoped lang="scss"></style>