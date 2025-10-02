<template>
  <GlobalHeader />
  <router-view />
</template>

<script setup lang="ts">
import GlobalHeader from '@/layout/global-header.vue';
import { watchEffect } from 'vue';
import { useThemeStore } from './stores/theme.store';

const themeStore = useThemeStore();

watchEffect(() => {
  document.body.style.setProperty('--theme', themeStore.theme);
});
</script>

<style lang="scss">
@use "@/styles/style" as style;
@use "sass:map";

body {
  margin: 0;
}

@container style(--theme: light) {
  #app {
    --bg-color-primary: #{map.get(style.$bg-colors, "light-primary")};
    --bg-color-secondary: #{map.get(style.$bg-colors, "light-secondary")};
    --bg-opague-color: #{map.get(style.$bg-opague-colors, "light")};
    --txt-color: #{map.get(style.$txt-colors, "light")};
    --shadow-color: #{map.get(style.$shadow-colors, "light")};
    --img-filter: #{map.get(style.$img-colors, "light")};
  }
}

@container style(--theme: dark) {
  #app {
    --bg-color-primary: #{map.get(style.$bg-colors, "dark-primary")};
    --bg-color-secondary: #{map.get(style.$bg-colors, "dark-secondary")};
    --bg-opague-color: #{map.get(style.$bg-opague-colors, "dark")};
    --txt-color: #{map.get(style.$txt-colors, "dark")};
    --shadow-color: #{map.get(style.$shadow-colors, "dark")};
    --img-filter: #{map.get(style.$img-colors, "dark")};
  }
}

#app {
  container-type: normal;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.2rem;
    height: 1.2rem;
    transform: translate(-50%, -50%);
    filter: var(--img-filter);
  }

  a,
  span,
  h1 {
    color: var(--txt-color);
    text-decoration: none;
  }

  .page {
    position: relative;
    width: 100%;
    height: calc(100dvh - 100px);
    padding: 50px 0;
    background-color: var(--bg-color-primary);
    color: var(--txt-color);
    overflow: hidden;
    user-select: none;
  }
}
</style>