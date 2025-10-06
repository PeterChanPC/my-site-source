<template>
  <div class="page grid grid-cols-2 grid-rows-4 a-center j-items-center w-0.90 pl-0.5 pr-0.5 font-size-16">
    <div class="col-span-2 mt-12 mb-12 txt-a-center">
      <p class="mt-0 mb-0" v-if="userStore.user">
        Username: {{ userStore.user.username }} <br>
        Email: {{ userStore.user.email }} <br>
      </p>
      <p class="mt-0 mb-0" v-else>You are not login</p>
      <p class="mt-8 mb-0"> {{ status }} <br> {{ error }} </p>
    </div>

    <router-link class="flex a-center j-center w-0.90 h-0.80 bg-secondary border border-radius-12" :to="{ name: 'login' }"
      @click="login">
      <span>Login</span>
    </router-link>
    <span>Direct to login page if you are not login</span>

    <router-link class="flex a-center j-center w-0.90 h-0.80 bg-secondary border border-radius-12"
      :to="{ name: 'auth-content' }">
      <span>Can only access after login</span>
    </router-link>
    <span>Direct to content page if you are login else will direct you to login page</span>

    <button class="flex a-center j-center w-0.90 h-0.80 bg-secondary border border-radius-12" @click="authentication">
      <span class="font-size-16">Authenticate</span>
    </button>
    <span>Check for authentication</span>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/stores/user.store';

const userStore = useUserStore();
const status = ref<String>('');
const error = ref<String | null>('');
let timer = setTimeout(() => { });
let isAuth = false;
const duration = 3000;

onBeforeMount(async () => {
  await userStore.handleAuth();
});

const authentication = async () => {
  status.value = 'Authenticating';
  isAuth = await userStore.handleAuth();
  console.log(userStore.authErr)

  if (!isAuth) {
    clearTimeout(timer);
    status.value = 'Authentication failed';
    error.value = userStore.authErr;
    timer = setTimeout(() => {
      status.value = '';
      error.value = '';
    }, duration);
  } else {
    clearTimeout(timer);
    status.value = 'Authentication success';
    timer = setTimeout(() => {
      status.value = '';
    }, duration);
  };
};

const login = (): void => {
  if (userStore.user) {
    clearTimeout(timer);
    status.value = 'You are login';
    timer = setTimeout(() => {
      status.value = '';
    }, duration);
  };
};
</script>

<style scoped lang="scss"></style>