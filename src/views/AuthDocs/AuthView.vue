<template>
  <div class="auth">
    <span>You have successfully login</span>
    <button @click="toAuthdocs">Back to Auth Docs</button>
  </div>
</template>

<script setup>
import router from '@/router';

const toAuthdocs = () => {
  router.push({ name: 'authdocs' })
}
</script>

<style>
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.auth span {
  margin: 2em;
}
</style>