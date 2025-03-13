import axios from 'axios'

const dummyJsonAPI = (url = 'https://dummyjson.com/auth/') => {
  return axios.create({
    baseURL: url,
  })
}

export default {
  getTokenFromLogin(data, interfaces) {
    return dummyJsonAPI().post('/login', data, interfaces)
  },
  getCurrentAuthByToken(interfaces) {
    return dummyJsonAPI().get('/me', interfaces)
  }
}