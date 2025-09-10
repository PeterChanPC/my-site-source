<template>
  <GlobalHeader />
  <router-view />
</template>

<script setup lang="ts">
import GlobalHeader from '@/layout/global-header/global-header.vue';
import { watchEffect } from 'vue';
import { useThemeStore } from './stores/theme.store';

const themeStore = useThemeStore();

watchEffect(() => {
  document.body.style.setProperty('--theme', themeStore.theme);
});
</script>

<style lang="scss">
@use '@/styles/style';

body {
  margin: 0;
}

@container style(--theme: light) {
  #app {
    --bg-color-primary: #{style.$bg-light-primary};
    --bg-color-secondary: #{style.$bg-light-secondary};
    --bg-color-opague: #{style.$bg-light-opague};
    --txt-color: #{style.$txt-light};
    --shadow-color: #{style.$shadow-light};
    --img-filter: #{style.$img-light};
  }
}

@container style(--theme: dark) {
  #app {
    --bg-color-primary: #{style.$bg-dark-primary};
    --bg-color-secondary: #{style.$bg-dark-secondary};
    --bg-color-opague: #{style.$bg-dark-opague};
    --txt-color: #{style.$txt-dark};
    --shadow-color: #{style.$shadow-dark};
    --img-filter: #{style.$img-dark};
  }
}

#app {
  @include style.transition((background-color, color), 100ms);
  container-type: normal;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;
  user-select: none;

  img {
    @include style.center-absolute;
    width: 1.2rem;
    height: 1.2rem;
    filter: var(--img-filter);
  }

  .page {
    @include style.flex(row, center);
    position: relative;
    width: 100%;
    height: style.$homepage-height;
    background-color: var(--bg-color-primary);
    color: var(--txt-color);
    overflow: hidden;
  }
}
</style>