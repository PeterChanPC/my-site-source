import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import { Theme } from "./d";

export const useThemeStore = defineStore("theme", () => {
  const STORAGE_KEY = "theme";
  const theme = ref<Theme>(Theme.Light);

  const storedTheme = localStorage.getItem(STORAGE_KEY); // get locally stored theme setting
  if (storedTheme && Object.values(Theme).includes(storedTheme)) {
    theme.value = storedTheme;
  }

  watchEffect(() => localStorage.setItem(STORAGE_KEY, theme.value));

  function switchTheme(): void {
    switch (theme.value) {
      case Theme.Light:
        theme.value = Theme.Dark;
        break;
      case Theme.Dark:
        theme.value = Theme.Light;
        break;
    }
  }

  const isDark = computed<boolean>(() => theme.value === Theme.Dark);
  const isLight = computed<boolean>(() => theme.value === Theme.Light);

  return { theme, switchTheme, isDark, isLight };
});
