import auth from '../stores/auth.store'
import authApi from '../api/authApi.service'
import { ref } from 'vue'

const useLogin = (username, password) => {
  const data = ref(null)
  const error = ref(null)

  const handleLogin = async () => {
    try {
      const res = await authApi.getUserFromLogin({
        username: username,
        password: password,
        expiresponseInMins: 1,
      })
      data.value = res.data
      auth.StoreAccessToken(res.data.accessToken)
      return true
    } catch (err) {
      if (err.status !== 200) error.value = 'Login failed'
      return false
    }
  }

  return { data, error, handleLogin }
}

export default useLogin