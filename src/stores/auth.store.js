import { reactive } from 'vue'

const auth = reactive({
  user: null,
  accessToken: null,

  StoreAccessToken(accessToken) {
    this.accessToken = accessToken
  },

  StoreUser(user) {
    this.user = user
  },

  RemoveAccessToken() {
    this.accessToken = null
  },

  RemoveUser() {
    this.user = null
  },

})

export default auth