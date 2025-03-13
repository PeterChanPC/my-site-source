import authApi from '@/api/authApi.service'
import auth from '@/stores/auth.store'
import { ref } from 'vue'

const useAuthCheck = (token) => {
  const data = ref(null)
  const error = ref(null)

  const handleAuthCheck = async () => {
    try {
      const res = await authApi.getCurrentAuthByToken({
        headers: { 'Authorization': `Bearer ${ token }`}
      })
      
      data.value = res.data
      localStorage.setItem('user', JSON.stringify(res.data))
      return true
    }
    catch (err) {
      if (err.status === 401) {
        auth.logout()
        error.value = 'Session Expired'
      }
      else error.value = 'Authentication failed'
      return false
    }
  }

  return { data, error, handleAuthCheck }
}

export default useAuthCheck