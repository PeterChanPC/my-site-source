import { reactive } from 'vue'

const auth = reactive({
  user: localStorage.getItem('user') || null,
  accessToken: localStorage.getItem('accessToken') || null,

  localStoreAccessToken(accessToken) {
    this.accessToken = accessToken
    localStorage.setItem('accessToken', accessToken)
  },

  localStoreUser(user) {
    this.user = user
    localStorage.setItem('user', user)
  },

  localRemoveAccessToken() {
    this.accessToken = null
    localStorage.removeItem('accessToken')
  },

  localRemoveUser() {
    this.user = null
    localStorage.removeItem('user')
  },

})

export default auth