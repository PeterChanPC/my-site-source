<template>
  <div class="auth-view">
    <div class="auth">
      <div class="auth-details">
        <!-- show user details -->
        <span v-if="userStore.user">
          Username: {{ userStore.user.username }} <br>
          Email: {{ userStore.user.email }} <br>
        </span>
        <span v-else>You are not login</span>

        <!-- show authentication process -->
        <span v-if="isAuthing">
          Authenticating<br>
        </span>

        <!-- show authentication result -->
        <span v-if="showAuth">
          Authentication success<br>
        </span>
        <span v-if="showError">
          Authentication failed <br>
          Status Code: {{ userStore.authErr }} <br>
          <span v-if="userStore.user">Session expired</span>
        </span>

        <!-- show login status -->
        <span v-if="showLogin">
          You are login<br>
        </span>
      </div>

      <div class="auth-button">
        <router-link :to="{ name: 'login' }" @click="login">
          <i class="fi fi-rr-sign-out-alt"></i>
          <span>Login</span>
        </router-link>
        <span>Direct to login page if you are not login</span>
      </div>

      <div class="auth-button">
        <router-link :to="{ name: 'auth-content' }">
          <i class="fi fi-rr-user-key"></i>
          <span>Can only<br>access after login</span>
        </router-link>
        <span>Direct to content page if you are login <br> else will direct you to login page</span>
      </div>

      <div class="auth-button">
        <button @click="Authentication">
          <i class="fi fi-rr-unlock"></i>
          <span>Authenticate</span>
        </button>
        <span>Check for authentication</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, Ref, ref } from 'vue';
import { useUserStore } from '@/stores/user.store';

const userStore = useUserStore();
const isAuthing: Ref<Boolean> = ref(false);
const isAuth: Ref<Boolean> = ref(false);
const showAuth: Ref<Boolean> = ref(false);
const showError: Ref<Boolean> = ref(false);
const showLogin: Ref<Boolean> = ref(false);
const showAuthTimeout: Ref<number | null> = ref(null);
const showLoginTimeout: Ref<number | null> = ref(null);
const duration: number = 3000;

onBeforeMount(async () => {
  await userStore.handleAuth();
});

const Authentication = async () => {
  isAuthing.value = true;
  showError.value = false;
  showAuth.value = false;
  isAuth.value = await userStore.handleAuth();
  isAuthing.value = false;

  if (!isAuth.value) {
    if (showAuthTimeout.value) clearTimeout(showAuthTimeout.value);
    showError.value = true;
    showAuthTimeout.value = setTimeout(() => {
      showError.value = false;
    }, duration);
  } else {
    if (showAuthTimeout.value) clearTimeout(showAuthTimeout.value);
    showAuth.value = true;
    showAuthTimeout.value = setTimeout(() => {
      showAuth.value = false;
    }, duration);
  };
};

const login = (): void => {
  showLogin.value = false;
  if (userStore.user) {
    if (showLoginTimeout.value) clearTimeout(showLoginTimeout.value);
    showLogin.value = true;
    showLoginTimeout.value = setTimeout(() => {
      showLogin.value = false;
    }, duration);
  };
};
</script>

<style scoped>
.auth-view {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 50px - 1em);
  padding: 1em;
  padding-top: 50px;
  background-color: var(--bg-color-primary);
  color: var(--txt-color);
  overflow-y: scroll;
}

.auth {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 4em;
}

.auth-button {
  display: flex;
  align-items: center;
}

.auth-button span {
  flex: 1;
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;
}

.auth-details {
  position: absolute;
  top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.auth-details span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.auth-button a,
.auth-button button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 11em;
  height: 11em;
  margin: 1em;
  border-radius: 1em;
  border: 1px solid #ddd;
  background-color: #fff;
  text-decoration: none;
  transition: border-color 200ms ease;
}

.auth-button button {
  padding: none;
  font-size: 16px;
  cursor: pointer;
}

.auth-button a i,
.auth-button button i {
  color: #bbb;
  font-size: 5em;
  transition: color 200ms ease;
}

.auth-button a span,
.auth-button button span {
  flex: 0;
  color: #bbb;
  font-weight: bold;
  text-align: center;
  overflow: visible;
  transition: color 200ms ease;
}

.auth-button a:hover,
.auth-button button:hover {
  border-color: #777;
}

.auth-button a:hover i,
.auth-button button:hover i {
  color: #777;
}

.auth-button a:hover span,
.auth-button button:hover span {
  color: #777;
}
</style>