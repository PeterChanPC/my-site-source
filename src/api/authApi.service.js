import axios from 'axios'

const API = (url = 'https://dummyjson.com/auth/') => {
  return axios.create({
    baseURL: url,
  })
}

export default {
  getTokenFromLogin(data, interfaces) {
    return API().post('/login', data, interfaces)
  },
  getCurrentAuthByToken(token, interfaces) {
    return API().get('/me', token, interfaces)
  }
}