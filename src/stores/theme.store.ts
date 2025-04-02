import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useThemeStore = defineStore('theme', () => {
  const storedTheme = localStorage.getItem('theme');
  const theme = ref(storedTheme !== null ? storedTheme : 'light');
  
  watchEffect(() => {
    localStorage.setItem('theme', theme.value)
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

  return { theme, changeTheme };
});