import axios from 'axios'

const dummyJsonAPI = () => {
  return axios.create({
    baseURL: 'https://dummyjson.com/auth/',
    timeout: 1000,
  })
}

export default {
  getUserFromLogin(userData) { // userData = { username, password }
    return dummyJsonAPI().post('/login', userData, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
  },

  getCurrentAuthByToken(accessToken) {
    return dummyJsonAPI().get('/me', {
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    })
  },

}