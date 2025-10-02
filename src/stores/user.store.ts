import authApi from '@/api/authApi.service.js';
import router from '@/router';
import { defineStore } from "pinia";
import { ref } from 'vue';

interface User {
  username: string,
  email: string,
  password: string,
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const accessToken = ref<String | null>(null);
  const loginErr = ref<String | null>(null);
  const authErr = ref<String | null>(null);

  async function handleLogin(username: string, password: string) {
    try {
      const res = await authApi.getUserFromLogin({
        username: username,
        password: password,
        expiresponseInMins: 1,
      });
      accessToken.value = res.data.accessToken;
      router.push(router.currentRoute.value.query.redirect?.toString() || { name: 'authentication' });
    } catch (err) {
      loginErr.value = 'Login failed';
    };
  };

  async function handleAuth() {
    try {
      if (!accessToken.value) return;
      const res = await authApi.getCurrentAuthByToken(accessToken.value);
      user.value = res.data;
      return true;
    } catch (err: any) {
      authErr.value = err.status;
      return false;
    };
  };

  function $reset() {
    user.value = null;
    accessToken.value = null;
  };

  return { user, accessToken, loginErr, authErr, handleLogin, handleAuth, $reset };
});