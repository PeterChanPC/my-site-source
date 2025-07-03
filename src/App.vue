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
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;
}
</style>