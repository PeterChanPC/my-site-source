import authApi from '@/api/authApi.service'
import router from '@/router';
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const accessToken = ref(null)
  const loginErr = ref(null)
  const authErr = ref(null)

  async function handleLogin(username, password) {
    try {
      const res = await authApi.getUserFromLogin({
        username: username,
        password: password,
        expiresponseInMins: 1,
      })
      accessToken.value = res.data.accessToken
      router.push(router.currentRoute.value.query.redirect || { name: 'authentication' })

    } catch (err) {
      loginErr.value = 'Login failed'
      
    }
  }

  async function handleAuth() {
    try {
      const res = await authApi.getCurrentAuthByToken(accessToken.value)
      user.value = res.data
      return true

    }
    catch (err) {
      authErr.value = err.status
      return false

    }
  }

  function $reset() {
    user.value = null
    accessToken.value = null
  }

  return { user, accessToken, loginErr, authErr, handleLogin, handleAuth, $reset }
})