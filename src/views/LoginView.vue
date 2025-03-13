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
      <button @click="handleLogin">Login</button>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import useLogin from '@/composables/useLogin.composable'
import { ref } from 'vue'

const username = ref('emilys')
const password = ref('emilyspass')

const { error, handleLogin } = useLogin(username.value, password.value)
</script>

<style>
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