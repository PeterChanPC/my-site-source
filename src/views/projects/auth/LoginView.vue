<template>
  <div class="login">
    <h1>Login</h1>
    <div>
      <span>Username: </span>
      <input type="text" v-model="username"/>
      <br>
      <span>Password: </span>
      <input type="text" v-model="password"/>
      <br>
      <button @click="login">Login</button>
    </div>
    <p v-if="userStore.loginErr">{{ userStore.loginErr }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.store'

const username = ref('emilys')
const password = ref('emilyspass')
const userStore = useUserStore()

const login = async () => {
  await userStore.handleLogin(username.value, password.value)
}
</script>

<style scoped>
  .login {
    position: absolute;
    left: calc(50vw - 250px);
    top: calc(50vh - 250px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 300px;
    border-radius: 1em;
    border: 1px solid #777;

    input {
      padding: 5px;
      margin: 15px;
      border-bottom: 1px solid #777;
    }
  }
</style>