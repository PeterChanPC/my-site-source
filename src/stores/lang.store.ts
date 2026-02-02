import { defineStore } from "pinia";
import { useI18n } from 'vue-i18n';
import { computed, watchEffect } from "vue";
import { Language } from "./d";

function checkLang(lang: string | null): lang is Language {
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
      case Language.EnUS:
        locale.value = Language.ZhTW;
        break;
      case Language.ZhTW:
        locale.value = Language.EnUS;
        break;
    };
  };

  const isEnUS = computed<boolean>(() => locale.value === Language.EnUS);
  const isZhTW = computed<boolean>(() => locale.value === Language.ZhTW);

  return { locale, switchLang, isEnUS, isZhTW };
});