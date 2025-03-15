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
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import useLogin from '@/composables/useLogin.composable'
import router from '@/router'
import { ref } from 'vue'

const username = ref('emilys')
const password = ref('emilyspass')

const { data, error, handleLogin } = useLogin(username.value, password.value)

const login = async () => {
  await handleLogin()
  router.push(router.currentRoute.value.query.redirect || { name: 'auth' })
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