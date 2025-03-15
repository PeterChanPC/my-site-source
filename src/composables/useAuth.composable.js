import authApi from '@/api/authApi.service'
import auth from '@/stores/auth.store'
import { ref } from 'vue'

const useAuth = () => {
  const data = ref(null)
  const error = ref(null)

  const handleAuth = async () => {
    try {
      const accessToken = auth.accessToken
      const res = await authApi.getCurrentAuthByToken(accessToken)
      data.value = res.data
      return true
    }
    catch (err) {
      error.value = err.status
      auth.RemoveAccessToken()
      auth.RemoveUser()
      return false
    }
  }

  return { data, error, handleAuth }
}

export default useAuth