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

  button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  h2 {
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    width: 100%;
    height: 100vh;
  }
</style>
