import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { computed, watchEffect } from "vue";
import { Language } from "./d";

export const useLangStore = defineStore("lang", () => {
  const STORAGE_KEY = "lang";
  const { locale } = useI18n({ useScope: "global" });

  const storedLang = localStorage.getItem(STORAGE_KEY); // get locally stored lang setting
  if (storedLang && Object.values(Language).includes(storedLang))
    locale.value = storedLang;

  // runtime store lang setting in local storage
  watchEffect(() => localStorage.setItem(STORAGE_KEY, locale.value));

  const switchLang = (): void => {
    switch (locale.value) {
      case Language.EnUS:
        locale.value = Language.ZhTW;
        break;
      case Language.ZhTW:
        locale.value = Language.EnUS;
        break;
    }
  };

  const isEnUS = computed<boolean>(() => locale.value === Language.EnUS);
  const isZhTW = computed<boolean>(() => locale.value === Language.ZhTW);

  return { locale, switchLang, isEnUS, isZhTW };
});
