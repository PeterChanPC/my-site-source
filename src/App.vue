<template>
  <div class="menu-header">
    <div class="menu-button" @click="toggleMenu">
      <i class="fi fi-rr-menu-burger"></i>
    </div>
  </div>
  <Sidebar :showMenu="toggled" @toggleMenu="toggleMenu"/>
  <router-view/>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'

const toggled = ref(false)
const toggleMenu = () => {
  toggled.value = !toggled.value
}
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
  flex-direction: row;
  width: 100vw;
  height: 100vh;
}

.menu-header {
  position: absolute;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 40px;
  scale: 0;
  border-bottom: 1px solid #ddd;
  background-color: #eee;
  transform-origin: top;
  transition: border-bottom-color 200ms ease;
  transition: scale 200ms ease;
}

.menu-header:hover {
  border-bottom-color: #ccc;
}

.menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.menu-header .menu-button i {
  position: absolute;
  left: 1em;
  margin-top: 4px;
}

@media (max-width: 780px) {
  #app {
    flex-direction: column;
  }

  .menu-header {
    position: sticky;
    top: 0;
    scale: 1;
    z-index: 98;
  }
}
</style>
