<template>
  <div class="auth">
    <div class="auth-details">
      <span v-if="userStore.user">
        Username: {{ userStore.user.username }} <br>
        Email: {{ userStore.user.email }} <br>
      </span>

      <span v-if="isAuthing">
        Authenticating<br>
      </span>

      <span v-if="showAuth">
        Authentication success<br>
      </span>
      
      <span v-if="showError">
        Authentication failed <br>
        Status Code: {{ userStore.authErr }} <br>
      </span>

      <span v-if="showLogin">
        You are login<br>
      </span>
    </div>

    <router-link :to="{ name: 'login' }" @click="login">
      <i class="fi fi-rr-sign-out-alt"></i>
      <span>Login</span>
    </router-link>

    <router-link :to="{ name: 'auth-content' }">
      <i class="fi fi-rr-user-key"></i>
      <span>Can only<br>access after login</span>
    </router-link>

    <button @click="Authentication">
      <i class="fi fi-rr-unlock"></i>
      <span>Authenticate</span>
    </button>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/stores/user.store';

const userStore = useUserStore()
const isAuthing = ref(false)
const isAuth = ref(false)
const showAuth = ref(false)
const showError = ref(false)
const showLogin = ref(false)
const showAuthTimeout = ref(null)
const showLoginTimeout = ref(null)
const duration = 3000

onBeforeMount(async () => {
  await userStore.handleAuth()
})

const Authentication = async () => {
  isAuthing.value = true
  showError.value = false
  showAuth.value = false
  isAuth.value = await userStore.handleAuth()
  isAuthing.value = false

  if (!isAuth.value) {
    if (showAuthTimeout.value) clearTimeout(showAuthTimeout.value)
    showError.value = true
    showAuthTimeout.value = setTimeout(() => {
      showError.value = false
    }, duration)
  }
  else {
    if (showAuthTimeout.value) clearTimeout(showAuthTimeout.value)
    showAuth.value = true
    showAuthTimeout.value = setTimeout(() => {
      showAuth.value = false
    }, duration)
  }
}

const login = () => {
  showLogin.value = false
  if (userStore.user) {
    if (showLoginTimeout.value) clearTimeout(showLoginTimeout.value)
    showLogin.value = true
    showLoginTimeout.value = setTimeout(() => {
      showLogin.value = false
    }, duration)
  }
}
</script>

<style scoped>
.auth {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 51px - 2em);
  height: calc(100vh - 2em);
}

.auth .auth-details {
  position: absolute;
  top: 1em;
}

.auth a,
.auth button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 11em;
  height: 11em;
  margin: 1em;
  border-radius: 1em;
  border: 1px solid #ddd;
  background-color: #fff;
  text-decoration: none;
  transition: border-color 200ms ease;
}

.auth button {
  padding: none;
  font-size: 16px;
  cursor: pointer;
}

.auth a i,
.auth button i {
  color: #bbb;
  font-size: 5em;
  transition: color 200ms ease;
}

.auth a span,
.auth button span {
  color: #bbb;
  font-weight: bold;
  transition: color 200ms ease;
}

.auth a:hover,
.auth button:hover {
  border-color: #777;
}

.auth a:hover i,
.auth button:hover i {
  color: #777;
}

.auth a:hover span,
.auth button:hover span {
  color: #777;
}

@media (max-width: 870px) {
  .auth {
    flex-direction: column;
    width: calc(100vw - 5em);
    padding-top: 5em;
    padding-left: 4.1875em;
  }
}
</style>