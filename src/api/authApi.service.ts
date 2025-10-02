import axios, { AxiosInstance, AxiosResponse } from 'axios';

const dummyJsonAPI = () => {
  return axios.create({
    baseURL: 'https://dummyjson.com/auth/',
    timeout: 1000,
  });
};

interface User {
  username: string,
  password: string,
  expiresponseInMins: number,
};

interface AuthApi {
  getUserFromLogin(userData: User): Promise<AxiosResponse>,
  getCurrentAuthByToken(accessToken: String): Promise<AxiosResponse>,
};

export default {
  getUserFromLogin(userData) {
    return dummyJsonAPI().post('/login', userData, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  },

  getCurrentAuthByToken(accessToken) {
    return dummyJsonAPI().get('/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  },
} as AuthApi;