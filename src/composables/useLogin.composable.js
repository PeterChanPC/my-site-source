import router from '@/router'
import auth from '../stores/auth.store'
import authApi from '../api/authApi.service'
import { ref } from 'vue'

const useLogin = (username, password) => {
  const error = ref(null)

  const handleLogin = async () => {
    try {
      const res = await authApi.getTokenFromLogin({
        username: username,
        password: password,
        expiresponseInMins: 1,
      }, {
        headers: { 'Content-Type': 'application/json' }
      })

      auth.login(res.data.accessToken)
      router.push(router.currentRoute.value.query.redirect || '/')

    } catch (err) {
      if (err.status !== 200) error.value = 'Login failed'
    }
  }

  return { error, handleLogin }
}

export default useLogin