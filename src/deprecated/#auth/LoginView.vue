<template>
  <div class="login page">
    <h1>Login</h1>
    <div>
      <span>Username: </span>
      <input type="text" v-model="username" />
      <br>
      <span>Password: </span>
      <input type="text" v-model="password" />
      <br>
      <button @click="login">Login</button>
    </div>
    <p v-if="userStore.loginErr">{{ userStore.loginErr }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/deprecated/#auth/#user.store';

const username = ref<string>('emilys');
const password = ref<string>('emilyspass');
const userStore = useUserStore();

const login = async () => {
  await userStore.handleLogin(username.value, password.value);
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  background-color: var(--bg-color-primary);
  color: var(--txt-color);

  input {
    padding: 5px;
    margin: 15px;
  }
}
</style>