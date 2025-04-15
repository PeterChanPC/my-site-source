import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";

export const useThemeStore = defineStore('theme', () => {
  const storedTheme = localStorage.getItem('theme');
  const theme = ref(storedTheme !== null ? storedTheme : 'light');
  
  watchEffect(() => {
    localStorage.setItem('theme', theme.value);
  });

  const isDark = computed((): boolean => {
    return theme.value === 'dark';
  })

  function changeTheme() {
    switch(theme.value) {
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