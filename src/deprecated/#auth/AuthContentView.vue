<template>
  <div class="auth-content page">
    <span>You have successfully login</span>
    <button @click="toAuth">Back to Authentication Page</button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';

const toAuth = (): void => {
  router.push({ name: 'authentication' });
};
</script>

<style scoped>
.auth-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
}

.auth-content span {
  margin: 2em;
}
</style>