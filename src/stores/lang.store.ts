import { defineStore } from "pinia";
import { watchEffect } from "vue";
import { useI18n } from 'vue-i18n';

type SupportedLang = 'en-US' | 'zh-TW';
const SUPPORTED_LANGS: SupportedLang[] = ["en-US", "zh-TW"];

export const useLangStore = defineStore('lang', () => {
  const { locale } = useI18n({ useScope: 'global' });
  const storedLang = localStorage.getItem("lang") as SupportedLang | null;
  locale.value = SUPPORTED_LANGS.includes(storedLang as SupportedLang)
    ? (storedLang as SupportedLang)
    : 'en-US';
  
  watchEffect(() => {
    localStorage.setItem('lang', locale.value);
  });

  function changeLang() {
    switch(locale.value) {
      case 'en-US':
        locale.value = 'zh-TW';
        break;
      case 'zh-TW':
        locale.value = 'en-US';
        break;
    };
  };

  return { locale, changeLang };
});