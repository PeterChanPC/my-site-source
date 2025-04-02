<template>
  <div class="auth-content">
    <span>You have successfully login</span>
    <button @click="toAuth">Back to Authentication Page</button>
  </div>
</template>

<script setup>
import router from '@/router';

const toAuth = () => {
  router.push({ name: 'authentication' })
}
</script>

<style scoped>
.auth-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.auth-content span {
  margin: 2em;
}
</style>