<template>
  <div>
    <h1>{{ t('user', { user: username }) }}</h1>
    <h3 v-if="!isLogin">
      <span>You are not </span>
      <router-link to="/login">login</router-link>
    </h3>
    <h2>{{ d(new Date(), 'short', 'en-US') }}</h2>
    <h2>{{ d(new Date(), 'long') }}</h2>
    <h3>{{ n(8888.88, 'currency') }}</h3>
    <h3>{{ n(8888.88, 'decimal') }}</h3>
    <h3>{{ n(8888.88, 'percent') }}</h3>
    <span>Helloworld</span>
    <i18n-n tag="h3" :value="8888.88" format="currency" scope="global">
      <template #currency="props">
        <span style="color: orange; font-weight: bold;">
          {{ props.currency }}
        </span>
      </template>
    </i18n-n>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, d, n } = useI18n()
const user = JSON.parse(localStorage.getItem('user')) || { username: 'User' }
const username = ref(user.username)
const isLogin = ref(user)

</script>

<style>

</style>