import { defineStore } from "pinia";
import { useI18n } from 'vue-i18n';
import { computed, watchEffect } from "vue";
import { SupportedLang } from "./d";

const SUPPORTED_LANGS: SupportedLang[] = ["en-US", "zh-TW"];

export const useLangStore = defineStore('lang', () => {
  const { locale } = useI18n({ useScope: 'global' });
  // get local stored lang setting
  const storedLang = localStorage.getItem("lang");

  // fallback to en-US if no local stored setting
  locale.value = SUPPORTED_LANGS.includes(storedLang as SupportedLang)
    ? (storedLang as SupportedLang)
    : 'en-US';

  // store lang setting
  watchEffect(() => {
    localStorage.setItem('lang', locale.value);
  });

  const isEnUS = computed((): boolean => {
    return locale.value === 'en-US';
  });

  // only supports 2 lang now
  const changeLang = (): void => {
    switch (locale.value) {
      case 'en-US':
        locale.value = 'zh-TW';
        break;
      case 'zh-TW':
        locale.value = 'en-US';
        break;
    };
  };

  return { locale, isEnUS, changeLang };
});