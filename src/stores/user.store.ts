import authApi from '@/api/authApi.service';
import router from '@/router';
import { defineStore } from "pinia";
import { Ref, ref } from 'vue';

interface User {
  username: string,
  email: string,
  password: string,
}

export const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null);
  const accessToken: Ref<null | String> = ref(null);
  const loginErr: Ref<null | String> = ref(null);
  const authErr: Ref<null | String> = ref(null);

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