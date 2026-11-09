import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import { Theme } from "./d";

function loadStoredTheme(storageKey: string): Theme {
  const stored = localStorage.getItem(storageKey);
  if (!stored) {
    return Theme.Light;
  }

  try {
    const parsed = JSON.parse(stored);
    if (Object.values(Theme).includes(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.log("Error parsing stored theme:", error, "\n-Fallback to Light Mode");
  }

  return Theme.Light;
}

function saveTheme(key: string, theme: Theme): void {
  localStorage.setItem(key, JSON.stringify(theme));
}

export const useThemeStore = defineStore("theme", () => {
  const STORAGE_KEY = "theme";
  const theme = ref<Theme>(loadStoredTheme(STORAGE_KEY));
  watchEffect(() => saveTheme(STORAGE_KEY, theme.value));

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
