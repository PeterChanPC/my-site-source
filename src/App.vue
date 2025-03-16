<template>
  <Sidebar/>
  <router-view/>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #fff;
}

input {
  border: none;
  outline: none;
}

select {
  border: none;
  outline: none;
  appearance: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100vw;
  height: 100vh;
}
</style>
