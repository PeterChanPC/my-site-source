<template>
  <div class="project-view">
    <div class="project">
      <router-link :to="{ name: 'todos' }">
        <i class="fi fi-rr-web-test"></i>
        <span>TodoList</span>
      </router-link>
      <router-link :to="{ name: 'authentication' }">
        <i class="fi fi-rr-user"></i>
        <span>Authentication</span>
      </router-link>
      <router-link :to="{ name: 'test' }">
        <i class="fi fi-rr-web-test"></i>
        <span>TEST</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.project-view {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 50px - 1em);
  padding: 1em;
  padding-top: 50px;
  background-color: var(--bg-color);
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
  transition: background-color 200ms ease;
}

.project a i {
  position: relative;
  color: #777;
  font-size: 5em;
  transition: color 200ms ease;
}

.project a span {
  color: #777;
  font-weight: bold;
  transition: color 200ms ease;
}

.project a:hover {
  background-color: #eee;
  border-color: #ccc;
}
</style>