import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import { Theme } from "./d";

function checkTheme(theme: string | null): theme is Theme {
  return theme !== null;
};

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(Theme.Light);

  const storedTheme = localStorage.getItem('theme'); // get locally stored theme setting
  if (checkTheme(storedTheme)) theme.value = storedTheme;

  watchEffect(() => localStorage.setItem('theme', theme.value));

  function switchTheme(): void {
    switch (theme.value) {
      case Theme.Light:
        theme.value = Theme.Dark;
        break;
      case Theme.Dark:
        theme.value = Theme.Light;
        break;
    };
  };

  const isDark = computed<boolean>(() => theme.value === Theme.Dark);
  const isLight = computed<boolean>(() => theme.value === Theme.Light);

  return { theme, switchTheme, isDark, isLight };
});