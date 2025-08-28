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
    --bg-color: #{style.$bg-light};
    --bg-color-opague: #{style.$bg-light-opague};
    --txt-color: #{style.$txt-light};
    --img-filter: #{style.$img-light};
  }
}

@container style(--theme: dark) {
  #app {
    --bg-color: #{style.$bg-dark};
    --bg-color-opague: #{style.$bg-dark-opague};
    --txt-color: #{style.$txt-dark};
    --img-filter: #{style.$img-dark};
  }
}

#app {
  @include style.transition((background-color, color), 100ms);
  container-type: normal;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;

  img {
    @include style.center-absolute;
    width: 1.2rem;
    height: 1.2rem;
    filter: var(--img-filter);
  }
}
</style>