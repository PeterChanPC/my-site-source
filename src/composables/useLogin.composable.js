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
      })
      auth.localStoreAccessToken(res.data.accessToken)
      return true
    } catch (err) {
      if (err.status !== 200) error.value = 'Login failed'
      return false
    }
  }

  return { error, handleLogin }
}

export default useLogin