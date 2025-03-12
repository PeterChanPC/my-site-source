import router from '@/router'
import auth from '@/Scripts/auth'
import { ref } from 'vue'

const login = (username, password) => {
  const data = ref(null)
  const error = ref(null)

  const handleLogin = async () => {
    try {
      let res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 1,
        })
      })

      if (!res.ok) throw Error('Login failed')

      data.value = await res.json()
      auth.login(data.value, data.value.accessToken)

      router.push(router.currentRoute.value.query.redirect || '/')
    }
    catch (err) {
      error.value = err.message
    }
  }

  return { data, error, handleLogin }
}

export default login