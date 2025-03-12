import { reactive } from 'vue'

const auth = reactive({
  user: null,
  token: localStorage.getItem('token') || null,

  login(userData, token) {
    this.user = userData
    this.token = token
    localStorage.setItem('token', token)
  },

  logout() {
    this.user = null
    this.token = null
    localStorage.removeItem('token')
  },

  isAuthenticated() {
    return !!this.token
  }
})

export default auth