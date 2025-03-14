import axios from 'axios'

const dummyJsonAPI = (url = 'https://dummyjson.com/auth/') => {
  return axios.create({
    baseURL: url,
  })
}

export default {
  getTokenFromLogin(userData) {
    // userData = { username, password }
    return dummyJsonAPI().post('/login', userData, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  getCurrentAuthByToken(accessToken) {
    return dummyJsonAPI().get('/me', {
      headers: { 'Authorization': `Bearer ${ accessToken }` }
    })
  },

}