import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { computed, watchEffect } from "vue";
import { Language } from "./d";

function loadStoredLang(storageKey: string): Language {
  const stored = localStorage.getItem(storageKey);
  if (!stored) {
    return Language.EnUS;
  }

  try {
    const parsed = JSON.parse(stored);
    if (Object.values(Language).includes(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.log("Error parsing stored language:", error, "\n-Fallback to EnUS");
  }

  return Language.EnUS;
}

function saveLang(key: string, lang: Language): void {
  localStorage.setItem(key, JSON.stringify(lang));
}

export const useLangStore = defineStore("lang", () => {
  const STORAGE_KEY = "lang";
  const { locale } = useI18n({ useScope: "global" });
  locale.value = loadStoredLang(STORAGE_KEY);
  watchEffect(() => saveLang(STORAGE_KEY, locale.value));

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
