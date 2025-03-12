<template>
  <div class="login">
    <h1>Login</h1>
    <div>
      <span>Username: </span>
      <input type="text" v-model="username" placeholder="emilys">
      <br>
      <span>Password: </span>
      <input type="text" v-model="password" placeholder="milyspass">
      <br>
      <button @click="handleLogin">Login</button>
    </div>
    <p>{{ error }}</p>
  </div>
</template>

<script setup>
import login from '@/Scripts/login'
import { ref } from 'vue'

const username = ref('emilys')
const password = ref('emilyspass')

const { data, error, handleLogin } = login(username.value, password.value)
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
    height: 500px;
    border-radius: 1em;
    border: 1px solid #777;

    input {
      padding: 5px;
      margin: 15px;
      border-bottom: 1px solid #777;
    }
  }
</style>