<template>
  <div class="authdocs">
    <div class="auth-details">
      <span v-if="user">
        Username: {{ user.username }} <br>
        Email: {{ user.email }} <br>
      </span>
      <span v-if="showLogin">You are login<br></span>
      <span v-if="isAuthing">Authenticating<br></span>
      <span v-if="showAuth">Authentication success<br></span>
      <span v-if="showError">
        Authentication failed <br>
        Status Code: {{ error }} <br>
      </span>
    </div>

    <router-link :to="{ name: 'login' }" @click="login">
      <i class="fi fi-rr-sign-out-alt"></i>
      <span>Login</span>
    </router-link>

    <router-link :to="{ name: 'auth' }">
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
import useAuth from '@/composables/useAuth.composable';
import { onBeforeMount, ref } from 'vue';

const { error, handleAuth } = useAuth()
const user = ref(null)
const isAuthing = ref(false)
const isAuth = ref(false)
const showAuth = ref(false)
const showError = ref(false)
const timeout = ref(null)
const duration = 3000

onBeforeMount(async () => {
  await handleAuth()
  user.value = JSON.parse(localStorage.getItem('user'))
})

const Authentication = async () => {
  isAuthing.value = true
  showError.value = false
  showAuth.value = false
  isAuth.value = await handleAuth()
  isAuthing.value = false

  if (!isAuth.value) {
    if (timeout.value) clearTimeout(timeout.value)
    showError.value = true
    timeout.value = setTimeout(() => {
      showError.value = false
    }, duration)
  }
  else {
    if (timeout.value) clearTimeout(timeout.value)
    showAuth.value = true
    timeout.value = setTimeout(() => {
      showAuth.value = false
    }, duration)
  }
}

const showLogin = ref(false)
const loginTimeout = ref(null)
const login = () => {
  showLogin.value = false
  if (user.value) {
    if (loginTimeout.value) clearTimeout(loginTimeout.value)
    showLogin.value = true
    loginTimeout.value = setTimeout(() => {
      showLogin.value = false
    }, duration)
  }
}
</script>

<style>
.authdocs {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.authdocs .auth-details {
  position: absolute;
  top: 1em;

}

.authdocs a,
.authdocs button {
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

.authdocs button {
  padding: none;
  font-size: 16px;
  cursor: pointer;
}

.authdocs a i,
.authdocs button i {
  color: #bbb;
  font-size: 5em;
  transition: color 200ms ease;
}

.authdocs a span,
.authdocs button span {
  color: #bbb;
  font-weight: bold;
  transition: color 200ms ease;
}

.authdocs a:hover,
.authdocs button:hover {
  border-color: #777;
}

.authdocs a:hover i,
.authdocs button:hover i {
  color: #777;
}

.authdocs a:hover span,
.authdocs button:hover span {
  color: #777;
}
</style>