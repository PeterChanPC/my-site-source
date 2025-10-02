import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";

type SupportedTheme = 'light' | 'dark';
const SUPPORTED_THEMES: SupportedTheme[] = ['light', 'dark'];

export const useThemeStore = defineStore('theme', () => {
  const storedTheme = localStorage.getItem('theme') as SupportedTheme | null;
  const theme = ref<SupportedTheme>(SUPPORTED_THEMES.includes(storedTheme as SupportedTheme)
    ? (storedTheme as SupportedTheme)
    : 'light');

  watchEffect(() => {
    localStorage.setItem('theme', theme.value);
  });

  const isDark = computed((): boolean => {
    return theme.value === 'dark';
  })

  function changeTheme(): void {
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