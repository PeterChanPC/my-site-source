<template>
  <aside>
    <div class="menu">
      <router-link :to="{ name: 'home' }">
        <i class="fi fi-rr-home"></i>
      </router-link>

      <router-link :to="{ name: 'todos' }">
        <i class="fi fi-rr-list"></i>
      </router-link>

      <router-link :to="{ name: 'settings'}">
        <i class="fi fi-rr-settings"></i>
      </router-link>
      
    </div>
  </aside>
</template>

<script setup>
</script>

<style scoped>
  aside {
    width: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #eee;
    border-right: 1px solid #ddd;

    a {
      margin-top: 10px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2c3e50;
      text-decoration: none;

      &:hover {
        transition: .05s;
        background: #ddd;
      }
    }

    a.router-link-exact-active {
      border-right: 2px solid #777;
      background: #ccc;

      &:hover {
        transition: .05s;
        background: #ddd;
      }
    }

    &:hover {
      border-right: 1px solid #ccc;
    }
    
    @media (max-width: 768px) {
      position: fixed;
      z-index: 99;
    }
    
  }
</style>