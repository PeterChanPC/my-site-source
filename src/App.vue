<template>
  <div>
    <GlobalSidebar ref="sidebar" />
    <GlobalHeader :toggleSidebar="sidebar?.toggleSidebar" />
  </div>
  <router-view />
</template>

<script setup lang="ts">
import GlobalHeader from '@/layout/global-header/global-header.vue';
import GlobalSidebar from '@/layout/global-sidebar/global-sidebar.vue';
import { useTemplateRef } from 'vue';
const sidebar = useTemplateRef('sidebar');
</script>

<style lang="scss">
@forward '@/styles/theme.scss';

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
}

input,
select,
button,
a {
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  appearance: none;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  display: inline-block;
  margin: 0;
  line-height: 1em;
}

i,
span {
  width: auto;
  height: 16px;
  font-size: 16px;
  line-height: 1em;
}

img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>