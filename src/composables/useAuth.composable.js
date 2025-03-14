import authApi from '@/api/authApi.service'
import auth from '@/stores/auth.store'
import { ref } from 'vue'

const useAuth = () => {
  const error = ref(null)

  const handleAuth = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const res = await authApi.getCurrentAuthByToken(accessToken)
      auth.localStoreUser(JSON.stringify(res.data))
      return true
    }
    catch (err) {
      error.value = err.status
      auth.localRemoveAccessToken()
      auth.localRemoveUser()
      return false
    }
  }

  return { error, handleAuth }
}

export default useAuth