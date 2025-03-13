import { ref } from 'vue'

const authCheck = (token) => {
  const data = ref(null)
  const error = ref(null)

  const handleAuthCheck = async () => {
    try {
      let res = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${ token }` }
      })

      if (res.status === 401) {
        auth.logout()
        throw Error('Session Expired')
      }
      if (!res.ok) throw Error('Authentication failed')
      
      data.value = await res.json()
      return true
    }
    catch (err) {
      error.value = err.message
      return false
    }
  }

  return { data, error, handleAuthCheck }
}

export default authCheck