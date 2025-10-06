import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import { SupportedTheme } from "./d";

const SUPPORTED_THEMES: SupportedTheme[] = ['light', 'dark'];

export const useThemeStore = defineStore('theme', () => {
  // get local stored theme setting
  const storedTheme = localStorage.getItem('theme');

  // fallback to light theme if no local stored setting
  const theme = ref<SupportedTheme>(SUPPORTED_THEMES.includes(storedTheme as SupportedTheme)
    ? (storedTheme as SupportedTheme)
    : 'light');

  // store local setting
  watchEffect(() => {
    localStorage.setItem('theme', theme.value);
  });

  const isDark = computed((): boolean => {
    return theme.value === 'dark';
  });

  const changeTheme = (): void => {
    switch (theme.value) {
      case 'light':
        theme.value = 'dark';
        break;
      case 'dark':
        theme.value = 'light';
        break;
    };
  };

  return { theme, isDark, changeTheme };
});