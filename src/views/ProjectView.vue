<template>
  <div class="project-grid">
    <router-link :to="{ name: 'todos' }">
      <i class="fi fi-rr-web-test"></i>
      <span>TodoList</span>
    </router-link>
    
    <router-link :to="{ name: 'calendar' }">
      <i class="fi fi-rr-calendar"></i>
      <span>Calendar</span>
    </router-link>

    <router-link :to="{ name: 'authdocs' }">
      <i class="fi fi-rr-user"></i>
      <span>Auth Docs</span>
    </router-link>
  </div>
</template>

<script setup>

</script>

<style>
.project-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(10em, 1fr));
  grid-auto-flow: row;
  gap: 1em;
  width: calc(100vw - 51px - 2em);
  height: calc(100vh - 2em);
  padding: 1em;
}

.project-grid a {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10em;
  border-radius: 1em;
  border: 1px solid #ddd;
  text-decoration: none;
  transition: border-color 200ms ease;
}

.project-grid a i {
  position: relative;
  color: #bbb;
  font-size: 5em;
  transition: color 200ms ease;
}

.project-grid a span {
  color: #bbb;
  font-weight: bold;
  transition: color 200ms ease;
}

.project-grid a:hover {
  border: 1px solid #777;
}

.project-grid a:hover i {
  color: #777;
}

.project-grid a:hover span {
  color: #777;
}

@media (max-width: 870px) {
  .project-grid {
    width: calc(100vw - 5em);
    padding-left: 4.1875em;
  }
}
</style>