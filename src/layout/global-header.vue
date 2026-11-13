<template>
  <Transition name="slide-from-top">
    <header v-if="!loadingStore.isLoading && !loadingStore.isFirstLoad"
      class="fixed flex a-center j-between t-0 w-dvw h-50 z-100">
      <h1 class="absolute w-38 ml-16 mr-16 mt-auto mb-auto font-size-36 italic user-select-none">Pc</h1>
      <nav class="flex j-around w-400 ml-70 sm:none">
        <AHoverable to="home" effect="underline-m" :text="t('home')" />
        <AHoverable to="works" effect="underline-m" :text="t('work')" />
        <AHoverable to="blogs" effect="underline-m" :text="t('blog')" />
      </nav>

      <div class="flex a-center j-around w-116 pr-16 ml-auto user-select-none">
        <div class="flex a-center j-around w-full sm:none">
          <SwitchBtn @switch="themeStore.switchTheme" :is-active="themeStore.isDark" :img-left="icons.sun"
            :img-right="icons.moonStars" />
          <SwitchBtn @switch="langStore.switchLang" :is-active="langStore.isEnUS" text-left="中" text-right="Eng" />
        </div>

        <button class="none relative w-32 h-32 pointer sm:block sm:ml-auto" @click="toggleSidebar">
          <Transition name="fade">
            <img :src="icons.menuBurger" alt="menu" v-if="!toggled" />
          </Transition>
          <Transition name="spin-fade">
            <img :src="icons.crossSmall" alt="close" v-if="toggled" class="transform-origin-top-left" />
          </Transition>
        </button>
      </div>
    </header>
  </Transition>
  <GlobalSidebar ref="sidebar" />
</template>

<script setup lang="ts">
import GlobalSidebar from '@/layout/global-sidebar.vue';
import AHoverable from '@/components/a-hoverable.vue';
import SwitchBtn from '@/components/switch-btn.vue';
import * as icons from '@/assets/img/d';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { useLoadingStore } from '@/stores/loading.store';
import { computed, useTemplateRef } from 'vue';

const themeStore = useThemeStore();
const langStore = useLangStore();
const loadingStore = useLoadingStore();
const { t } = useI18n();
const sidebar = useTemplateRef<typeof GlobalSidebar>('sidebar')

const toggled = computed(() => {
  if (!sidebar.value) return false
  return sidebar.value.toggled
})

function toggleSidebar(): void {
  if (sidebar.value) sidebar.value.toggle()
};
</script>

<style scoped lang="scss"></style>