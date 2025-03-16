<template>
  <div class="project-view">
    <Header/>
    <div class="project">
      <router-link :to="{ name: 'todos' }">
        <i class="fi fi-rr-web-test"></i>
        <span>TodoList</span>
      </router-link>
      
      <router-link :to="{ name: 'calendar' }">
        <i class="fi fi-rr-calendar"></i>
        <span>Calendar</span>
      </router-link>

      <router-link :to="{ name: 'auth' }">
        <i class="fi fi-rr-user"></i>
        <span>Authentication</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style scoped>
.project-view {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 2em);
  padding: 1em;
}

.project {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(10em, 1fr));
  gap: 1em;
  margin-top: 1em;
}

.project a {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 1em;
  border: 1px solid #ddd;
  text-decoration: none;
  transition: border-color 200ms ease;
}

.project a i {
  position: relative;
  color: #bbb;
  font-size: 5em;
  transition: color 200ms ease;
}

.project a span {
  color: #bbb;
  font-weight: bold;
  transition: color 200ms ease;
}

.project a:hover {
  border: 1px solid #777;
}

.project a:hover i {
  color: #777;
}

.project a:hover span {
  color: #777;
}
</style>