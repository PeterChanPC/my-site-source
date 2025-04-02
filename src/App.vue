<template>
  <GlobalHeader theme="dark"/>
  <router-view/>
</template>

<script setup lang="ts">
import GlobalHeader from './components/global-header/global-header.vue';
</script>

<style lang="scss">
@forward './theme.scss';

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #fff;
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
  transition: all 100ms ease;
}

h1, h2, h3, h4, h5, h6 {
  display: inline-block;
  margin: 0;
  line-height: 1.5em;
}

i,
span {
  width: auto;
  height: 16px;
  font-size: 16px;
  line-height: 1em;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100vw;
  height: auto;
  padding-top: 50px;
}
</style>