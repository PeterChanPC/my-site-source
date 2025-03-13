import router from '@/router'
import authCheck from '../composables/useAuthCheck.composable'
import { reactive } from 'vue'

const auth = reactive({
  token: localStorage.getItem('token') || null,

  login(token) {
    this.token = token
    localStorage.setItem('token', token)
  },

  logout() {
    // not the best approach to remove token only, 
    // but dummyJSON doesn't have remove active token function
    this.token = null
    localStorage.removeItem('token')
    router.go()
  },

  async isAuthenticated() {
    if (!this.token) return false
    
    const { data, error, handleAuthCheck } = await authCheck(this.token)
    const isValid = handleAuthCheck()

    return isValid
  }
})

export default auth