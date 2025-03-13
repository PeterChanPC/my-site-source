import router from '@/router'
import useAuthCheck from '@/composables/useAuthCheck.composable'
import { reactive, toRaw } from 'vue'

const auth = reactive({
  user: localStorage.getItem('user') || null,
  token: localStorage.getItem('token') || null,

  login(token) {
    this.token = token
    localStorage.setItem('token', token)
  },

  logout() {
    // not the best approach to remove token only, 
    // but dummyJSON doesn't have remove active token function
    this.user = null
    this.token = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.go()
  },

  isAuthenticated() {
    if (!this.token) return false
    const { data, error, handleAuthCheck } = useAuthCheck(this.token)
    const isValid = handleAuthCheck()
    return isValid
  }
})

export default auth