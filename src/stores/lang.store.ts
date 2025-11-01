import { defineStore } from "pinia";
import { useI18n } from 'vue-i18n';
import { computed, watchEffect } from "vue";
import { Languages } from "./d";

function checkLang(lang: string | null): lang is Languages {
  return lang !== null;
};

export const useLangStore = defineStore('lang', () => {
  const { locale } = useI18n({ useScope: 'global' });

  const storedLang = localStorage.getItem('lang'); // get locally stored lang setting
  if (checkLang(storedLang)) locale.value = storedLang;

  // runtime store lang setting in local storage
  watchEffect(() => localStorage.setItem('lang', locale.value));

  const switchLang = (): void => {
    switch (locale.value) {
      case Languages.EnUS:
        locale.value = Languages.ZhTW;
        break;
      case Languages.ZhTW:
        locale.value = Languages.EnUS;
        break;
    };
  };

  const isEnUS = computed((): boolean => locale.value === Languages.EnUS);
  const isZhTW = computed((): boolean => locale.value === Languages.ZhTW);

  return { locale, switchLang, isEnUS, isZhTW };
});