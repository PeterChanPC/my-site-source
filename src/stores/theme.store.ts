import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import { Themes } from "./d";

function checkTheme(theme: string | null): theme is Themes {
  return theme !== null;
};

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Themes>(Themes.Light);

  const storedTheme = localStorage.getItem('theme'); // get locally stored theme setting
  if (checkTheme(storedTheme)) theme.value = storedTheme;

  watchEffect(() => localStorage.setItem('theme', theme.value));

  function switchTheme(): void {
    console.log(theme.value)
    switch (theme.value) {
      case Themes.Light:
        theme.value = Themes.Dark;
        break;
      case Themes.Dark:
        theme.value = Themes.Light;
        break;
    };
  };

  const isDark = computed((): boolean => theme.value === Themes.Dark);
  const isLight = computed((): boolean => theme.value === Themes.Light);

  return { theme, switchTheme, isDark, isLight };
});