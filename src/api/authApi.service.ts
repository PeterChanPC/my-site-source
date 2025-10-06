import axios, { AxiosResponse } from 'axios';

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
  getUserFromLogin(user: User) {
    return dummyJsonAPI().post('/login', user, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  },

  getCurrentAuthByToken(accessToken: string) {
    return dummyJsonAPI().get('/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  },
} as AuthApi;